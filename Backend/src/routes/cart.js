import { Router } from "express";
import { db } from "../db/database.js";
import { requireUserAuth } from "../middleware/auth.js";

const router = Router();

// Helper to calculate cart totals from real database books
function calculateCartTotals(items) {
  const subtotal = items.reduce((sum, it) => sum + (it.price * it.quantity), 0);
  const mrpTotal = items.reduce((sum, it) => {
    const mrp = it.mrp || it.old_price || it.oldPrice || it.price;
    return sum + (mrp * it.quantity);
  }, 0);
  const savingsTotal = Math.max(0, mrpTotal - subtotal);
  const savingsPercent = mrpTotal > 0 && savingsTotal > 0 ? Math.round((savingsTotal / mrpTotal) * 100) : 0;
  const freeDeliveryThreshold = 499;
  const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 49;
  const total = subtotal + deliveryFee;

  return {
    subtotal,
    mrpTotal,
    savingsTotal,
    savingsPercent,
    deliveryFee,
    freeDeliveryThreshold,
    awayFromFreeDelivery: Math.max(0, freeDeliveryThreshold - subtotal),
    total
  };
}

/**
 * 1. GET /api/cart
 * Get all cart items for authenticated customer with live book details and recalculated totals
 */
router.get("/", requireUserAuth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userId = req.user.id || null;

    const rows = await db.all(
      `SELECT c.id as cart_item_id, c.book_id, c.quantity, 
              b.title, b.author, b.category, b.sub_category, 
              b.price, b.old_price, b.cover, b.image_2, 
              b.rating, b.stock, b.label, b.publisher
       FROM cart_items c
       JOIN books b ON c.book_id = b.id
       WHERE c.user_email = ? OR (c.user_id = ? AND c.user_id IS NOT NULL)
       ORDER BY c.updated_at DESC, c.created_at DESC`,
      [userEmail, userId]
    );

    const items = rows.map(r => ({
      cartItemId: r.cart_item_id,
      id: r.book_id,
      title: r.title,
      author: r.author,
      category: r.category,
      subCategory: r.sub_category || "",
      price: Number(r.price),
      oldPrice: r.old_price ? Number(r.old_price) : null,
      mrp: r.old_price ? Number(r.old_price) : Number(r.price),
      cover: r.cover,
      image2: r.image_2 || "",
      rating: Number(r.rating || 4.5),
      stock: Number(r.stock ?? 50),
      label: r.label || "",
      publisher: r.publisher || "",
      quantity: Number(r.quantity)
    }));

    const totals = calculateCartTotals(items);

    return res.json({
      success: true,
      items,
      count: items.reduce((sum, it) => sum + it.quantity, 0),
      ...totals
    });
  } catch (err) {
    console.error("[Cart GET Error]:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 2. POST /api/cart
 * Add an item or increment quantity in customer's cart
 */
router.post("/", requireUserAuth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userId = req.user.id || null;
    const bookId = parseInt(req.body.bookId || req.body.id);
    const quantity = Math.max(1, parseInt(req.body.quantity) || 1);

    if (!bookId || isNaN(bookId)) {
      return res.status(400).json({ success: false, message: "Valid bookId is required." });
    }

    // Verify book exists in database
    const book = await db.get("SELECT id, title, price, stock FROM books WHERE id = ?", [bookId]);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found." });
    }

    const existing = await db.get(
      "SELECT id, quantity FROM cart_items WHERE user_email = ? AND book_id = ?",
      [userEmail, bookId]
    );

    if (existing) {
      const newQty = existing.quantity + quantity;
      await db.run(
        "UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [newQty, existing.id]
      );
    } else {
      await db.run(
        "INSERT INTO cart_items (user_id, user_email, book_id, quantity) VALUES (?, ?, ?, ?)",
        [userId, userEmail, bookId, quantity]
      );
    }

    return res.json({
      success: true,
      message: `"${book.title}" added to your cart!`
    });
  } catch (err) {
    console.error("[Cart POST Error]:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 3. PUT /api/cart/:bookId
 * Update item quantity in customer's cart
 */
router.put("/:bookId", requireUserAuth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const bookId = parseInt(req.params.bookId);
    const quantity = parseInt(req.body.quantity);

    if (!bookId || isNaN(bookId)) {
      return res.status(400).json({ success: false, message: "Valid bookId is required." });
    }

    if (isNaN(quantity) || quantity <= 0) {
      await db.run("DELETE FROM cart_items WHERE user_email = ? AND book_id = ?", [userEmail, bookId]);
      return res.json({ success: true, message: "Item removed from cart." });
    }

    await db.run(
      "UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE user_email = ? AND book_id = ?",
      [quantity, userEmail, bookId]
    );

    return res.json({ success: true, message: "Cart updated." });
  } catch (err) {
    console.error("[Cart PUT Error]:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 4. DELETE /api/cart/:bookId
 * Remove specific item from cart
 */
router.delete("/:bookId", requireUserAuth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const bookId = parseInt(req.params.bookId);

    await db.run("DELETE FROM cart_items WHERE user_email = ? AND book_id = ?", [userEmail, bookId]);
    return res.json({ success: true, message: "Item removed from cart." });
  } catch (err) {
    console.error("[Cart DELETE item Error]:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 5. DELETE /api/cart
 * Clear all items from customer's cart
 */
router.delete("/", requireUserAuth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    await db.run("DELETE FROM cart_items WHERE user_email = ?", [userEmail]);
    return res.json({ success: true, message: "Cart cleared." });
  } catch (err) {
    console.error("[Cart DELETE all Error]:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 6. POST /api/cart/merge
 * Merge guest cart items from localStorage into customer's database-backed cart upon login
 */
router.post("/merge", requireUserAuth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userId = req.user.id || null;
    const guestItems = Array.isArray(req.body.items) ? req.body.items : [];

    for (const item of guestItems) {
      const bookId = parseInt(item.id || item.bookId);
      const qty = Math.max(1, parseInt(item.quantity) || 1);
      if (!bookId) continue;

      const existing = await db.get(
        "SELECT id, quantity FROM cart_items WHERE user_email = ? AND book_id = ?",
        [userEmail, bookId]
      );

      if (existing) {
        // Keep higher or sum quantity
        const newQty = Math.max(existing.quantity, qty);
        await db.run(
          "UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
          [newQty, existing.id]
        );
      } else {
        await db.run(
          "INSERT INTO cart_items (user_id, user_email, book_id, quantity) VALUES (?, ?, ?, ?)",
          [userId, userEmail, bookId, qty]
        );
      }
    }

    return res.json({ success: true, message: "Guest cart merged successfully." });
  } catch (err) {
    console.error("[Cart Merge Error]:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
