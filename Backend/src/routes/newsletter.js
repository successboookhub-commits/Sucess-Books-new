import { Router } from "express";
import { db } from "../db/database.js";

const router = Router();

// POST subscribe email
router.post("/", (req, res) => {
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
    const existing = db.prepare("SELECT id FROM newsletter WHERE email = ?").get(trimmed);
    if (existing) {
      return res.json({
        success: true,
        message: "You are already subscribed to our book lovers newsletter!"
      });
    }

    db.prepare("INSERT INTO newsletter (email) VALUES (?)").run(trimmed);

    res.status(201).json({
      success: true,
      message: "Welcome aboard! You have successfully subscribed to Success Book Hub updates."
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
