import { Router } from "express";
import { db } from "../db/database.js";
import { sendAdminOtpEmail } from "../services/mailService.js";
import { generateAdminToken, requireAdminAuth } from "../middleware/auth.js";

const router = Router();

const DEFAULT_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "successboookhub@gmail.com").trim().toLowerCase();

/**
 * 1. POST /api/auth/send-otp
 * Generates and sends a real 6-digit OTP to the registered admin email via Gmail SMTP
 */
router.post("/send-otp", async (req, res) => {
  try {
    const rawEmail = req.body.email ? String(req.body.email).trim().toLowerCase() : "";

    if (!rawEmail) {
      return res.status(400).json({
        success: false,
        message: "Email address is required."
      });
    }

    // Security check: Only configured admin email is allowed to receive admin login OTPs
    if (rawEmail !== DEFAULT_ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: `Unauthorized email address. Only ${DEFAULT_ADMIN_EMAIL} is authorized for Admin access.`
      });
    }

    // Generate random 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Expiry time: 10 minutes from now in ISO UTC string
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Store OTP in database
    await db.run(
      "INSERT INTO admin_otps (email, otp, expires_at, used) VALUES (?, ?, ?, 0)",
      [rawEmail, otp, expiresAt]
    );

    // Send the real email
    console.log(`[Auth] Sending Admin Login OTP to ${rawEmail}...`);
    await sendAdminOtpEmail(rawEmail, otp);
    console.log(`[Auth] OTP sent successfully to ${rawEmail}!`);

    return res.json({
      success: true,
      message: `A 6-digit verification code has been sent to ${rawEmail}. Please check your inbox.`,
      email: rawEmail
    });
  } catch (err) {
    console.error("[Auth Error] Failed to send OTP:", err);
    return res.status(500).json({
      success: false,
      message: `Failed to send OTP email: ${err.message || "Email server error"}`
    });
  }
});

/**
 * 2. POST /api/auth/verify-otp
 * Verifies the 6-digit OTP and issues a JWT token
 */
router.post("/verify-otp", async (req, res) => {
  try {
    const rawEmail = req.body.email ? String(req.body.email).trim().toLowerCase() : "";
    const otp = req.body.otp ? String(req.body.otp).trim() : "";

    if (!rawEmail || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP code are required."
      });
    }

    if (rawEmail !== DEFAULT_ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized admin email address."
      });
    }

    // Find the latest valid unused OTP for this email
    const record = await db.get(
      `SELECT * FROM admin_otps 
       WHERE email = ? AND otp = ? AND used = 0 
       ORDER BY id DESC LIMIT 1`,
      [rawEmail, otp]
    );

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP or code already used. Please request a new code."
      });
    }

    // Check expiry using timestamp epoch
    const nowMs = Date.now();
    const expiryMs = new Date(record.expires_at).getTime();
    if (isNaN(expiryMs) || nowMs > expiryMs) {
      return res.status(400).json({
        success: false,
        message: "This OTP code has expired. Please request a new code."
      });
    }

    // Mark as used
    await db.run("UPDATE admin_otps SET used = 1 WHERE id = ?", [record.id]);

    // Generate JWT token (valid for 7 days)
    const token = generateAdminToken({
      email: rawEmail,
      role: "admin",
      name: "Success Book Hub Administrator"
    });

    return res.json({
      success: true,
      message: "Admin authentication successful!",
      token,
      user: {
        email: rawEmail,
        role: "admin",
        name: "Success Book Hub Administrator"
      }
    });
  } catch (err) {
    console.error("[Auth Error] Verification failed:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to verify OTP."
    });
  }
});

/**
 * 3. GET /api/auth/me
 * Returns current authenticated admin user status
 */
router.get("/me", requireAdminAuth, (req, res) => {
  return res.json({
    success: true,
    user: req.adminUser
  });
});

/**
 * 4. GET /api/auth/all-customers
 * Returns all registered customer accounts with order and address counts
 */
router.get("/all-customers", async (req, res) => {
  try {
    const users = await db.all(`
      SELECT u.id, u.name, u.email, u.phone, u.role, u.status, u.created_at,
             (SELECT COUNT(*) FROM orders o WHERE o.customer_email = u.email OR o.user_id = u.id) as total_orders,
             (SELECT COALESCE(SUM(o.total), 0) FROM orders o WHERE (o.customer_email = u.email OR o.user_id = u.id) AND o.status != 'cancelled') as total_spent,
             (SELECT COUNT(*) FROM user_addresses a WHERE a.user_email = u.email OR a.user_id = u.id) as total_addresses
      FROM users u
      ORDER BY u.id DESC
    `);

    return res.json({
      success: true,
      count: users.length,
      data: users.map(u => ({
        id: u.id,
        name: u.name || "Book Reader",
        email: u.email,
        phone: u.phone || "—",
        role: u.role || "customer",
        status: u.status || "active",
        totalOrders: Number(u.total_orders) || 0,
        totalSpent: Number(u.total_spent) || 0,
        totalAddresses: Number(u.total_addresses) || 0,
        createdAt: u.created_at
      }))
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 4b. PATCH /api/auth/customers/:id/status
 * Update customer status (active, blocked)
 */
router.patch("/customers/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["active", "blocked", "inactive"].includes(status)) {
      return res.status(400).json({ success: false, message: "Valid status ('active', 'blocked') required." });
    }

    const existing = await db.get("SELECT id, name, email FROM users WHERE id = ?", [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Customer not found." });
    }

    await db.run("UPDATE users SET status = ? WHERE id = ?", [status, id]);

    return res.json({
      success: true,
      message: `Customer ${existing.name || existing.email} status updated to ${status}.`,
      status
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 5. GET /api/auth/all-addresses
 * Returns all saved customer addresses across the bookstore
 */
router.get("/all-addresses", async (req, res) => {
  try {
    const addresses = await db.all(`
      SELECT a.*, u.name as user_name
      FROM user_addresses a
      LEFT JOIN users u ON a.user_email = u.email OR a.user_id = u.id
      ORDER BY a.created_at DESC
    `);

    return res.json({
      success: true,
      count: addresses.length,
      data: addresses.map(a => ({
        id: a.id,
        userEmail: a.user_email,
        userName: a.user_name || a.full_name,
        fullName: a.full_name,
        phone: a.phone,
        alternatePhone: a.alternate_phone || "",
        pincode: a.pincode,
        flatHouse: a.flat_house,
        areaStreet: a.area_street,
        landmark: a.landmark || "",
        city: a.city,
        state: a.state || "Telangana",
        addressType: a.address_type || "Home",
        isDefault: Boolean(a.is_default),
        formattedAddress: `${a.flat_house}, ${a.area_street}${a.landmark ? `, Near ${a.landmark}` : ""}, ${a.city}, ${a.state} - ${a.pincode}`,
        createdAt: a.created_at
      }))
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 6. GET /api/auth/all-reviews
 * Returns all reader reviews across all books
 */
router.get("/all-reviews", async (req, res) => {
  try {
    const reviews = await db.all(`
      SELECT r.id, r.book_id, r.user_name, r.rating, r.comment, r.created_at,
             b.title as book_title, b.author as book_author, b.cover as book_cover
      FROM reviews r
      LEFT JOIN books b ON r.book_id = b.id
      ORDER BY r.created_at DESC
    `);

    return res.json({
      success: true,
      count: reviews.length,
      data: reviews.map(r => ({
        id: r.id,
        bookId: r.book_id,
        bookTitle: r.book_title || "Unknown Book",
        bookAuthor: r.book_author || "",
        bookCover: r.book_cover || "",
        userName: r.user_name,
        rating: Number(r.rating) || 5,
        comment: r.comment,
        createdAt: r.created_at
      }))
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 7. DELETE /api/auth/reviews/:id
 */
router.delete("/reviews/:id", async (req, res) => {
  try {
    const review = await db.get("SELECT * FROM reviews WHERE id = ?", [req.params.id]);
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    await db.run("DELETE FROM reviews WHERE id = ?", [req.params.id]);

    // Recalculate book rating
    const stats = await db.get(`
      SELECT AVG(rating) as avg_rating, COUNT(*) as count 
      FROM reviews 
      WHERE book_id = ?
    `, [review.book_id]);

    const newRating = stats.count > 0 ? Math.round((Number(stats.avg_rating) || 5) * 10) / 10 : 4.5;
    await db.run("UPDATE books SET rating = ?, reviews_count = ? WHERE id = ?", [newRating, stats.count, review.book_id]);

    return res.json({ success: true, message: "Review deleted successfully." });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 8. GET /api/auth/dashboard-stats
 */
router.get("/dashboard-stats", async (req, res) => {
  try {
    // Only count non-cancelled orders towards gross revenue
    const revenueRow = await db.get("SELECT COALESCE(SUM(total), 0) as total_revenue, COUNT(*) as total_orders FROM orders WHERE status != 'cancelled'");
    const totalOrdersRow = await db.get("SELECT COUNT(*) as all_orders FROM orders");
    const pendingOrdersRow = await db.get("SELECT COUNT(*) as pending_count FROM orders WHERE status = 'pending'");
    const dispatchedOrdersRow = await db.get("SELECT COUNT(*) as dispatched_count FROM orders WHERE status = 'dispatched'");
    const deliveredOrdersRow = await db.get("SELECT COUNT(*) as delivered_count FROM orders WHERE status = 'delivered'");
    const booksCountRow = await db.get("SELECT COUNT(*) as total_books, COALESCE(SUM(stock), 0) as total_stock, COALESCE(SUM(price * stock), 0) as inventory_value FROM books");
    const lowStockRow = await db.get("SELECT COUNT(*) as low_stock_count FROM books WHERE stock < 20");
    const usersCountRow = await db.get("SELECT COUNT(*) as total_users FROM users");
    const reviewsCountRow = await db.get("SELECT COUNT(*) as total_reviews FROM reviews");
    const categoriesCountRow = await db.get("SELECT COUNT(*) as total_categories FROM categories");
    const subCategoriesCountRow = await db.get("SELECT COUNT(*) as total_subcategories FROM sub_categories");

    const totalOrders = Number(totalOrdersRow?.all_orders) || 0;
    const totalRevenue = Number(revenueRow?.total_revenue) || 0;
    const validOrdersCount = Number(revenueRow?.total_orders) || 0;
    const avgOrderValue = validOrdersCount > 0 ? Math.round(totalRevenue / validOrdersCount) : 0;

    return res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        pendingOrders: Number(pendingOrdersRow?.pending_count) || 0,
        dispatchedOrders: Number(dispatchedOrdersRow?.dispatched_count) || 0,
        deliveredOrders: Number(deliveredOrdersRow?.delivered_count) || 0,
        avgOrderValue,
        totalBooks: Number(booksCountRow?.total_books) || 0,
        totalStock: Number(booksCountRow?.total_stock) || 0,
        inventoryValue: Number(booksCountRow?.inventory_value) || 0,
        lowStockCount: Number(lowStockRow?.low_stock_count) || 0,
        totalUsers: Number(usersCountRow?.total_users) || 0,
        totalReviews: Number(reviewsCountRow?.total_reviews) || 0,
        totalCategories: Number(categoriesCountRow?.total_categories) || 0,
        totalSubCategories: Number(subCategoriesCountRow?.total_subcategories) || 0
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 9. POST /api/auth/logout
 */
router.post("/logout", (req, res) => {
  return res.json({
    success: true,
    message: "Logged out successfully."
  });
});

export default router;
