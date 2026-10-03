import express from "express";
import { db } from "../db/database.js";

const router = express.Router();

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

// GET /api/subcategories - Fetch all subcategories (supports ?category_id=, ?status=, ?search=)
router.get("/", (req, res) => {
  try {
    const { category_id, status, search } = req.query;
    let query = `
      SELECT 
        sc.*,
        c.name as category_name,
        c.slug as category_slug,
        c.image as category_image
      FROM sub_categories sc
      JOIN categories c ON sc.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (category_id && category_id !== "all") {
      query += " AND sc.category_id = ?";
      params.push(Number(category_id));
    }

    if (status && status !== "all") {
      query += " AND sc.status = ?";
      params.push(status);
    }

    if (search) {
      query += " AND (sc.name LIKE ? OR sc.description LIKE ? OR c.name LIKE ?)";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += " ORDER BY sc.category_id ASC, sc.id ASC";

    const subCategories = db.prepare(query).all(...params);

    res.json({
      success: true,
      count: subCategories.length,
      data: subCategories
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/subcategories/:id - Fetch single subcategory
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = db.prepare(`
      SELECT 
        sc.*,
        c.name as category_name,
        c.slug as category_slug,
        c.image as category_image
      FROM sub_categories sc
      JOIN categories c ON sc.category_id = c.id
      WHERE sc.id = ?
    `).get(id);

    if (!subCategory) {
      return res.status(404).json({ success: false, message: "Sub-category not found" });
    }

    res.json({
      success: true,
      data: subCategory
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/subcategories - Create new subcategory
router.post("/", (req, res) => {
  try {
    const { category_id, name, description, image, status } = req.body;

    if (!category_id) {
      return res.status(400).json({ success: false, message: "Parent category is required" });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Sub-category name is required" });
    }

    // Verify parent category exists
    const category = db.prepare("SELECT * FROM categories WHERE id = ?").get(category_id);
    if (!category) {
      return res.status(400).json({ success: false, message: "Selected parent category does not exist" });
    }

    const trimmedName = name.trim();
    let slug = req.body.slug ? slugify(req.body.slug) : slugify(trimmedName);

    // Ensure unique slug under this category
    const conflict = db.prepare("SELECT id FROM sub_categories WHERE category_id = ? AND LOWER(name) = LOWER(?)").get(category_id, trimmedName);
    if (conflict) {
      return res.status(400).json({ success: false, message: `Sub-category "${trimmedName}" already exists under ${category.name}` });
    }

    const defaultImg = "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop";

    const insert = db.prepare(`
      INSERT INTO sub_categories (category_id, name, slug, description, image, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      category_id,
      trimmedName,
      slug,
      description ? description.trim() : "",
      image && image.trim() ? image.trim() : defaultImg,
      status || "active"
    );

    const newSubCategory = db.prepare(`
      SELECT 
        sc.*,
        c.name as category_name,
        c.slug as category_slug,
        c.image as category_image
      FROM sub_categories sc
      JOIN categories c ON sc.category_id = c.id
      WHERE sc.id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: "Sub-category created successfully",
      data: newSubCategory
    });
  } catch (error) {
    console.error("Error creating sub-category:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/subcategories/:id - Update subcategory
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, name, description, image, status } = req.body;

    const subCategory = db.prepare("SELECT * FROM sub_categories WHERE id = ?").get(id);
    if (!subCategory) {
      return res.status(404).json({ success: false, message: "Sub-category not found" });
    }

    const targetCategoryId = category_id !== undefined ? Number(category_id) : subCategory.category_id;
    const category = db.prepare("SELECT * FROM categories WHERE id = ?").get(targetCategoryId);
    if (!category) {
      return res.status(400).json({ success: false, message: "Target parent category does not exist" });
    }

    const updatedName = name && name.trim() ? name.trim() : subCategory.name;
    const slug = slugify(updatedName);

    // Check duplicate name within category
    const conflict = db.prepare("SELECT id FROM sub_categories WHERE category_id = ? AND LOWER(name) = LOWER(?) AND id != ?")
      .get(targetCategoryId, updatedName, id);
    if (conflict) {
      return res.status(400).json({ success: false, message: `Another sub-category named "${updatedName}" already exists in ${category.name}` });
    }

    const update = db.prepare(`
      UPDATE sub_categories
      SET category_id = ?, name = ?, slug = ?, description = ?, image = ?, status = ?
      WHERE id = ?
    `);

    update.run(
      targetCategoryId,
      updatedName,
      slug,
      description !== undefined ? description.trim() : subCategory.description,
      image !== undefined && image.trim() ? image.trim() : subCategory.image,
      status !== undefined ? status : subCategory.status,
      id
    );

    const updated = db.prepare(`
      SELECT 
        sc.*,
        c.name as category_name,
        c.slug as category_slug,
        c.image as category_image
      FROM sub_categories sc
      JOIN categories c ON sc.category_id = c.id
      WHERE sc.id = ?
    `).get(id);

    res.json({
      success: true,
      message: "Sub-category updated successfully",
      data: updated
    });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/subcategories/:id - Delete subcategory
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = db.prepare("SELECT * FROM sub_categories WHERE id = ?").get(id);
    if (!subCategory) {
      return res.status(404).json({ success: false, message: "Sub-category not found" });
    }

    db.prepare("DELETE FROM sub_categories WHERE id = ?").run(id);

    res.json({
      success: true,
      message: `Sub-category "${subCategory.name}" deleted successfully`,
      deletedId: Number(id)
    });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
