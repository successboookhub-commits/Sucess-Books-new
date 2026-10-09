import { Router } from "express";
import { db } from "../db/database.js";
import { sendUserOtpEmail } from "../services/mailService.js";
import { generateUserToken, requireUserAuth } from "../middleware/auth.js";
import { hashPassword, verifyPassword } from "../utils/password.js";

const router = Router();

/**
 * 1. POST /api/user/auth/register
 * Register a new customer account with Full Name, Phone, Email, and Password
 */
router.post("/register", async (req, res) => {
  try {
    const rawEmail = req.body.email ? String(req.body.email).trim().toLowerCase() : "";
    const rawName = req.body.name ? String(req.body.name).trim() : "";
    const rawPhone = req.body.phone ? String(req.body.phone).trim() : "";
    const password = req.body.password ? String(req.body.password) : "";
    const confirmPassword = req.body.confirmPassword ? String(req.body.confirmPassword) : "";

    // Input Validation
    if (!rawEmail || !rawEmail.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "A valid email address is required."
      });
    }

    if (!rawName || rawName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Full name is required (at least 2 characters)."
      });
    }

    if (!rawPhone || rawPhone.replace(/\D/g, "").length < 10) {
      return res.status(400).json({
        success: false,
        message: "A valid 10-digit mobile number is required."
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long."
      });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Confirm password does not match the password."
      });
    }

    // Check if user already exists
    const existing = await db.get("SELECT * FROM users WHERE email = ?", [rawEmail]);
    if (existing && existing.password_hash) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists. Please sign in instead."
      });
    }

    const passwordHash = hashPassword(password);

    let user;
    if (existing) {
      // Upgrade existing guest/OTP user with password
      await db.run(
        "UPDATE users SET name = ?, phone = ?, password_hash = ?, status = 'active' WHERE id = ?",
        [rawName, rawPhone, passwordHash, existing.id]
      );
      user = await db.get("SELECT id, name, email, phone, avatar, role, created_at FROM users WHERE id = ?", [existing.id]);
    } else {
      const result = await db.run(
        "INSERT INTO users (name, email, phone, password_hash, role, status) VALUES (?, ?, ?, ?, 'customer', 'active')",
        [rawName, rawEmail, rawPhone, passwordHash]
      );
      user = await db.get("SELECT id, name, email, phone, avatar, role, created_at FROM users WHERE id = ?", [result.lastInsertRowid]);
    }

    // Generate JWT auth token (30 days validity)
    const token = generateUserToken({
      id: user.id,
      email: user.email,
      name: user.name || "",
      phone: user.phone || "",
      role: "customer"
    });

    return res.status(201).json({
      success: true,
      message: `Welcome to Success Book Hub, ${user.name}! Your account has been created.`,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        avatar: user.avatar || "",
        role: user.role || "customer",
        createdAt: user.created_at
      }
    });
  } catch (err) {
    console.error("[User Registration Error]:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to register account."
    });
  }
});

/**
 * 2. POST /api/user/auth/login
 * Log in an existing customer with Email and Password
 */
router.post("/login", async (req, res) => {
  try {
    const rawEmail = req.body.email ? String(req.body.email).trim().toLowerCase() : "";
    const password = req.body.password ? String(req.body.password) : "";

    if (!rawEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email address and password are required."
      });
    }

    const user = await db.get("SELECT * FROM users WHERE email = ?", [rawEmail]);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password. Please check your credentials or create an account."
      });
    }

    if (user.status === "blocked" || user.status === "suspended") {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive or suspended. Please contact customer support."
      });
    }

    // If user registered only via OTP previously without password
    if (!user.password_hash) {
      return res.status(401).json({
        success: false,
        needsOtpOrPasswordSetup: true,
        message: "No password set for this account. Please sign in using OTP verification or set a new password."
      });
    }

    const isValid = verifyPassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password. Please check your credentials."
      });
    }

    const token = generateUserToken({
      id: user.id,
      email: user.email,
      name: user.name || "",
      phone: user.phone || "",
      role: user.role || "customer"
    });

    return res.json({
      success: true,
      message: `Welcome back, ${user.name || "Reader"}!`,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
        role: user.role || "customer",
        createdAt: user.created_at
      }
    });
  } catch (err) {
    console.error("[User Login Error]:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "An unexpected error occurred during login."
    });
  }
});

/**
 * 3. POST /api/user/auth/change-password
 * Set / Update password for logged-in user (requires newPassword and confirmPassword)
 */
router.post("/change-password", requireUserAuth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long."
      });
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match."
      });
    }

    const user = await db.get("SELECT * FROM users WHERE email = ?", [userEmail]);
    if (!user) {
      return res.status(404).json({ success: false, message: "User account not found." });
    }

    const newHash = hashPassword(newPassword);
    await db.run("UPDATE users SET password_hash = ? WHERE email = ?", [newHash, userEmail]);

    return res.json({
      success: true,
      message: "Password updated successfully! Please use your new password for future logins."
    });
  } catch (err) {
    console.error("[Change Password Error]:", err);
    return res.status(500).json({ success: false, message: err.message || "Failed to change password." });
  }
});

/**
 * 4. POST /api/user/auth/send-otp
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

    const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [rawEmail]);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        notRegistered: true,
        message: "No registered account found with this email. Please create an account first."
      });
    }

    if (existingUser.status === "blocked" || existingUser.status === "suspended") {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive or suspended. Please contact customer support."
      });
    }

    const userName = existingUser?.name || "";

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

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
      isExistingUser: true
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
 * 5. POST /api/user/auth/verify-otp
 * Verifies OTP and logs in existing customer, issuing a 30-day JWT token
 */
router.post("/verify-otp", async (req, res) => {
  try {
    const rawEmail = req.body.email ? String(req.body.email).trim().toLowerCase() : "";
    const otp = req.body.otp ? String(req.body.otp).trim() : "";

    if (!rawEmail || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP code are required."
      });
    }

    const user = await db.get("SELECT * FROM users WHERE email = ?", [rawEmail]);
    if (!user) {
      return res.status(404).json({
        success: false,
        notRegistered: true,
        message: "No registered account found with this email. Please create an account first."
      });
    }

    if (user.status === "blocked" || user.status === "suspended") {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive or suspended. Please contact customer support."
      });
    }

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

    const nowMs = Date.now();
    const expiryMs = new Date(record.expires_at).getTime();
    if (isNaN(expiryMs) || nowMs > expiryMs) {
      return res.status(400).json({
        success: false,
        message: "This verification code has expired. Please request a new one."
      });
    }

    await db.run("UPDATE user_otps SET used = 1 WHERE id = ?", [record.id]);

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
        role: user.role || "customer",
        createdAt: user.created_at
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
 * 6. GET /api/user/auth/profile or /me
 * Returns authenticated customer profile with aggregated orders, wishlist, and address stats
 */
router.get("/profile", requireUserAuth, async (req, res) => {
  try {
    const user = await db.get("SELECT id, name, email, phone, avatar, role, created_at FROM users WHERE email = ?", [req.user.email]);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const orderCountRow = await db.get(
      "SELECT COUNT(*) as count, COALESCE(SUM(total), 0) as totalSpent FROM orders WHERE customer_email = ? OR user_id = ?",
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
          totalSpent: Math.round(orderCountRow?.totalSpent || 0),
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
 * 7. PUT /api/user/auth/profile
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

/**
 * 8. POST /api/user/auth/logout
 */
router.post("/logout", (req, res) => {
  return res.json({
    success: true,
    message: "Signed out successfully."
  });
});

export default router;
