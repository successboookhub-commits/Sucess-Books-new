import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";
import http from "node:http";
import { fileURLToPath, pathToFileURL } from "node:url";
import { initDatabase, db } from "./db/database.js";
import booksRouter from "./routes/books.js";
import ordersRouter from "./routes/orders.js";
import contactsRouter from "./routes/contacts.js";
import newsletterRouter from "./routes/newsletter.js";
import storeRouter from "./routes/store.js";
import categoriesRouter from "./routes/categories.js";
import subcategoriesRouter from "./routes/subcategories.js";

import net from "node:net";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOSTINGER_PORT = Number(process.env.PORT) || 5000;
let ssrInternalPort = 3000;

// Dynamic port finder for Nitro SSR to avoid any EADDRINUSE conflict on shared hosting
async function findFreePort(preferred = 3000) {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.listen(preferred, "127.0.0.1", () => {
      const p = srv.address().port;
      srv.close(() => resolve(p));
    });
    srv.on("error", () => {
      const fallback = net.createServer();
      fallback.listen(0, "127.0.0.1", () => {
        const p = fallback.address().port;
        fallback.close(() => resolve(p));
      });
    });
  });
}

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

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Success Book Hub API",
    dbEngine: db.isMySQL ? "MySQL (phpMyAdmin)" : "SQLite (Local)",
    timestamp: new Date().toISOString()
  });
});

// 2. API Routes
app.use("/api/books", booksRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/contact", contactsRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/store", storeRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/subcategories", subcategoriesRouter);
app.use("/api/sub-categories", subcategoriesRouter);

// 3. Static Asset Serving (High performance direct disk serving with strict MIME types)
const staticOptions = {
  maxAge: "1d",
  index: false,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".js") || filePath.endsWith(".mjs")) {
      res.setHeader("Content-Type", "text/javascript; charset=utf-8");
    } else if (filePath.endsWith(".css")) {
      res.setHeader("Content-Type", "text/css; charset=utf-8");
    }
  }
};

const candidateStaticDirs = [
  path.resolve(__dirname, "../../Frontend/.output/public"),
  path.resolve(__dirname, "../Frontend/.output/public"),
  path.resolve(process.cwd(), "Frontend/.output/public"),
  path.resolve(process.cwd(), ".output/public"),
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

// Strict 404 handler for missing static assets (guarantees HTML is NEVER sent for .js/.css)
app.use((req, res, next) => {
  if (req.path.startsWith("/assets/") || /\.(js|mjs|css|png|jpg|jpeg|svg|ico|json|woff2?|ttf|map)$/i.test(req.path)) {
    return res.status(404).type("text/plain").send(`Asset ${req.path} not found`);
  }
  next();
});

// 4. Web Page Forwarder to Internal In-Process SSR Engine
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      success: false,
      message: `API Route ${req.method} ${req.originalUrl} not found`
    });
  }

  const options = {
    hostname: "127.0.0.1",
    port: ssrInternalPort,
    path: req.originalUrl,
    method: req.method,
    headers: {
      ...req.headers,
      host: req.headers.host || "successbookhub.com",
      "x-forwarded-for": req.ip
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on("error", (err) => {
    console.error("[SSR Forwarder Error]:", err.message);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head><title>Success Book Hub</title></head>
      <body style="font-family:system-ui;padding:3rem;text-align:center;background:#0f172a;color:#f8fafc">
        <h2>Success Book Hub Storefront Initializing</h2>
        <p>Please refresh in a few seconds.</p>
        <script>setTimeout(() => location.reload(), 2500);</script>
      </body>
      </html>
    `);
  });

  if (["POST", "PUT", "PATCH"].includes(req.method) && req.body) {
    proxyReq.write(typeof req.body === "string" ? req.body : JSON.stringify(req.body));
  }

  proxyReq.end();
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({
    success: false,
    error: err.message || "Internal server error"
  });
});

// Boot Frontend SSR engine in-process
async function bootFrontendSSR() {
  const possiblePaths = [
    path.resolve(__dirname, "../../Frontend/.output/server/index.mjs"),
    path.resolve(__dirname, "../Frontend/.output/server/index.mjs"),
    path.resolve(process.cwd(), "Frontend/.output/server/index.mjs"),
    path.resolve(process.cwd(), ".output/server/index.mjs")
  ];
  const ssrPath = possiblePaths.find(p => fs.existsSync(p));
  if (ssrPath) {
    ssrInternalPort = await findFreePort(3000);
    process.env.NITRO_PORT = String(ssrInternalPort);
    process.env.PORT = String(ssrInternalPort);
    process.env.HOST = "127.0.0.1";
    process.env.NITRO_HOST = "127.0.0.1";

    console.log(`[Frontend] Booting in-process Nitro SSR server on port ${ssrInternalPort} from: ${ssrPath}`);
    try {
      await import(pathToFileURL(ssrPath).href);
      console.log(`[Frontend] Nitro SSR server is active on internal port ${ssrInternalPort}.`);
    } catch (err) {
      console.error("[Frontend] Error importing Nitro SSR server:", err.message);
    }
  } else {
    console.warn("[Frontend] Warning: No Nitro SSR server build found at expected paths.");
  }
}

// Async server bootstrapper
async function startServer() {
  try {
    await initDatabase();
    await bootFrontendSSR();

    // Give Nitro a brief tick to listen
    await new Promise(r => setTimeout(r, 600));

    app.listen(HOSTINGER_PORT, () => {
      console.log(`=======================================================`);
      console.log(`  Success Book Hub Unified Server is LIVE             `);
      console.log(`  Website URL: http://localhost:${HOSTINGER_PORT}     `);
      console.log(`  Database Engine: ${db.isMySQL ? "MySQL" : "SQLite"} `);
      console.log(`  Health Check: http://localhost:${HOSTINGER_PORT}/api/health`);
      console.log(`=======================================================`);
    });
  } catch (err) {
    console.error("Fatal: Failed to bootstrap server:", err);
    process.exit(1);
  }
}

startServer();

export default app;
