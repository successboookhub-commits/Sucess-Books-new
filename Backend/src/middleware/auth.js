import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "successbookhub_fallback_jwt_secret_key_2026";

/**
 * Middleware to verify JWT token in Authorization header
 */
export function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token required. Please login as admin."
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access forbidden: Admin privileges required."
      });
    }
    req.adminUser = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired session. Please login again."
    });
  }
}

export function generateAdminToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
