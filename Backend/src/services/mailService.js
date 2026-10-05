import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter = null;

function getTransporter() {
  if (!transporter) {
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || "successboookhub@gmail.com";
    const smtpPass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");

    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }
  return transporter;
}

/**
 * Send 6-digit OTP to Admin Email
 */
export async function sendAdminOtpEmail(toEmail, otp) {
  const mailClient = getTransporter();
  const currentYear = new Date().getFullYear();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Login OTP — Success Book Hub</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f7f4ee;
      margin: 0;
      padding: 24px;
      color: #1e1e1e;
    }
    .email-container {
      max-width: 520px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.06);
      border: 1px solid #e8e2d5;
    }
    .header {
      background: linear-gradient(135deg, #4a1525 0%, #2b0b14 100%);
      padding: 32px 24px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 24px;
      letter-spacing: 0.5px;
      color: #f6e6cb;
    }
    .header p {
      margin: 6px 0 0 0;
      font-size: 12px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #d1b89d;
    }
    .content {
      padding: 32px 28px;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background: #fbf3e4;
      border: 1px solid #ebd3a6;
      color: #8c5b16;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 16px;
    }
    h2 {
      margin: 0 0 12px 0;
      font-size: 20px;
      color: #2b0b14;
    }
    p {
      color: #555555;
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 20px 0;
    }
    .otp-box {
      background: #fdfaf6;
      border: 2px dashed #b8860b;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      margin: 24px 0;
    }
    .otp-code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 36px;
      font-weight: 800;
      color: #800020;
      letter-spacing: 10px;
      margin: 0;
      user-select: all;
    }
    .expiry {
      font-size: 12px;
      color: #8c5b16;
      margin-top: 8px;
      font-weight: 600;
    }
    .security-notice {
      background: #fff8f8;
      border-left: 4px solid #d9534f;
      padding: 12px 16px;
      border-radius: 4px;
      font-size: 12px;
      color: #721c24;
      margin-bottom: 24px;
    }
    .footer {
      background: #faf7f2;
      padding: 20px;
      text-align: center;
      font-size: 11px;
      color: #888888;
      border-top: 1px solid #ece6db;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Success Book Hub</h1>
      <p>Store Administration Portal</p>
    </div>
    <div class="content">
      <span class="badge">🔒 One-Time Security Passcode</span>
      <h2>Your Login Verification Code</h2>
      <p>Hello Administrator, a login attempt was requested for the <strong>Success Book Hub Admin Portal</strong>. Please use the one-time passcode below to verify your session:</p>
      
      <div class="otp-box">
        <div class="otp-code">${otp}</div>
        <div class="expiry">⏳ Valid for 10 minutes only</div>
      </div>

      <div class="security-notice">
        <strong>Security Notice:</strong> Never share this OTP with anyone. Success Book Hub team members will never ask for your verification code. If you did not initiate this login request, please verify your account security immediately.
      </div>
    </div>
    <div class="footer">
      &copy; ${currentYear} Success Book Hub. All rights reserved.<br />
      Secure Store Management System
    </div>
  </div>
</body>
</html>
  `;

  const info = await mailClient.sendMail({
    from: `"Success Book Hub Admin" <${process.env.SMTP_USER || "successboookhub@gmail.com"}>`,
    to: toEmail,
    subject: `🔐 ${otp} is your Admin Login OTP — Success Book Hub`,
    text: `Your Success Book Hub Admin Login OTP is: ${otp}. This code is valid for 10 minutes. Do not share it with anyone.`,
    html: htmlContent,
  });

  return info;
}
