import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { initDatabase, db } from "./db/database.js";
import booksRouter from "./routes/books.js";
import ordersRouter from "./routes/orders.js";
import contactsRouter from "./routes/contacts.js";
import newsletterRouter from "./routes/newsletter.js";
import storeRouter from "./routes/store.js";
import categoriesRouter from "./routes/categories.js";
import subcategoriesRouter from "./routes/subcategories.js";

dotenv.config();

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

// Root Welcome & API Index
app.get(["/", "/api"], (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Success Book Hub Backend API",
    service: "Success Book Hub REST API",
    status: "online",
    dbEngine: db.isMySQL ? "MySQL (phpMyAdmin)" : "SQLite (Local)",
    endpoints: {
      health: "/api/health",
      books: "/api/books",
      categories: "/api/categories",
      subcategories: "/api/subcategories",
      orders: "/api/orders",
      contact: "/api/contact",
      newsletter: "/api/newsletter",
      storeInfo: "/api/store/info"
    },
    timestamp: new Date().toISOString()
  });
});

// Health check
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.method} ${req.originalUrl} not found`,
    availableEndpoints: [
      "/api/health",
      "/api/books",
      "/api/categories",
      "/api/subcategories",
      "/api/orders",
      "/api/contact",
      "/api/newsletter",
      "/api/store/info"
    ]
  });
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
    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`  Success Book Hub Backend API is Running             `);
      console.log(`  URL: http://localhost:${PORT}                       `);
      console.log(`  Database Engine: ${db.isMySQL ? "MySQL" : "SQLite"} `);
      console.log(`  Health: http://localhost:${PORT}/api/health         `);
      console.log(`=======================================================`);
    });
  } catch (err) {
    console.error("Fatal: Failed to bootstrap server:", err);
    process.exit(1);
  }
}

startServer();

export default app;
