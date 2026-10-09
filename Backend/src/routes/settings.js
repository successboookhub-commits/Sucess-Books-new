import { Router } from "express";
import { db } from "../db/database.js";

const router = Router();

// GET /api/settings - Fetch all settings as key-value pairs
router.get("/", async (req, res) => {
  try {
    const rows = await db.all("SELECT key_name, value_text FROM settings");
    const settings = {};
    for (const r of rows) {
      settings[r.key_name] = r.value_text;
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (err) {
    console.error("Error fetching settings:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/settings - Update multiple settings atomically
router.put("/", async (req, res) => {
  try {
    const rawBody = req.body;
    if (!rawBody || typeof rawBody !== "object") {
      return res.status(400).json({ success: false, message: "Settings object payload required" });
    }
    const updates = (rawBody.settings && typeof rawBody.settings === "object") ? rawBody.settings : rawBody;

    // Execute in transaction
    await db.transaction(async (tx) => {
      for (const [key, value] of Object.entries(updates)) {
        if (typeof key === "string" && key.trim()) {
          const cleanKey = key.trim();
          const cleanVal = String(value !== undefined && value !== null ? value : "");

          const existing = await tx.get("SELECT key_name FROM settings WHERE key_name = ?", [cleanKey]);
          if (existing) {
            await tx.run("UPDATE settings SET value_text = ? WHERE key_name = ?", [cleanVal, cleanKey]);
          } else {
            await tx.run("INSERT INTO settings (key_name, value_text) VALUES (?, ?)", [cleanKey, cleanVal]);
          }
        }
      }
    });

    const rows = await db.all("SELECT key_name, value_text FROM settings");
    const updatedSettings = {};
    for (const r of rows) {
      updatedSettings[r.key_name] = r.value_text;
    }

    res.json({
      success: true,
      message: "Store configurations updated and persisted to database successfully",
      data: updatedSettings
    });
  } catch (err) {
    console.error("Error updating settings:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
