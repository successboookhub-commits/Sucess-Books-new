import { Router } from "express";
import { db } from "../db/database.js";

const router = Router();

// GET store info and statistics
router.get("/info", (req, res) => {
  try {
    const bookCount = db.prepare("SELECT COUNT(*) as count FROM books").get().count;
    const orderCount = db.prepare("SELECT COUNT(*) as count FROM orders").get().count;
    const reviewCount = db.prepare("SELECT COUNT(*) as count FROM reviews").get().count;

    res.json({
      success: true,
      data: {
        name: "Success Book Hub",
        tagline: "Curated Books & Timeless Stories",
        phone: "+91 98765 43210",
        whatsapp: process.env.WHATSAPP_NUMBER || "919876543210",
        email: "contact@successbookhub.com",
        address: "42, College Street, Book District, Kolkata, WB 700073, India",
        hours: "Mon – Sat: 10:00 AM – 8:30 PM",
        announcement: "Free Pan-India Delivery on orders above ₹799 • Order directly online or via WhatsApp!",
        stats: {
          booksCount: bookCount,
          ordersCount: orderCount,
          reviewsCount: reviewCount,
          happyReaders: "2,500+"
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
