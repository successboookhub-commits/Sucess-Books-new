import { Router } from "express";
import { db } from "../db/database.js";

const router = Router();

// GET all categories with book counts
router.get("/categories", async (req, res) => {
  try {
    const rows = await db.all(`
      SELECT category, COUNT(*) as count 
      FROM books 
      GROUP BY category 
      ORDER BY count DESC
    `);

    const countRow = await db.get("SELECT COUNT(*) as count FROM books");
    const totalCount = countRow ? countRow.count : 0;

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

// GET all books with search, category, subcategory, and sort filters
router.get("/", async (req, res) => {
  try {
    const { category, subCategory, sub_category, search, sort, featured } = req.query;

    let query = "SELECT * FROM books WHERE 1=1";
    const params = [];

    const selectedCategory = category;
    const selectedSubCategory = subCategory || sub_category;

    if (selectedCategory && selectedCategory !== "All") {
      query += " AND category = ?";
      params.push(selectedCategory);
    }

    if (selectedSubCategory && selectedSubCategory !== "All") {
      query += " AND sub_category = ?";
      params.push(selectedSubCategory);
    }

    if (search && search.trim()) {
      query += " AND (title LIKE ? OR author LIKE ? OR category LIKE ? OR sub_category LIKE ?)";
      const term = `%${search.trim()}%`;
      params.push(term, term, term, term);
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
      // default: featured first, then id desc
      query += " ORDER BY featured DESC, id DESC";
    }

    const books = await db.all(query, params);

    // Helper to format book output uniformly
    const formatBook = (b) => {
      const price = Number(b.price) || 0;
      const oldPrice = b.old_price !== null && b.old_price !== undefined ? Number(b.old_price) : null;
      let discountPercent = Number(b.discount_percent) || 0;
      if (oldPrice && oldPrice > price) {
        discountPercent = Math.round(((oldPrice - price) / oldPrice) * 100);
      }

      return {
        id: b.id,
        title: b.title,
        author: b.author,
        category: b.category,
        subCategory: b.sub_category || "",
        sub_category: b.sub_category || "",
        price: price,
        cost: price,
        oldPrice: oldPrice,
        old_price: oldPrice,
        mrp: oldPrice,
        originalPrice: oldPrice,
        discountPercent: discountPercent,
        discount_percent: discountPercent,
        rating: Number(b.rating) || 4.5,
        reviewsCount: Number(b.reviews_count) || 0,
        cover: b.cover,
        image: b.cover,
        image2: b.image_2 || "",
        image_2: b.image_2 || "",
        label: b.label || (discountPercent >= 20 ? `${discountPercent}% OFF` : null),
        description: b.description || "",
        stock: Number(b.stock) || 50,
        featured: Boolean(b.featured)
      };
    };

    const formattedBooks = books.map(formatBook);

    res.json({ success: true, count: formattedBooks.length, data: formattedBooks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single book by ID with reviews
router.get("/:id", async (req, res) => {
  try {
    const book = await db.get("SELECT * FROM books WHERE id = ?", [req.params.id]);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    const reviews = await db.all(`
      SELECT id, user_name, rating, comment, created_at 
      FROM reviews 
      WHERE book_id = ? 
      ORDER BY created_at DESC
    `, [req.params.id]);

    const price = Number(book.price) || 0;
    const oldPrice = book.old_price !== null && book.old_price !== undefined ? Number(book.old_price) : null;
    let discountPercent = Number(book.discount_percent) || 0;
    if (oldPrice && oldPrice > price) {
      discountPercent = Math.round(((oldPrice - price) / oldPrice) * 100);
    }

    res.json({
      success: true,
      data: {
        id: book.id,
        title: book.title,
        author: book.author,
        category: book.category,
        subCategory: book.sub_category || "",
        sub_category: book.sub_category || "",
        price: price,
        cost: price,
        oldPrice: oldPrice,
        old_price: oldPrice,
        mrp: oldPrice,
        originalPrice: oldPrice,
        discountPercent: discountPercent,
        discount_percent: discountPercent,
        rating: Number(book.rating) || 4.5,
        reviewsCount: Number(book.reviews_count) || 0,
        cover: book.cover,
        image: book.cover,
        image2: book.image_2 || "",
        image_2: book.image_2 || "",
        label: book.label || (discountPercent >= 20 ? `${discountPercent}% OFF` : null),
        description: book.description || "",
        stock: Number(book.stock) || 50,
        featured: Boolean(book.featured),
        reviews
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create book (for store manager / admin)
router.post("/", async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      subCategory,
      sub_category,
      price,
      cost,
      oldPrice,
      old_price,
      mrp,
      originalPrice,
      discountPercent,
      discount_percent,
      cover,
      image,
      image2,
      image_2,
      label,
      description,
      stock = 25,
      featured = 0,
      is_featured
    } = req.body;

    const finalPrice = parseFloat(price !== undefined && price !== null ? price : cost);
    if (!title || !author || !category || isNaN(finalPrice)) {
      return res.status(400).json({
        success: false,
        message: "Title, author, category and price/cost are required."
      });
    }

    const finalSubCat = subCategory || sub_category || null;
    const rawOldPrice = oldPrice ?? old_price ?? mrp ?? originalPrice;
    const finalOldPrice = rawOldPrice !== undefined && rawOldPrice !== null && rawOldPrice !== "" ? parseFloat(rawOldPrice) : null;
    const finalCover = cover || image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop";
    const finalImage2 = image2 || image_2 || null;

    let finalDiscount = Number(discountPercent ?? discount_percent) || 0;
    if (finalOldPrice && finalOldPrice > finalPrice) {
      finalDiscount = Math.round(((finalOldPrice - finalPrice) / finalOldPrice) * 100);
    }

    const isFeaturedVal = (featured || is_featured) ? 1 : 0;

    const result = await db.run(`
      INSERT INTO books (title, author, category, sub_category, price, old_price, discount_percent, rating, reviews_count, cover, image_2, label, description, stock, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, 5.0, 0, ?, ?, ?, ?, ?, ?)
    `, [
      title,
      author,
      category,
      finalSubCat,
      finalPrice,
      finalOldPrice,
      finalDiscount,
      finalCover,
      finalImage2,
      label || (finalDiscount >= 20 ? `${finalDiscount}% OFF` : null),
      description || "",
      parseInt(stock) || 25,
      isFeaturedVal
    ]);

    const newBook = await db.get("SELECT * FROM books WHERE id = ?", [result.lastInsertRowid]);

    const resPrice = Number(newBook.price);
    const resOldPrice = newBook.old_price !== null ? Number(newBook.old_price) : null;
    let resDiscount = Number(newBook.discount_percent) || 0;
    if (resOldPrice && resOldPrice > resPrice) {
      resDiscount = Math.round(((resOldPrice - resPrice) / resOldPrice) * 100);
    }

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: {
        id: newBook.id,
        title: newBook.title,
        author: newBook.author,
        category: newBook.category,
        subCategory: newBook.sub_category,
        sub_category: newBook.sub_category,
        price: resPrice,
        cost: resPrice,
        oldPrice: resOldPrice,
        old_price: resOldPrice,
        mrp: resOldPrice,
        originalPrice: resOldPrice,
        discountPercent: resDiscount,
        discount_percent: resDiscount,
        rating: Number(newBook.rating),
        reviewsCount: Number(newBook.reviews_count),
        cover: newBook.cover,
        image: newBook.cover,
        image2: newBook.image_2,
        image_2: newBook.image_2,
        label: newBook.label,
        description: newBook.description,
        stock: Number(newBook.stock),
        featured: Boolean(newBook.featured)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update book
router.put("/:id", async (req, res) => {
  try {
    const existing = await db.get("SELECT * FROM books WHERE id = ?", [req.params.id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    const {
      title = existing.title,
      author = existing.author,
      category = existing.category,
      subCategory = existing.sub_category,
      sub_category = existing.sub_category,
      price = existing.price,
      cost,
      oldPrice,
      old_price,
      mrp,
      originalPrice,
      cover = existing.cover,
      image,
      image2 = existing.image_2,
      image_2 = existing.image_2,
      label = existing.label,
      description = existing.description,
      stock = existing.stock,
      featured = existing.featured,
      is_featured
    } = req.body;

    const finalPrice = parseFloat(price !== undefined && price !== null ? price : (cost !== undefined ? cost : existing.price));
    const rawOldPrice = oldPrice ?? old_price ?? mrp ?? originalPrice ?? existing.old_price;
    const finalOldPrice = rawOldPrice !== undefined && rawOldPrice !== null && rawOldPrice !== "" ? parseFloat(rawOldPrice) : null;
    const finalSubCat = subCategory || sub_category || null;
    const finalCover = cover || image || existing.cover;
    const finalImage2 = image2 || image_2 || existing.image_2 || null;

    let finalDiscount = 0;
    if (finalOldPrice && finalOldPrice > finalPrice) {
      finalDiscount = Math.round(((finalOldPrice - finalPrice) / finalOldPrice) * 100);
    }

    const isFeaturedVal = (featured !== undefined ? featured : is_featured) ? 1 : 0;

    await db.run(`
      UPDATE books 
      SET title = ?, author = ?, category = ?, sub_category = ?, price = ?, old_price = ?, discount_percent = ?, cover = ?, image_2 = ?, label = ?, description = ?, stock = ?, featured = ?
      WHERE id = ?
    `, [
      title,
      author,
      category,
      finalSubCat,
      finalPrice,
      finalOldPrice,
      finalDiscount,
      finalCover,
      finalImage2,
      label || (finalDiscount >= 20 ? `${finalDiscount}% OFF` : null),
      description,
      parseInt(stock),
      isFeaturedVal,
      req.params.id
    ]);

    const updated = await db.get("SELECT * FROM books WHERE id = ?", [req.params.id]);
    const resPrice = Number(updated.price);
    const resOldPrice = updated.old_price !== null ? Number(updated.old_price) : null;
    let resDiscount = Number(updated.discount_percent) || 0;
    if (resOldPrice && resOldPrice > resPrice) {
      resDiscount = Math.round(((resOldPrice - resPrice) / resOldPrice) * 100);
    }

    res.json({
      success: true,
      message: "Book updated successfully",
      data: {
        id: updated.id,
        title: updated.title,
        author: updated.author,
        category: updated.category,
        subCategory: updated.sub_category,
        sub_category: updated.sub_category,
        price: resPrice,
        cost: resPrice,
        oldPrice: resOldPrice,
        old_price: resOldPrice,
        mrp: resOldPrice,
        originalPrice: resOldPrice,
        discountPercent: resDiscount,
        discount_percent: resDiscount,
        rating: Number(updated.rating),
        reviewsCount: Number(updated.reviews_count),
        cover: updated.cover,
        image: updated.cover,
        image2: updated.image_2,
        image_2: updated.image_2,
        label: updated.label,
        description: updated.description,
        stock: Number(updated.stock),
        featured: Boolean(updated.featured)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE book
router.delete("/:id", async (req, res) => {
  try {
    const result = await db.run("DELETE FROM books WHERE id = ?", [req.params.id]);
    if (result.changes === 0 && result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.json({ success: true, message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST review for a book
router.post("/:id/reviews", async (req, res) => {
  try {
    const bookId = req.params.id;
    const { userName, rating, comment } = req.body;

    if (!userName || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Name, rating (1-5), and review comment are required."
      });
    }

    const book = await db.get("SELECT id FROM books WHERE id = ?", [bookId]);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    await db.run(`
      INSERT INTO reviews (book_id, user_name, rating, comment)
      VALUES (?, ?, ?, ?)
    `, [bookId, userName.trim(), Math.min(5, Math.max(1, parseInt(rating))), comment.trim()]);

    // Update book aggregate rating and count
    const stats = await db.get(`
      SELECT AVG(rating) as avg_rating, COUNT(*) as count 
      FROM reviews 
      WHERE book_id = ?
    `, [bookId]);

    const newRating = Math.round((Number(stats.avg_rating) || 5) * 10) / 10;
    await db.run(`
      UPDATE books 
      SET rating = ?, reviews_count = ? 
      WHERE id = ?
    `, [newRating, stats.count, bookId]);

    const allReviews = await db.all(`
      SELECT id, user_name, rating, comment, created_at 
      FROM reviews 
      WHERE book_id = ? 
      ORDER BY created_at DESC
    `, [bookId]);

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
