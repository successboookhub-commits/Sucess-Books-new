import { Router } from "express";
import { db } from "../db/database.js";

const router = Router();

// GET all categories with book counts
router.get("/categories", (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT category, COUNT(*) as count 
      FROM books 
      GROUP BY category 
      ORDER BY count DESC
    `).all();

    const totalCount = db.prepare("SELECT COUNT(*) as count FROM books").get().count;

    res.json({
      success: true,
      categories: [
        { name: "All", count: totalCount },
        ...rows.map(r => ({ name: r.category, count: r.count }))
      ]
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all books with search, category, and sort filters
router.get("/", (req, res) => {
  try {
    const { category, search, sort, featured } = req.query;

    let query = "SELECT * FROM books WHERE 1=1";
    const params = [];

    if (category && category !== "All") {
      query += " AND category = ?";
      params.push(category);
    }

    if (search && search.trim()) {
      query += " AND (title LIKE ? OR author LIKE ? OR category LIKE ?)";
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    if (featured === "true" || featured === "1") {
      query += " AND featured = 1";
    }

    if (sort === "low") {
      query += " ORDER BY price ASC";
    } else if (sort === "high") {
      query += " ORDER BY price DESC";
    } else if (sort === "rating") {
      query += " ORDER BY rating DESC";
    } else {
      // default: featured first, then id
      query += " ORDER BY featured DESC, id ASC";
    }

    const books = db.prepare(query).all(...params);

    // Format fields for frontend compatibility
    const formattedBooks = books.map(b => ({
      id: b.id,
      title: b.title,
      author: b.author,
      category: b.category,
      price: b.price,
      oldPrice: b.old_price,
      rating: b.rating,
      reviewsCount: b.reviews_count,
      cover: b.cover,
      label: b.label,
      description: b.description,
      stock: b.stock,
      featured: Boolean(b.featured)
    }));

    res.json({ success: true, count: formattedBooks.length, data: formattedBooks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single book by ID with reviews
router.get("/:id", (req, res) => {
  try {
    const book = db.prepare("SELECT * FROM books WHERE id = ?").get(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    const reviews = db.prepare(`
      SELECT id, user_name, rating, comment, created_at 
      FROM reviews 
      WHERE book_id = ? 
      ORDER BY created_at DESC
    `).all(req.params.id);

    res.json({
      success: true,
      data: {
        id: book.id,
        title: book.title,
        author: book.author,
        category: book.category,
        price: book.price,
        oldPrice: book.old_price,
        rating: book.rating,
        reviewsCount: book.reviews_count,
        cover: book.cover,
        label: book.label,
        description: book.description,
        stock: book.stock,
        featured: Boolean(book.featured),
        reviews
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create book (for store manager / admin)
router.post("/", (req, res) => {
  try {
    const {
      title,
      author,
      category,
      price,
      oldPrice,
      cover = "bg-primary",
      label,
      description,
      stock = 25,
      featured = 0
    } = req.body;

    if (!title || !author || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Title, author, category and price are required."
      });
    }

    const stmt = db.prepare(`
      INSERT INTO books (title, author, category, price, old_price, rating, reviews_count, cover, label, description, stock, featured)
      VALUES (?, ?, ?, ?, ?, 5.0, 0, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      title,
      author,
      category,
      parseFloat(price),
      oldPrice ? parseFloat(oldPrice) : null,
      cover,
      label || null,
      description || "",
      parseInt(stock) || 25,
      featured ? 1 : 0
    );

    const newBook = db.prepare("SELECT * FROM books WHERE id = ?").get(result.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: {
        id: newBook.id,
        title: newBook.title,
        author: newBook.author,
        category: newBook.category,
        price: newBook.price,
        oldPrice: newBook.old_price,
        rating: newBook.rating,
        reviewsCount: newBook.reviews_count,
        cover: newBook.cover,
        label: newBook.label,
        description: newBook.description,
        stock: newBook.stock,
        featured: Boolean(newBook.featured)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update book
router.put("/:id", (req, res) => {
  try {
    const existing = db.prepare("SELECT * FROM books WHERE id = ?").get(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    const {
      title = existing.title,
      author = existing.author,
      category = existing.category,
      price = existing.price,
      oldPrice = existing.old_price,
      cover = existing.cover,
      label = existing.label,
      description = existing.description,
      stock = existing.stock,
      featured = existing.featured
    } = req.body;

    db.prepare(`
      UPDATE books 
      SET title = ?, author = ?, category = ?, price = ?, old_price = ?, cover = ?, label = ?, description = ?, stock = ?, featured = ?
      WHERE id = ?
    `).run(
      title,
      author,
      category,
      parseFloat(price),
      oldPrice ? parseFloat(oldPrice) : null,
      cover,
      label,
      description,
      parseInt(stock),
      featured ? 1 : 0,
      req.params.id
    );

    const updated = db.prepare("SELECT * FROM books WHERE id = ?").get(req.params.id);
    res.json({ success: true, message: "Book updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE book
router.delete("/:id", (req, res) => {
  try {
    const result = db.prepare("DELETE FROM books WHERE id = ?").run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.json({ success: true, message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST review for a book
router.post("/:id/reviews", (req, res) => {
  try {
    const bookId = req.params.id;
    const { userName, rating, comment } = req.body;

    if (!userName || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Name, rating (1-5), and review comment are required."
      });
    }

    const book = db.prepare("SELECT id FROM books WHERE id = ?").get(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    db.prepare(`
      INSERT INTO reviews (book_id, user_name, rating, comment)
      VALUES (?, ?, ?, ?)
    `).run(bookId, userName.trim(), Math.min(5, Math.max(1, parseInt(rating))), comment.trim());

    // Update book aggregate rating and count
    const stats = db.prepare(`
      SELECT AVG(rating) as avg_rating, COUNT(*) as count 
      FROM reviews 
      WHERE book_id = ?
    `).get(bookId);

    const newRating = Math.round((stats.avg_rating || 5) * 10) / 10;
    db.prepare(`
      UPDATE books 
      SET rating = ?, reviews_count = ? 
      WHERE id = ?
    `).run(newRating, stats.count, bookId);

    const allReviews = db.prepare(`
      SELECT id, user_name, rating, comment, created_at 
      FROM reviews 
      WHERE book_id = ? 
      ORDER BY created_at DESC
    `).all(bookId);

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: {
        newRating,
        reviewsCount: stats.count,
        reviews: allReviews
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
