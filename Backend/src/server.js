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
import authRouter from "./routes/auth.js";
import userAuthRouter from "./routes/userAuth.js";
import userAddressesRouter from "./routes/userAddresses.js";
import wishlistRouter from "./routes/wishlist.js";
import couponsRouter from "./routes/coupons.js";
import settingsRouter from "./routes/settings.js";
import contentRouter from "./routes/content.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env reliably from multiple candidate paths
const envCandidates = [
  path.resolve(__dirname, "../.env"),
  path.resolve(process.cwd(), "Backend/.env"),
  path.resolve(process.cwd(), ".env"),
  path.resolve(__dirname, "../../.env")
];
for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

const PORT = Number(process.env.PORT) || 5000;

const app = express();

// Security Headers (nosniff, frame protection, referrer policy)
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// Middleware
const allowedOrigins = [
  "https://successbookhub.com",
  "https://www.successbookhub.com",
  "http://localhost:5000",
  "http://localhost:8080",
  "http://127.0.0.1:5000",
  "http://127.0.0.1:8080"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".successbookhub.com")) {
      return callback(null, true);
    }
    // Also allow same-origin requests
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
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
app.use("/api/auth", authRouter);
app.use("/api/user/auth", userAuthRouter);
app.use("/api/user/addresses", userAddressesRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/coupons", couponsRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/content", contentRouter);


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

// Fallback HTML Generator with dynamic active bundle detection
function getFallbackHTML() {
  const assetCandidates = [
    path.resolve(__dirname, "../../Frontend/.output/public/assets"),
    path.resolve(process.cwd(), ".output/public/assets"),
    path.resolve(process.cwd(), "public/assets"),
    path.resolve(__dirname, "../public/assets")
  ];
  let mainJs = "/assets/index-Cbod-kzG.js";
  let mainCss = "/assets/styles-CNTOsDpc.css";

  for (const assetDir of assetCandidates) {
    if (fs.existsSync(assetDir)) {
      const files = fs.readdirSync(assetDir);
      const jsFiles = files
        .filter(f => f.startsWith("index-") && f.endsWith(".js"))
        .map(f => ({ name: f, time: fs.statSync(path.join(assetDir, f)).mtimeMs }))
        .sort((a, b) => b.time - a.time);
      const cssFiles = files
        .filter(f => f.startsWith("styles-") && f.endsWith(".css"))
        .map(f => ({ name: f, time: fs.statSync(path.join(assetDir, f)).mtimeMs }))
        .sort((a, b) => b.time - a.time);

      if (jsFiles.length > 0) mainJs = `/assets/${jsFiles[0].name}`;
      if (cssFiles.length > 0) mainCss = `/assets/${cssFiles[0].name}`;
      break;
    }
  }

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
  <link rel="stylesheet" href="${mainCss}" />
  <link rel="modulepreload" href="${mainJs}" />
</head>
<body class="bg-background text-foreground antialiased">
  <div id="root"></div>
  <script type="module" src="${mainJs}"></script>
</body>
</html>`;
}

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

  // Fallback to active HTML bundle
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
