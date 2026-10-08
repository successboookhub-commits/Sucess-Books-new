import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter = null;

function getTransporter() {
  if (!transporter) {
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = (process.env.SMTP_USER || "successboookhub@gmail.com").trim().toLowerCase();
    const smtpPass = (process.env.SMTP_PASS || "").replace(/\s+/g, "").toLowerCase();

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

/**
 * Send 6-digit OTP to Customer Email for Login / Registration
 */
export async function sendUserOtpEmail(toEmail, otp, userName = "") {
  const mailClient = getTransporter();
  const currentYear = new Date().getFullYear();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Login OTP — Success Book Hub</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8f6f0;
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
      background: linear-gradient(135deg, #800020 0%, #4a0d1b 100%);
      padding: 32px 24px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 26px;
      letter-spacing: 0.5px;
      color: #f6e6cb;
    }
    .header p {
      margin: 6px 0 0 0;
      font-size: 13px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #d1b89d;
    }
    .content {
      padding: 32px 28px;
    }
    .greeting {
      font-size: 18px;
      font-weight: 700;
      color: #800020;
      margin-bottom: 12px;
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
      padding: 24px 20px;
      text-align: center;
      margin: 24px 0;
    }
    .otp-code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 40px;
      font-weight: 800;
      color: #800020;
      letter-spacing: 12px;
      margin: 0;
      user-select: all;
    }
    .expiry {
      font-size: 12px;
      color: #8c5b16;
      margin-top: 10px;
      font-weight: 600;
    }
    .features {
      background: #faf7f2;
      border-radius: 10px;
      padding: 16px;
      margin-top: 20px;
    }
    .features ul {
      margin: 0;
      padding-left: 20px;
      color: #666;
      font-size: 13px;
    }
    .features li {
      margin-bottom: 6px;
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
      <p>Your Premier Literary Destination</p>
    </div>
    <div class="content">
      <div class="greeting">Hello ${userName || "Book Lover"},</div>
      <p>Thank you for signing in to <strong>Success Book Hub</strong>. Please use the verification code below to securely access your account and manage your orders:</p>
      
      <div class="otp-box">
        <div class="otp-code">${otp}</div>
        <div class="expiry">⏳ Valid for 10 minutes only</div>
      </div>

      <div class="features">
        <strong style="color: #800020; font-size: 13px;">With your account you can:</strong>
        <ul>
          <li>Track orders and download official GST Tax Invoices</li>
          <li>Save multiple delivery addresses for fast 1-click checkout</li>
          <li>Manage your personal wishlist and enjoy exclusive member discounts</li>
        </ul>
      </div>
    </div>
    <div class="footer">
      &copy; ${currentYear} Success Book Hub. All rights reserved.<br />
      If you did not request this code, please ignore this email.
    </div>
  </div>
</body>
</html>
  `;

  const info = await mailClient.sendMail({
    from: `"Success Book Hub" <${process.env.SMTP_USER || "successboookhub@gmail.com"}>`,
    to: toEmail,
    subject: `📚 ${otp} is your Success Book Hub verification code`,
    text: `Your Success Book Hub verification OTP is: ${otp}. Valid for 10 minutes.`,
    html: htmlContent,
  });

  return info;
}

/**
 * Send Order Confirmation & Invoice Email to Customer
 */
export async function sendOrderConfirmationEmail(orderData) {
  try {
    const { id, customerName, customerEmail, customerPhone, deliveryAddress, city, pincode, items, subtotal, deliveryFee, total, paymentMethod } = orderData;
    if (!customerEmail) return null;

    const mailClient = getTransporter();
    const currentYear = new Date().getFullYear();

    const itemsRows = items.map(item => `
      <tr>
        <td style="padding: 10px 8px; border-bottom: 1px solid #eee; font-size: 14px;">${item.title}</td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #eee; font-size: 14px; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #eee; font-size: 14px; text-align: right;">₹${item.price * item.quantity}</td>
      </tr>
    `).join("");

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #fdfbf7; padding: 20px; color: #222; }
    .card { max-width: 560px; margin: 0 auto; background: #fff; border-radius: 12px; border: 1px solid #e8e2d5; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    .header { background: #800020; color: #f6e6cb; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; font-family: 'Playfair Display', serif; }
    .content { padding: 24px; }
    .order-badge { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; padding: 8px 14px; border-radius: 8px; font-weight: 600; font-size: 13px; text-align: center; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    th { text-align: left; padding: 8px; background: #faf7f2; border-bottom: 2px solid #ddd; font-size: 12px; text-transform: uppercase; color: #666; }
    .summary-row { font-size: 14px; padding: 6px 0; display: flex; justify-content: space-between; }
    .total-row { font-size: 18px; font-weight: bold; color: #800020; padding-top: 10px; border-top: 2px solid #800020; display: flex; justify-content: space-between; margin-top: 8px; }
    .address-box { background: #f9f9f9; padding: 12px 16px; border-radius: 8px; margin-top: 16px; font-size: 13px; color: #444; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Success Book Hub</h1>
      <p style="margin: 4px 0 0 0; font-size: 12px; letter-spacing: 1px; color: #d1b89d;">Order Confirmation</p>
    </div>
    <div class="content">
      <div class="order-badge">✓ Order #${id} Placed Successfully!</div>
      <p>Dear <strong>${customerName}</strong>, thank you for your order! We are preparing your package for delivery.</p>
      
      <table>
        <thead>
          <tr>
            <th>Book Title</th>
            <th style="text-align: center;">Qty</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>

      <div style="border-top: 1px solid #eee; padding-top: 12px;">
        <div class="summary-row"><span>Items Subtotal:</span><span>₹${subtotal}</span></div>
        <div class="summary-row"><span>Delivery Charges:</span><span>${deliveryFee > 0 ? `₹${deliveryFee}` : "FREE"}</span></div>
        <div class="summary-row"><span>Payment Mode:</span><span>${paymentMethod}</span></div>
        <div class="total-row"><span>Grand Total:</span><span>₹${total}</span></div>
      </div>

      <div class="address-box">
        <strong>Delivery Address:</strong><br />
        ${customerName}<br />
        ${deliveryAddress}${city ? `, ${city}` : ""}${pincode ? ` - ${pincode}` : ""}<br />
        Phone: ${customerPhone}
      </div>
    </div>
  </div>
</body>
</html>
    `;

    await mailClient.sendMail({
      from: `"Success Book Hub Orders" <${process.env.SMTP_USER || "successboookhub@gmail.com"}>`,
      to: customerEmail,
      subject: `🎉 Order Confirmation: #${id} — Success Book Hub`,
      text: `Hello ${customerName}, your order #${id} for ₹${total} has been confirmed!`,
      html: htmlContent,
    });
  } catch (err) {
    console.warn("[Mail Error] Could not send customer order email:", err.message);
  }
}

