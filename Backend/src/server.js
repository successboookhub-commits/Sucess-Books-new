import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { initDatabase, db } from "./db/database.js";
import booksRouter from "./routes/books.js";
import ordersRouter from "./routes/orders.js";
import contactsRouter from "./routes/contacts.js";
import newsletterRouter from "./routes/newsletter.js";
import storeRouter from "./routes/store.js";
import categoriesRouter from "./routes/categories.js";
import subcategoriesRouter from "./routes/subcategories.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Helper to find directories/files regardless of Hostinger working directory
function resolveLocation(...segments) {
  const root = segments.join("/");
  const candidates = [
    path.resolve(__dirname, "../../Frontend", root),
    path.resolve(__dirname, "../Frontend", root),
    path.resolve(__dirname, "..", root),
    path.resolve(__dirname, root),
    path.resolve(process.cwd(), "Frontend", root),
    path.resolve(process.cwd(), root)
  ];
  return candidates.find(c => fs.existsSync(c)) || null;
}

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

// 1. Static Assets Serving
const publicDir = resolveLocation(".output/public") || resolveLocation("public");
if (publicDir) {
  console.log(`[Static] Serving public files from: ${publicDir}`);
  app.use(express.static(publicDir, {
    maxAge: "1d",
    index: false
  }));
}

// 2. Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Success Book Hub API",
    dbEngine: db.isMySQL ? "MySQL (phpMyAdmin)" : "SQLite (Local)",
    timestamp: new Date().toISOString()
  });
});

// 3. API Routes
app.use("/api/books", booksRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/contact", contactsRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/store", storeRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/subcategories", subcategoriesRouter);
app.use("/api/sub-categories", subcategoriesRouter);

// 4. In-Process SSR Loader
let ssrHandler = null;
async function loadSSR() {
  if (ssrHandler) return ssrHandler;
  const ssrFile = resolveLocation(".output/server/_ssr/ssr.mjs") || resolveLocation(".output/server/index.mjs");
  if (ssrFile) {
    try {
      const mod = await import(pathToFileURL(ssrFile).href);
      ssrHandler = mod.default || mod;
      console.log(`[SSR] Loaded in-process SSR handler from: ${ssrFile}`);
    } catch (err) {
      console.error("[SSR] Error importing SSR module:", err.message);
    }
  }
  return ssrHandler;
}

// 5. Fallback HTML Generator
function getFallbackHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Success Book Hub — Curated Books & Timeless Stories</title>
  <meta name="description" content="A thoughtfully curated online bookstore with direct checkout & WhatsApp ordering." />
  <meta name="author" content="Success Book Hub" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="alternate icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" />
  <link rel="stylesheet" href="/assets/styles-BKSpHtNf.css" />
  <link rel="modulepreload" href="/assets/index-BloPaMl4.js" />
  <link rel="modulepreload" href="/assets/preload-helper-DSosWCtT.js" />
  <link rel="modulepreload" href="/assets/routes-C5C_YdWf.js" />
</head>
<body class="bg-background text-foreground antialiased">
  <div id="root"></div>
  <script type="module" src="/assets/index-BloPaMl4.js"></script>
</body>
</html>`;
}

// 6. Web Page Router (Handles all pages: /, /shop, /about, /contact, /admin)
app.get("*", async (req, res) => {
  // If requesting an API endpoint that wasn't matched
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      success: false,
      message: `API Route ${req.method} ${req.originalUrl} not found`
    });
  }

  // 1. Try In-Process SSR
  try {
    const handler = await loadSSR();
    if (handler?.fetch) {
      const host = req.headers.host || "successbookhub.com";
      const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
      const url = new URL(req.originalUrl || req.url, `${protocol}://${host}`);

      const headers = new Headers();
      for (const [k, v] of Object.entries(req.headers)) {
        if (v) {
          if (Array.isArray(v)) v.forEach(item => headers.append(k, item));
          else headers.set(k, v);
        }
      }

      const webReq = new Request(url.toString(), {
        method: req.method,
        headers
      });

      const webRes = await handler.fetch(webReq);
      if (webRes && webRes.status < 500) {
        res.status(webRes.status);
        webRes.headers.forEach((val, key) => {
          res.setHeader(key, val);
        });
        const arrayBuffer = await webRes.arrayBuffer();
        return res.send(Buffer.from(arrayBuffer));
      }
    }
  } catch (err) {
    console.error("[SSR] SSR render failed, falling back to static HTML:", err.message);
  }

  // 2. Try static index.html from .output/public
  const indexFile = resolveLocation(".output/public/index.html");
  if (indexFile && fs.existsSync(indexFile)) {
    return res.sendFile(indexFile);
  }

  // 3. Guaranteed HTML Fallback
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  return res.send(getFallbackHTML());
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({
    success: false,
    error: err.message || "Internal server error"
  });
});

// Async server bootstrapper
async function startServer() {
  try {
    await initDatabase();
    await loadSSR();

    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`  Success Book Hub Unified Server is Running          `);
      console.log(`  Website URL: http://localhost:${PORT}               `);
      console.log(`  Database Engine: ${db.isMySQL ? "MySQL" : "SQLite"} `);
      console.log(`  Health Check: http://localhost:${PORT}/api/health   `);
      console.log(`=======================================================`);
    });
  } catch (err) {
    console.error("Fatal: Failed to bootstrap server:", err);
    process.exit(1);
  }
}

startServer();

export default app;
