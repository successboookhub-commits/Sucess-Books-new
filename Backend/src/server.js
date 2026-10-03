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

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

// 1. Serve static assets (CSS, JS, images, favicon)
const publicDirs = [
  path.resolve(__dirname, "../../Frontend/.output/public"),
  path.resolve(__dirname, "../Frontend/.output/public"),
  path.resolve(process.cwd(), "Frontend/.output/public"),
  path.resolve(process.cwd(), ".output/public")
];
const publicDir = publicDirs.find(d => fs.existsSync(d));
if (publicDir) {
  app.use(express.static(publicDir));
  console.log(`[Static] Serving assets from: ${publicDir}`);
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

// 4. In-Process SSR Handler for TanStack Start Frontend
let ssrModule = null;
async function getSSRModule() {
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
      console.log(`[SSR] Loaded in-process SSR handler from: ${ssrPath}`);
    } catch (err) {
      console.error("[SSR] Failed to import SSR module:", err);
    }
  }
  return ssrModule;
}

// 5. Handle all web page routes with In-Process SSR
app.use(async (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      success: false,
      message: `API Route ${req.method} ${req.originalUrl} not found`
    });
  }

  try {
    const handler = await getSSRModule();
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
      res.status(webRes.status);
      webRes.headers.forEach((val, key) => {
        res.setHeader(key, val);
      });
      const arrayBuffer = await webRes.arrayBuffer();
      return res.send(Buffer.from(arrayBuffer));
    }
  } catch (err) {
    console.error("[SSR] Error rendering page:", err);
  }

  next();
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
    await getSSRModule();

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
