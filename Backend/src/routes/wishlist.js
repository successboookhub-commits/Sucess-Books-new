import { Router } from "express";
import { db } from "../db/database.js";
import { requireUserAuth, optionalUserAuth } from "../middleware/auth.js";

const router = Router();

/**
 * 1. GET /api/wishlist
 * Returns list of wishlisted book IDs and book objects
 */
router.get("/", requireUserAuth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const items = await db.all(
      `SELECT w.id as wishlist_id, w.book_id, w.created_at as wishlisted_at,
              b.id, b.title, b.author, b.category, b.sub_category, b.price, 
              b.old_price, b.discount_percent, b.cover, b.image_2, b.stock, b.rating
       FROM wishlists w
       JOIN books b ON w.book_id = b.id
       WHERE w.user_email = ?
       ORDER BY w.created_at DESC`,
      [userEmail]
    );

    const formatted = items.map(b => {
      const price = Number(b.price) || 0;
      const oldPrice = b.old_price !== null ? Number(b.old_price) : null;
      let discountPercent = Number(b.discount_percent) || 0;
      if (oldPrice && oldPrice > price) {
        discountPercent = Math.round(((oldPrice - price) / oldPrice) * 100);
      }

      return {
        wishlistId: b.wishlist_id,
        id: b.id,
        title: b.title,
        author: b.author,
        category: b.category,
        subCategory: b.sub_category || "",
        price,
        cost: price,
        oldPrice,
        old_price: oldPrice,
        mrp: oldPrice,
        discountPercent,
        discount_percent: discountPercent,
        cover: b.cover,
        image: b.cover,
        image2: b.image_2 || "",
        stock: Number(b.stock) || 50,
        rating: Number(b.rating) || 4.5,
        wishlistedAt: b.wishlisted_at
      };
    });

    const ids = formatted.map(b => b.id);

    return res.json({
      success: true,
      data: formatted,
      bookIds: ids,
      count: formatted.length
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 2. POST /api/wishlist/toggle
 * Toggles book in wishlist (adds if not present, deletes if present)
 */
router.post("/toggle", requireUserAuth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userId = req.user.id || null;
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({ success: false, message: "bookId is required." });
    }

    const existing = await db.get(
      "SELECT * FROM wishlists WHERE user_email = ? AND book_id = ?",
      [userEmail, bookId]
    );

    if (existing) {
      await db.run("DELETE FROM wishlists WHERE id = ?", [existing.id]);
      return res.json({
        success: true,
        isWishlisted: false,
        message: "Removed from your Wishlist"
      });
    } else {
      await db.run(
        "INSERT INTO wishlists (user_id, user_email, book_id) VALUES (?, ?, ?)",
        [userId, userEmail, bookId]
      );
      return res.json({
        success: true,
        isWishlisted: true,
        message: "Added to your Wishlist!"
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 3. DELETE /api/wishlist/:bookId
 */
router.delete("/:bookId", requireUserAuth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const bookId = req.params.bookId;

    await db.run(
      "DELETE FROM wishlists WHERE user_email = ? AND book_id = ?",
      [userEmail, bookId]
    );

    return res.json({
      success: true,
      message: "Removed from your Wishlist"
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
