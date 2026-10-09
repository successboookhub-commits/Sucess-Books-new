import express from "express";
import { saveBase64Image, getUploadsDir } from "../utils/imageStorage.js";

const router = express.Router();

// POST /api/upload - Upload base64 image or data URL
router.post("/", async (req, res) => {
  try {
    const { image, name } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: "No image payload provided" });
    }

    const prefix = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 20) : "upload";
    const publicUrl = await saveBase64Image(image, prefix);

    res.json({
      success: true,
      url: publicUrl,
      message: "Image uploaded and stored successfully"
    });
  } catch (error) {
    console.error("[Upload Route] Error processing image upload:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/upload/info - Diagnostics
router.get("/info", (req, res) => {
  try {
    const dir = getUploadsDir();
    res.json({
      success: true,
      uploadsDir: dir,
      status: "ready"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
