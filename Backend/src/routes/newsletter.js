import { Router } from "express";
import { db } from "../db/database.js";

const router = Router();

// POST subscribe email
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address."
      });
    }

    const trimmed = email.trim().toLowerCase();

    // Check if already subscribed
    const existing = await db.get("SELECT id FROM newsletter WHERE email = ?", [trimmed]);
    if (existing) {
      return res.json({
        success: true,
        message: "You are already subscribed to our book lovers newsletter!"
      });
    }

    await db.run("INSERT INTO newsletter (email) VALUES (?)", [trimmed]);

    res.status(201).json({
      success: true,
      message: "Welcome aboard! You have successfully subscribed to Success Book Hub updates."
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all newsletter subscribers (for admin view)
router.get("/", async (req, res) => {
  try {
    const subscribers = await db.all("SELECT * FROM newsletter ORDER BY created_at DESC");
    res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
