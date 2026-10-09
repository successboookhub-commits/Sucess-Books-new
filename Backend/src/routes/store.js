import { Router } from "express";
import { db } from "../db/database.js";

const router = Router();

// GET /api/store/info - Fetch live bookstore details and statistics
router.get("/info", async (req, res) => {
  try {
    const bookCount = (await db.get("SELECT COUNT(*) as count FROM books"))?.count || 0;
    const orderCount = (await db.get("SELECT COUNT(*) as count FROM orders"))?.count || 0;
    const reviewCount = (await db.get("SELECT COUNT(*) as count FROM reviews"))?.count || 0;
    const userCount = (await db.get("SELECT COUNT(*) as count FROM users"))?.count || 0;

    // Load persisted store settings from database
    const settingsRows = await db.all("SELECT key_name, value_text FROM settings");
    const settingsMap = {};
    for (const r of settingsRows) {
      settingsMap[r.key_name] = r.value_text;
    }

    res.json({
      success: true,
      data: {
        name: settingsMap.store_name || "Success Book Hub",
        tagline: settingsMap.store_tagline || "Curated Books & Timeless Stories",
        phone: settingsMap.store_phone || "+91 98765 43210",
        whatsapp: settingsMap.whatsapp_number || process.env.WHATSAPP_NUMBER || "919876543210",
        email: settingsMap.store_email || "contact@successbookhub.com",
        address: settingsMap.store_address || "42, College Street, Book District, Kolkata, WB 700073, India",
        hours: settingsMap.store_hours || "Mon – Sat: 10:00 AM – 8:30 PM",
        announcement: settingsMap.announcement || "Free Pan-India Delivery on orders above ₹799 • Order directly online or via WhatsApp!",
        freeDeliveryMin: Number(settingsMap.free_delivery_min || 799),
        standardDeliveryFee: Number(settingsMap.standard_delivery_fee || 49),
        gstin: settingsMap.store_gstin || "36AABCS1429B1Z8",
        stats: {
          booksCount: Number(bookCount),
          ordersCount: Number(orderCount),
          reviewsCount: Number(reviewCount),
          usersCount: Number(userCount),
          happyReaders: userCount > 0 ? `${userCount} Readers` : "2,500+"
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
