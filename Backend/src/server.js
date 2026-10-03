import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { initDatabase } from "./db/database.js";
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

// Initialize Database & Seed data
initDatabase();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Success Book Hub API",
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
    message: `API Route ${req.method} ${req.originalUrl} not found`
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

app.listen(PORT, () => {
  console.log(`===========================================`);
  console.log(`  Success Book Hub Backend API is Running  `);
  console.log(`  URL: http://localhost:${PORT}            `);
  console.log(`  Health: http://localhost:${PORT}/api/health`);
  console.log(`===========================================`);
});

export default app;
