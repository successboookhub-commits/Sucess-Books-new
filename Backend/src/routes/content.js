import { Router } from "express";
import { db } from "../db/database.js";

const router = Router();

// GET /api/content - List content blocks (supports ?type=, ?status=)
router.get("/", async (req, res) => {
  try {
    const { type, status } = req.query;
    let query = "SELECT * FROM content_blocks WHERE 1=1";
    const params = [];

    if (type && type !== "all") {
      query += " AND type = ?";
      params.push(type);
    }

    if (status && status !== "all") {
      query += " AND status = ?";
      params.push(status);
    }

    query += " ORDER BY display_order ASC, id DESC";

    const blocks = await db.all(query, params);

    res.json({
      success: true,
      count: blocks.length,
      data: blocks.map((b) => ({
        id: b.id,
        type: b.type,
        title: b.title,
        subtitle: b.subtitle || "",
        image: b.image || "",
        linkUrl: b.link_url || "",
        link_url: b.link_url || "",
        content: b.content || "",
        status: b.status,
        displayOrder: Number(b.display_order || 0),
        display_order: Number(b.display_order || 0),
        createdAt: b.created_at
      }))
    });
  } catch (err) {
    console.error("Error fetching content blocks:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/content - Create new content block
router.post("/", async (req, res) => {
  try {
    const { type, title, subtitle = "", image = "", linkUrl = "", link_url = "", content = "", status = "active", displayOrder = 0, display_order = 0 } = req.body;

    if (!type || !title || !title.trim()) {
      return res.status(400).json({ success: false, message: "Type and Title are required" });
    }

    const finalLink = linkUrl || link_url || "";
    const finalOrder = parseInt(displayOrder !== undefined ? displayOrder : display_order) || 0;

    const result = await db.run(
      `INSERT INTO content_blocks (type, title, subtitle, image, link_url, content, status, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [type.trim(), title.trim(), subtitle ? subtitle.trim() : null, image ? image.trim() : null, finalLink ? finalLink.trim() : null, content ? content.trim() : null, status || "active", finalOrder]
    );

    const created = await db.get("SELECT * FROM content_blocks WHERE id = ?", [result.lastInsertRowid]);

    res.status(201).json({
      success: true,
      message: "Content block created successfully",
      data: {
        id: created.id,
        type: created.type,
        title: created.title,
        subtitle: created.subtitle || "",
        image: created.image || "",
        linkUrl: created.link_url || "",
        link_url: created.link_url || "",
        content: created.content || "",
        status: created.status,
        displayOrder: Number(created.display_order),
        display_order: Number(created.display_order),
        createdAt: created.created_at
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/content/:id - Update content block
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await db.get("SELECT * FROM content_blocks WHERE id = ?", [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Content item not found" });
    }

    const { type = existing.type, title = existing.title, subtitle = existing.subtitle, image = existing.image, linkUrl, link_url, content = existing.content, status = existing.status, displayOrder, display_order } = req.body;

    const finalLink = linkUrl !== undefined ? linkUrl : (link_url !== undefined ? link_url : existing.link_url);
    const finalOrder = displayOrder !== undefined ? parseInt(displayOrder) : (display_order !== undefined ? parseInt(display_order) : existing.display_order);

    await db.run(
      `UPDATE content_blocks 
       SET type = ?, title = ?, subtitle = ?, image = ?, link_url = ?, content = ?, status = ?, display_order = ?
       WHERE id = ?`,
      [type, title.trim(), subtitle, image, finalLink, content, status, finalOrder, id]
    );

    const updated = await db.get("SELECT * FROM content_blocks WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Content block updated successfully",
      data: {
        id: updated.id,
        type: updated.type,
        title: updated.title,
        subtitle: updated.subtitle || "",
        image: updated.image || "",
        linkUrl: updated.link_url || "",
        link_url: updated.link_url || "",
        content: updated.content || "",
        status: updated.status,
        displayOrder: Number(updated.display_order),
        display_order: Number(updated.display_order),
        createdAt: updated.created_at
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/content/:id - Delete content block
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await db.get("SELECT * FROM content_blocks WHERE id = ?", [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Content item not found" });
    }

    await db.run("DELETE FROM content_blocks WHERE id = ?", [id]);

    res.json({
      success: true,
      message: `Content block deleted successfully`,
      deletedId: Number(id)
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
