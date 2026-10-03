import express from "express";
import { db } from "../db/database.js";

const router = express.Router();

// Helper to generate URL-safe slugs
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

// GET /api/categories - Fetch all categories with sub-categories count & books count
router.get("/", (req, res) => {
  try {
    const { status, search } = req.query;
    let query = `
      SELECT 
        c.*, 
        (SELECT COUNT(*) FROM sub_categories sc WHERE sc.category_id = c.id) as sub_categories_count,
        (SELECT COUNT(*) FROM books b WHERE LOWER(b.category) = LOWER(c.name)) as books_count
      FROM categories c
      WHERE 1=1
    `;
    const params = [];

    if (status && status !== "all") {
      query += " AND c.status = ?";
      params.push(status);
    }

    if (search) {
      query += " AND (c.name LIKE ? OR c.description LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    query += " ORDER BY c.id ASC";

    const categories = db.prepare(query).all(...params);

    // Also attach subcategories list to each category for convenience
    const allSubs = db.prepare("SELECT * FROM sub_categories ORDER BY id ASC").all();
    const subMap = {};
    for (const sub of allSubs) {
      if (!subMap[sub.category_id]) {
        subMap[sub.category_id] = [];
      }
      subMap[sub.category_id].push(sub);
    }

    const result = categories.map((cat) => ({
      ...cat,
      subCategories: subMap[cat.id] || []
    }));

    res.json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/categories/:id - Fetch single category
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const category = db.prepare("SELECT * FROM categories WHERE id = ?").get(id);

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const subCategories = db.prepare("SELECT * FROM sub_categories WHERE category_id = ? ORDER BY id ASC").all(id);
    const booksCount = db.prepare("SELECT COUNT(*) as count FROM books WHERE LOWER(category) = LOWER(?)").get(category.name);

    res.json({
      success: true,
      data: {
        ...category,
        sub_categories_count: subCategories.length,
        books_count: booksCount.count,
        subCategories
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/categories - Create new category
router.post("/", (req, res) => {
  try {
    const { name, description, image, status } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const trimmedName = name.trim();
    let slug = req.body.slug ? slugify(req.body.slug) : slugify(trimmedName);

    // Check if category name already exists
    const existing = db.prepare("SELECT id FROM categories WHERE LOWER(name) = LOWER(?)").get(trimmedName);
    if (existing) {
      return res.status(400).json({ success: false, message: `Category "${trimmedName}" already exists` });
    }

    // Ensure unique slug
    let baseSlug = slug;
    let counter = 1;
    while (db.prepare("SELECT id FROM categories WHERE slug = ?").get(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const defaultImg = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop";

    const insert = db.prepare(`
      INSERT INTO categories (name, slug, description, image, status)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      trimmedName,
      slug,
      description ? description.trim() : "",
      image && image.trim() ? image.trim() : defaultImg,
      status || "active"
    );

    const newCategory = db.prepare("SELECT * FROM categories WHERE id = ?").get(result.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: {
        ...newCategory,
        sub_categories_count: 0,
        books_count: 0,
        subCategories: []
      }
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/categories/:id - Update category
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, status } = req.body;

    const category = db.prepare("SELECT * FROM categories WHERE id = ?").get(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const updatedName = name && name.trim() ? name.trim() : category.name;
    let slug = category.slug;

    if (name && name.trim() !== category.name) {
      // Check if new name conflicts with another category
      const conflict = db.prepare("SELECT id FROM categories WHERE LOWER(name) = LOWER(?) AND id != ?").get(updatedName, id);
      if (conflict) {
        return res.status(400).json({ success: false, message: `Another category named "${updatedName}" already exists` });
      }
      slug = slugify(updatedName);
    }

    const update = db.prepare(`
      UPDATE categories
      SET name = ?, slug = ?, description = ?, image = ?, status = ?
      WHERE id = ?
    `);

    update.run(
      updatedName,
      slug,
      description !== undefined ? description.trim() : category.description,
      image !== undefined && image.trim() ? image.trim() : category.image,
      status !== undefined ? status : category.status,
      id
    );

    const updated = db.prepare("SELECT * FROM categories WHERE id = ?").get(id);
    const subCategories = db.prepare("SELECT * FROM sub_categories WHERE category_id = ?").all(id);

    res.json({
      success: true,
      message: "Category updated successfully",
      data: {
        ...updated,
        sub_categories_count: subCategories.length,
        subCategories
      }
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/categories/:id - Delete category
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const category = db.prepare("SELECT * FROM categories WHERE id = ?").get(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Delete sub-categories under this category
    db.prepare("DELETE FROM sub_categories WHERE category_id = ?").run(id);
    // Delete the category itself
    db.prepare("DELETE FROM categories WHERE id = ?").run(id);

    res.json({
      success: true,
      message: `Category "${category.name}" and all associated sub-categories deleted successfully`,
      deletedId: Number(id)
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
