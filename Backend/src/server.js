import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";
import http from "node:http";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
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
const FRONTEND_PORT = 3000;

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

// API Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Success Book Hub API",
    dbEngine: db.isMySQL ? "MySQL (phpMyAdmin)" : "SQLite (Local)",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/books", booksRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/contact", contactsRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/store", storeRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/subcategories", subcategoriesRouter);
app.use("/api/sub-categories", subcategoriesRouter);

// Forward all non-API requests to the Frontend Server (SSR / React Web App)
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      success: false,
      message: `API Route ${req.method} ${req.originalUrl} not found`
    });
  }

  // Proxy request to Frontend SSR engine running on port 3000
  const options = {
    hostname: "127.0.0.1",
    port: FRONTEND_PORT,
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

  proxyReq.on("error", () => {
    // If frontend is still booting up or unavailable, return temporary status
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Success Book Hub — Starting Up</title>
        <style>
          body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0f172a; color: #f8fafc; margin: 0; text-align: center; }
          .card { background: #1e293b; padding: 2.5rem; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.5); max-width: 480px; }
          h1 { color: #f59e0b; margin-bottom: 0.5rem; font-size: 1.5rem; }
          p { color: #94a3b8; font-size: 0.95rem; line-height: 1.5; }
          .spinner { width: 40px; height: 40px; border: 3px solid #334155; border-top-color: #f59e0b; border-radius: 50%; animation: spin 1s infinite linear; margin: 1.5rem auto; }
          @keyframes spin { to { transform: rotate(360deg); } }
        </style>
        <script>setTimeout(() => location.reload(), 3000);</script>
      </head>
      <body>
        <div class="card">
          <div class="spinner"></div>
          <h1>Success Book Hub</h1>
          <p>The bookstore storefront is initializing. Please wait a moment while the server starts up...</p>
        </div>
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

// Launch Frontend SSR server automatically
let frontendChild = null;
function startFrontendSSR() {
  const possiblePaths = [
    path.resolve(__dirname, "../../Frontend/.output/server/index.mjs"),
    path.resolve(__dirname, "../Frontend/.output/server/index.mjs"),
    path.resolve(process.cwd(), "Frontend/.output/server/index.mjs"),
    path.resolve(process.cwd(), ".output/server/index.mjs")
  ];

  const scriptPath = possiblePaths.find(p => fs.existsSync(p));
  if (scriptPath) {
    console.log(`[Frontend] Launching SSR server from: ${scriptPath} on port ${FRONTEND_PORT}...`);
    frontendChild = spawn(process.execPath, [scriptPath], {
      env: {
        ...process.env,
        PORT: String(FRONTEND_PORT),
        NITRO_PORT: String(FRONTEND_PORT),
        HOST: "127.0.0.1",
        NITRO_HOST: "127.0.0.1"
      },
      stdio: "inherit"
    });

    frontendChild.on("error", (err) => {
      console.error("[Frontend] Process failed to spawn:", err.message);
    });

    frontendChild.on("exit", (code) => {
      console.warn(`[Frontend] Process exited with code ${code}`);
    });
  } else {
    console.warn("[Frontend] No pre-built .output/server/index.mjs found. Run 'npm run build' inside Frontend/ to build.");
  }
}

// Cleanup child process on shutdown
process.on("SIGINT", () => {
  if (frontendChild) frontendChild.kill();
  process.exit(0);
});
process.on("SIGTERM", () => {
  if (frontendChild) frontendChild.kill();
  process.exit(0);
});

// Async server bootstrapper
async function startServer() {
  try {
    await initDatabase();
    startFrontendSSR();

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
