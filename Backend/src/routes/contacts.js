import { Router } from "express";
import { db } from "../db/database.js";

const router = Router();

// POST submit contact message
router.post("/", async (req, res) => {
  try {
    const { name, email = "", phone = "", message } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: "Name and message are required."
      });
    }

    const result = await db.run(`
      INSERT INTO contacts (name, email, phone, message)
      VALUES (?, ?, ?, ?)
    `, [name.trim(), email.trim(), phone.trim(), message.trim()]);

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been received. Our team will contact you shortly.",
      id: result.lastInsertRowid
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all contact inquiries (admin)
router.get("/", async (req, res) => {
  try {
    const inquiries = await db.all("SELECT * FROM contacts ORDER BY created_at DESC");
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
