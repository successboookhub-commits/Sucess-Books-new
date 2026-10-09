/**
 * Image compression and upload utility
 * Optimizes local image files client-side before sending to server or saving to database,
 * preventing payload bloat, database truncation, and slow network uploads.
 */

interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export async function compressImageFile(
  file: File,
  options: CompressOptions = {}
): Promise<string> {
  const { maxWidth = 1200, maxHeight = 800, quality = 0.82 } = options;

  return new Promise((resolve) => {
    // If not an image, fallback to standard FileReader
    if (!file.type || !file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      if (!rawDataUrl) {
        resolve("");
        return;
      }

      // If SVG, preserve vector format without canvas rasterization
      if (file.type === "image/svg+xml") {
        resolve(rawDataUrl);
        return;
      }

      const img = new Image();
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (width <= 0 || height <= 0) {
          resolve(rawDataUrl);
          return;
        }

        // Calculate proportional scale
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        try {
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(rawDataUrl);
            return;
          }

          // Use high quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG
          const compressed = canvas.toDataURL("image/jpeg", quality);
          resolve(compressed);
        } catch (err) {
          console.warn("[compressImageFile] Canvas compression failed, using raw data URL:", err);
          resolve(rawDataUrl);
        }
      };

      img.onerror = () => {
        console.warn("[compressImageFile] Image decode error, falling back to raw data URL");
        resolve(rawDataUrl);
      };

      img.src = rawDataUrl;
    };

    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

/**
 * Optimizes and uploads an image to the backend /api/upload endpoint.
 * Returns the public URL (e.g. "/uploads/cat-1728...jpg") on success.
 * Gracefully falls back to the compressed base64 Data URL if the upload endpoint is unreachable.
 */
export async function uploadImageToServer(
  fileOrData: File | string,
  namePrefix?: string
): Promise<string> {
  let base64Payload = "";

  if (typeof fileOrData === "string") {
    // If it's already an HTTP URL or local static URL, no upload needed
    if (fileOrData.startsWith("http://") || fileOrData.startsWith("https://") || fileOrData.startsWith("/uploads/")) {
      return fileOrData;
    }
    base64Payload = fileOrData;
  } else {
    // Compress file client-side first
    base64Payload = await compressImageFile(fileOrData);
  }

  if (!base64Payload || !base64Payload.startsWith("data:image/")) {
    return base64Payload;
  }

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: base64Payload,
        name: namePrefix || "image"
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.url) {
        return data.url;
      }
    }
  } catch (err) {
    console.warn("[uploadImageToServer] /api/upload network notice, using compressed data URL:", err);
  }

  // Graceful fallback to the lightweight compressed base64 string
  return base64Payload;
}
