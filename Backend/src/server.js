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

const PORT = Number(process.env.PORT) || 5000;

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

let ssrModule = null;
let ssrModuleError = null;
let ssrModulePath = null;

// 1. In-Process Direct SSR Engine Loader
async function getSSRModule() {
  if (ssrModule) return ssrModule;
  const candidatePaths = [
    path.resolve(__dirname, "../../Frontend/.output/server/_ssr/ssr.mjs"),
    path.resolve(__dirname, "../../.output/server/_ssr/ssr.mjs"),
    path.resolve(__dirname, "../.output/server/_ssr/ssr.mjs"),
    path.resolve(process.cwd(), "Frontend/.output/server/_ssr/ssr.mjs"),
    path.resolve(process.cwd(), ".output/server/_ssr/ssr.mjs"),
    path.resolve(process.cwd(), "Backend/.output/server/_ssr/ssr.mjs")
  ];
  
  const foundPath = candidatePaths.find(p => fs.existsSync(p));
  if (foundPath) {
    try {
      const mod = await import(pathToFileURL(foundPath).href);
      ssrModule = mod.default || mod;
      ssrModulePath = foundPath;
      console.log(`[SSR] In-Process SSR Engine loaded from: ${foundPath}`);
    } catch (err) {
      ssrModuleError = err.stack || err.message;
      console.error("[SSR] Failed to import SSR module:", err);
    }
  } else {
    ssrModuleError = `No ssr.mjs found. Searched: ${candidatePaths.join(", ")}`;
    console.warn("[SSR] Warning: " + ssrModuleError);
  }
  return ssrModule;
}

// 2. Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    version: "2.5.0-direct-ssr",
    service: "Success Book Hub API",
    dbEngine: db.isMySQL ? "MySQL (phpMyAdmin)" : "SQLite (Local)",
    ssrReady: Boolean(ssrModule),
    ssrPath: ssrModulePath,
    ssrError: ssrModuleError,
    nodeVersion: process.version,
    cwd: process.cwd(),
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

// 4. Static Asset Serving (Direct disk serving with strict MIME types)
const staticOptions = {
  maxAge: "1d",
  index: false,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".js") || filePath.endsWith(".mjs")) {
      res.setHeader("Content-Type", "application/javascript; charset=utf-8");
    } else if (filePath.endsWith(".css")) {
      res.setHeader("Content-Type", "text/css; charset=utf-8");
    }
  }
};

const candidateStaticDirs = [
  path.resolve(__dirname, "../../Frontend/.output/public"),
  path.resolve(__dirname, "../../.output/public"),
  path.resolve(__dirname, "../.output/public"),
  path.resolve(process.cwd(), "Frontend/.output/public"),
  path.resolve(process.cwd(), ".output/public"),
  path.resolve(process.cwd(), "Backend/.output/public"),
  path.resolve(__dirname, "../public"),
  path.resolve(process.cwd(), "public")
];

const mountedDirs = new Set();
for (const dir of candidateStaticDirs) {
  if (fs.existsSync(dir) && !mountedDirs.has(dir)) {
    mountedDirs.add(dir);
    app.use(express.static(dir, staticOptions));
    const assetsSubDir = path.join(dir, "assets");
    if (fs.existsSync(assetsSubDir)) {
      app.use("/assets", express.static(assetsSubDir, staticOptions));
    }
  }
}

// Strict 404 handler for missing static assets (guarantees HTML is NEVER sent for missing .js/.css)
app.use((req, res, next) => {
  if (req.path.startsWith("/assets/") || /\.(js|mjs|css|png|jpg|jpeg|svg|ico|json|woff2?|ttf|map)$/i.test(req.path)) {
    return res.status(404).type("text/plain").send(`Asset ${req.path} not found`);
  }
  next();
});

// 5. Web Page Routing (Direct In-Memory SSR Execution)
app.get("*", async (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      success: false,
      message: `API Route ${req.method} ${req.originalUrl} not found`
    });
  }

  try {
    const handler = await getSSRModule();
    if (handler && typeof handler.fetch === "function") {
      const host = req.headers.host || "successbookhub.com";
      const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
      const fullUrl = `${protocol}://${host}${req.originalUrl || req.url}`;

      const reqHeaders = new Headers();
      for (const [k, v] of Object.entries(req.headers)) {
        if (v) {
          if (Array.isArray(v)) v.forEach(item => reqHeaders.append(k, item));
          else reqHeaders.set(k, v);
        }
      }

      const webRequest = new Request(fullUrl, {
        method: req.method,
        headers: reqHeaders
      });

      const webResponse = await handler.fetch(webRequest, {}, {});
      if (webResponse && webResponse.status < 500) {
        res.status(webResponse.status);
        webResponse.headers.forEach((val, key) => {
          res.setHeader(key, val);
        });
        const html = await webResponse.text();
        return res.send(html);
      } else if (webResponse && webResponse.status >= 500) {
        console.warn(`[SSR Warning] SSR returned status ${webResponse.status}. Falling back to client-side rendered SPA.`);
      }
    }
  } catch (err) {
    console.error("[SSR Direct Render Error]:", err.message);
  }

  // Fallback to static index.html if SSR module failed
  const fallbackPaths = [
    path.resolve(__dirname, "../../Frontend/.output/public/index.html"),
    path.resolve(__dirname, "../../.output/public/index.html"),
    path.resolve(process.cwd(), "Frontend/.output/public/index.html"),
    path.resolve(process.cwd(), ".output/public/index.html"),
    path.resolve(process.cwd(), "public/index.html")
  ];
  const indexPath = fallbackPaths.find(p => fs.existsSync(p));
  if (indexPath) {
    return res.sendFile(indexPath);
  }

  res.status(500).send("Storefront initializing...");
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
      console.log(`  Success Book Hub Unified Server is LIVE             `);
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
