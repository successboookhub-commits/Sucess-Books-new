import { Router } from "express";
import { db } from "../db/database.js";
import { sendUserOtpEmail } from "../services/mailService.js";
import { generateUserToken, requireUserAuth } from "../middleware/auth.js";

const router = Router();

/**
 * 1. POST /api/user/auth/send-otp
 * Generates and sends a real 6-digit OTP to any customer email via Gmail SMTP
 */
router.post("/send-otp", async (req, res) => {
  try {
    const rawEmail = req.body.email ? String(req.body.email).trim().toLowerCase() : "";

    if (!rawEmail || !rawEmail.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "A valid email address is required."
      });
    }

    // Check if user already exists to personalize email
    const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [rawEmail]);
    const userName = existingUser?.name || "";

    // Generate random 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Expiry time: 10 minutes from now in ISO UTC string
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Store OTP in database
    await db.run(
      "INSERT INTO user_otps (email, otp, expires_at, used) VALUES (?, ?, ?, 0)",
      [rawEmail, otp, expiresAt]
    );

    console.log(`[User Auth] Sending Customer Login OTP to ${rawEmail}...`);
    await sendUserOtpEmail(rawEmail, otp, userName);
    console.log(`[User Auth] OTP sent successfully to ${rawEmail}!`);

    return res.json({
      success: true,
      message: `A 6-digit verification code has been sent to ${rawEmail}. Please check your inbox.`,
      email: rawEmail,
      isExistingUser: Boolean(existingUser && existingUser.name)
    });
  } catch (err) {
    console.error("[User Auth Error] Failed to send OTP:", err);
    return res.status(500).json({
      success: false,
      message: `Failed to send verification email: ${err.message || "Email server error"}`
    });
  }
});

/**
 * 2. POST /api/user/auth/verify-otp
 * Verifies OTP and registers or logs in customer, issuing a 30-day JWT token
 */
router.post("/verify-otp", async (req, res) => {
  try {
    const rawEmail = req.body.email ? String(req.body.email).trim().toLowerCase() : "";
    const otp = req.body.otp ? String(req.body.otp).trim() : "";
    const providedName = req.body.name ? String(req.body.name).trim() : "";
    const providedPhone = req.body.phone ? String(req.body.phone).trim() : "";

    if (!rawEmail || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP code are required."
      });
    }

    // Find the latest valid unused OTP for this email
    const record = await db.get(
      `SELECT * FROM user_otps 
       WHERE email = ? AND otp = ? AND used = 0 
       ORDER BY id DESC LIMIT 1`,
      [rawEmail, otp]
    );

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code or code already used."
      });
    }

    // Check expiry
    const nowMs = Date.now();
    const expiryMs = new Date(record.expires_at).getTime();
    if (isNaN(expiryMs) || nowMs > expiryMs) {
      return res.status(400).json({
        success: false,
        message: "This verification code has expired. Please request a new one."
      });
    }

    // Mark as used
    await db.run("UPDATE user_otps SET used = 1 WHERE id = ?", [record.id]);

    // Check if user exists, else create user record
    let user = await db.get("SELECT * FROM users WHERE email = ?", [rawEmail]);
    if (!user) {
      const result = await db.run(
        "INSERT INTO users (name, email, phone, role) VALUES (?, ?, ?, 'customer')",
        [providedName || null, rawEmail, providedPhone || null]
      );
      user = await db.get("SELECT * FROM users WHERE id = ?", [result.lastInsertRowid]);
    } else if ((providedName && !user.name) || (providedPhone && !user.phone)) {
      await db.run(
        "UPDATE users SET name = COALESCE(?, name), phone = COALESCE(?, phone) WHERE id = ?",
        [providedName || user.name, providedPhone || user.phone, user.id]
      );
      user = await db.get("SELECT * FROM users WHERE id = ?", [user.id]);
    }

    // Generate JWT token
    const token = generateUserToken({
      id: user.id,
      email: user.email,
      name: user.name || "",
      phone: user.phone || "",
      role: "customer"
    });

    return res.json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
        role: user.role || "customer"
      }
    });
  } catch (err) {
    console.error("[User Auth Error] Verification failed:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to verify OTP."
    });
  }
});

/**
 * 3. GET /api/user/profile
 * Returns authenticated customer profile with stats
 */
router.get("/profile", requireUserAuth, async (req, res) => {
  try {
    const user = await db.get("SELECT id, name, email, phone, avatar, role, created_at FROM users WHERE email = ?", [req.user.email]);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const orderCountRow = await db.get(
      "SELECT COUNT(*) as count FROM orders WHERE customer_email = ? OR user_id = ?",
      [user.email, user.id]
    );
    const wishlistCountRow = await db.get(
      "SELECT COUNT(*) as count FROM wishlists WHERE user_email = ? OR user_id = ?",
      [user.email, user.id]
    );
    const addressCountRow = await db.get(
      "SELECT COUNT(*) as count FROM user_addresses WHERE user_email = ? OR user_id = ?",
      [user.email, user.id]
    );

    return res.json({
      success: true,
      user: {
        ...user,
        stats: {
          ordersCount: orderCountRow?.count || 0,
          wishlistCount: wishlistCountRow?.count || 0,
          addressesCount: addressCountRow?.count || 0
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 4. PUT /api/user/profile
 * Updates customer profile details
 */
router.put("/profile", requireUserAuth, async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;
    await db.run(
      "UPDATE users SET name = ?, phone = ?, avatar = ? WHERE email = ?",
      [name?.trim() || null, phone?.trim() || null, avatar || null, req.user.email]
    );

    const updated = await db.get("SELECT id, name, email, phone, avatar, role, created_at FROM users WHERE email = ?", [req.user.email]);

    return res.json({
      success: true,
      message: "Profile updated successfully!",
      user: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
