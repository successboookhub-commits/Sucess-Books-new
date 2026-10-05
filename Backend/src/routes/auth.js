import { Router } from "express";
import { db } from "../db/database.js";
import { sendAdminOtpEmail } from "../services/mailService.js";
import { generateAdminToken, requireAdminAuth } from "../middleware/auth.js";

const router = Router();

const DEFAULT_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "successboookhub@gmail.com").trim().toLowerCase();

/**
 * 1. POST /api/auth/send-otp
 * Generates and sends a real 6-digit OTP to the registered admin email via Gmail SMTP
 */
router.post("/send-otp", async (req, res) => {
  try {
    const rawEmail = req.body.email ? String(req.body.email).trim().toLowerCase() : "";

    if (!rawEmail) {
      return res.status(400).json({
        success: false,
        message: "Email address is required."
      });
    }

    // Security check: Only configured admin email is allowed to receive admin login OTPs
    if (rawEmail !== DEFAULT_ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: `Unauthorized email address. Only ${DEFAULT_ADMIN_EMAIL} is authorized for Admin access.`
      });
    }

    // Generate random 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Expiry time: 10 minutes from now in ISO UTC string
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Store OTP in database
    await db.run(
      "INSERT INTO admin_otps (email, otp, expires_at, used) VALUES (?, ?, ?, 0)",
      [rawEmail, otp, expiresAt]
    );

    // Send the real email
    console.log(`[Auth] Sending Admin Login OTP to ${rawEmail}...`);
    await sendAdminOtpEmail(rawEmail, otp);
    console.log(`[Auth] OTP sent successfully to ${rawEmail}!`);

    return res.json({
      success: true,
      message: `A 6-digit verification code has been sent to ${rawEmail}. Please check your inbox.`,
      email: rawEmail
    });
  } catch (err) {
    console.error("[Auth Error] Failed to send OTP:", err);
    return res.status(500).json({
      success: false,
      message: `Failed to send OTP email: ${err.message || "Email server error"}`
    });
  }
});

/**
 * 2. POST /api/auth/verify-otp
 * Verifies the 6-digit OTP and issues a JWT token
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

    if (rawEmail !== DEFAULT_ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized admin email address."
      });
    }

    // Find the latest valid unused OTP for this email
    const record = await db.get(
      `SELECT * FROM admin_otps 
       WHERE email = ? AND otp = ? AND used = 0 
       ORDER BY id DESC LIMIT 1`,
      [rawEmail, otp]
    );

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP or code already used. Please request a new code."
      });
    }

    // Check expiry using timestamp epoch
    const nowMs = Date.now();
    const expiryMs = new Date(record.expires_at).getTime();
    if (isNaN(expiryMs) || nowMs > expiryMs) {
      return res.status(400).json({
        success: false,
        message: "This OTP code has expired. Please request a new code."
      });
    }

    // Mark as used
    await db.run("UPDATE admin_otps SET used = 1 WHERE id = ?", [record.id]);

    // Generate JWT token (valid for 7 days)
    const token = generateAdminToken({
      email: rawEmail,
      role: "admin",
      name: "Success Book Hub Administrator"
    });

    return res.json({
      success: true,
      message: "Admin authentication successful!",
      token,
      user: {
        email: rawEmail,
        role: "admin",
        name: "Success Book Hub Administrator"
      }
    });
  } catch (err) {
    console.error("[Auth Error] Verification failed:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to verify OTP."
    });
  }
});

/**
 * 3. GET /api/auth/me
 * Returns current authenticated admin user status
 */
router.get("/me", requireAdminAuth, (req, res) => {
  return res.json({
    success: true,
    user: req.adminUser
  });
});

/**
 * 4. POST /api/auth/logout
 */
router.post("/logout", (req, res) => {
  return res.json({
    success: true,
    message: "Logged out successfully."
  });
});

export default router;
