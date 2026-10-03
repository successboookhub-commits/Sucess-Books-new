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

// Helper to find existing directory
function findExistingDir(...relativePaths) {
  for (const rel of relativePaths) {
    const candidates = [
      path.resolve(__dirname, rel),
      path.resolve(process.cwd(), rel)
    ];
    for (const c of candidates) {
      if (fs.existsSync(c) && fs.statSync(c).isDirectory()) {
        return c;
      }
    }
  }
  return null;
}

// Helper to set MIME types strictly
const staticOptions = {
  maxAge: "1d",
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".js") || filePath.endsWith(".mjs")) {
      res.setHeader("Content-Type", "application/javascript; charset=utf-8");
    } else if (filePath.endsWith(".css")) {
      res.setHeader("Content-Type", "text/css; charset=utf-8");
    } else if (filePath.endsWith(".svg")) {
      res.setHeader("Content-Type", "image/svg+xml");
    } else if (filePath.endsWith(".ico")) {
      res.setHeader("Content-Type", "image/x-icon");
    } else if (filePath.endsWith(".png")) {
      res.setHeader("Content-Type", "image/png");
    }
  }
};

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

// 1. Explicit Assets Directory Serving with Strict JavaScript MIME types
const possibleAssetsDirs = [
  "../public/assets",
  "../../Frontend/.output/public/assets",
  "../../public/assets",
  "Backend/public/assets",
  "Frontend/.output/public/assets",
  "public/assets"
];
for (const rel of possibleAssetsDirs) {
  const dir = findExistingDir(rel);
  if (dir) {
    console.log(`[Static] Mounting /assets from: ${dir}`);
    app.use("/assets", express.static(dir, staticOptions));
  }
}

// 2. Root Static Files (Favicons, Robots, etc.)
const possiblePublicDirs = [
  "../public",
  "../../Frontend/.output/public",
  "../../public",
  "Backend/public",
  "Frontend/.output/public",
  "public"
];
for (const rel of possiblePublicDirs) {
  const dir = findExistingDir(rel);
  if (dir) {
    console.log(`[Static] Mounting public root from: ${dir}`);
    app.use(express.static(dir, staticOptions));
  }
}

// 3. Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Success Book Hub API",
    dbEngine: db.isMySQL ? "MySQL (phpMyAdmin)" : "SQLite (Local)",
    timestamp: new Date().toISOString()
  });
});

// 4. API Routes
app.use("/api/books", booksRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/contact", contactsRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/store", storeRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/subcategories", subcategoriesRouter);
app.use("/api/sub-categories", subcategoriesRouter);

// 5. In-Process SSR Module Loader
let ssrModule = null;
async function loadSSR() {
  if (ssrModule) return ssrModule;
  const possiblePaths = [
    path.resolve(__dirname, "../../Frontend/.output/server/_ssr/ssr.mjs"),
    path.resolve(__dirname, "../Frontend/.output/server/_ssr/ssr.mjs"),
    path.resolve(process.cwd(), "Frontend/.output/server/_ssr/ssr.mjs"),
    path.resolve(process.cwd(), ".output/server/_ssr/ssr.mjs")
  ];
  const ssrPath = possiblePaths.find(p => fs.existsSync(p));
  if (ssrPath) {
    try {
      const mod = await import(pathToFileURL(ssrPath).href);
      ssrModule = mod.default || mod;
      console.log(`[SSR] In-Process SSR Engine ready from: ${ssrPath}`);
    } catch (err) {
      console.error("[SSR] Failed to load SSR module:", err.message);
    }
  }
  return ssrModule;
}

// 6. Fallback HTML Generator
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

// 7. Web Page Routing (Prevents any static file from returning HTML)
app.get("*", async (req, res) => {
  // Never return HTML for API requests
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      success: false,
      message: `API Route ${req.method} ${req.originalUrl} not found`
    });
  }

  // Never return HTML for missing asset requests (prevents MIME type script error)
  if (req.path.startsWith("/assets/") || /\.(js|mjs|css|png|jpg|jpeg|svg|ico|json|woff2?|ttf|map)$/i.test(req.path)) {
    return res.status(404).type("text/plain").send(`Asset ${req.path} not found`);
  }

  // Try In-Process SSR
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
    console.error("[SSR] SSR render fallback:", err.message);
  }

  // Fallback HTML page
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
