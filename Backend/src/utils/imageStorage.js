import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Locate or initialize the persistent uploads directory
let cachedUploadsDir = null;

export function getUploadsDir() {
  if (cachedUploadsDir && fs.existsSync(cachedUploadsDir)) {
    return cachedUploadsDir;
  }

  const candidateDirs = [
    path.resolve(__dirname, "../../public/uploads"),
    path.resolve(__dirname, "../public/uploads"),
    path.resolve(process.cwd(), "public/uploads"),
    path.resolve(process.cwd(), "Backend/public/uploads"),
    path.resolve(process.cwd(), ".output/public/uploads"),
    "/home/u803044110/domains/successbookhub.com/public_html/uploads"
  ];

  for (const dir of candidateDirs) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.accessSync(dir, fs.constants.W_OK);
      cachedUploadsDir = dir;
      console.log(`[ImageStorage] Using uploads directory: ${dir}`);
      return dir;
    } catch {
      // Continue to next candidate
    }
  }

  // Fallback to local cwd
  const fallback = path.resolve(process.cwd(), "public/uploads");
  try {
    fs.mkdirSync(fallback, { recursive: true });
  } catch (err) {
    console.error("[ImageStorage] Could not create fallback uploads dir:", err);
  }
  cachedUploadsDir = fallback;
  return fallback;
}

/**
 * Saves a base64 Data URL to disk as a static image file.
 * Returns the public URL (e.g. "/uploads/cat-1728456.jpg") on success,
 * or the original dataUri if it's already a URL or if file saving fails.
 */
export async function saveBase64Image(dataUri, prefix = "img") {
  if (!dataUri || typeof dataUri !== "string") return dataUri;

  // If it's already an HTTP URL or local static URL, keep as is
  if (dataUri.startsWith("http://") || dataUri.startsWith("https://") || dataUri.startsWith("/uploads/")) {
    return dataUri;
  }

  // Match data URI pattern: data:image/jpeg;base64,.....
  const match = dataUri.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!match) {
    return dataUri;
  }

  try {
    let rawExt = match[1].toLowerCase();
    if (rawExt === "jpeg") rawExt = "jpg";
    if (rawExt === "svg+xml") rawExt = "svg";
    const ext = ["jpg", "png", "webp", "gif", "svg", "jpeg"].includes(rawExt) ? rawExt : "jpg";

    const base64Content = match[2];
    const buffer = Buffer.from(base64Content, "base64");

    const uploadsDir = getUploadsDir();
    const randomSuffix = crypto.randomBytes(6).toString("hex");
    const filename = `${prefix}-${Date.now()}-${randomSuffix}.${ext}`;
    const filePath = path.join(uploadsDir, filename);

    await fs.promises.writeFile(filePath, buffer);
    console.log(`[ImageStorage] Saved uploaded image to disk: ${filePath} (${buffer.length} bytes)`);

    // Return the public web path
    return `/uploads/${filename}`;
  } catch (err) {
    console.error("[ImageStorage] Failed to save base64 image to disk, falling back to dataUri:", err.message);
    return dataUri;
  }
}
