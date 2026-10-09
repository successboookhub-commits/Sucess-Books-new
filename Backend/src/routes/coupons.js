import { Router } from "express";
import { db } from "../db/database.js";

const router = Router();

// GET /api/coupons - List all coupons (supports ?status=, ?search=)
router.get("/", async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = "SELECT * FROM coupons WHERE 1=1";
    const params = [];

    if (status && status !== "all") {
      query += " AND status = ?";
      params.push(status);
    }

    if (search && search.trim()) {
      query += " AND code LIKE ?";
      params.push(`%${search.trim().toUpperCase()}%`);
    }

    query += " ORDER BY id DESC";

    const coupons = await db.all(query, params);

    res.json({
      success: true,
      count: coupons.length,
      data: coupons.map((c) => ({
        id: c.id,
        code: c.code,
        discountType: c.discount_type,
        discount_type: c.discount_type,
        discountValue: Number(c.discount_value),
        discount_value: Number(c.discount_value),
        minOrder: Number(c.min_order || 0),
        min_order: Number(c.min_order || 0),
        maxDiscount: c.max_discount !== null ? Number(c.max_discount) : null,
        max_discount: c.max_discount !== null ? Number(c.max_discount) : null,
        status: c.status,
        usageCount: Number(c.usage_count || 0),
        usage_count: Number(c.usage_count || 0),
        createdAt: c.created_at,
        created_at: c.created_at
      }))
    });
  } catch (err) {
    console.error("Error fetching coupons:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/coupons - Create new coupon
router.post("/", async (req, res) => {
  try {
    const { code, discountType = "percentage", discountValue, minOrder = 0, maxDiscount = null, status = "active" } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ success: false, message: "Coupon code is required" });
    }

    const normalizedCode = code.trim().toUpperCase().replace(/\s+/g, "");
    const parsedValue = parseFloat(discountValue);

    if (isNaN(parsedValue) || parsedValue <= 0) {
      return res.status(400).json({ success: false, message: "A valid positive discount value is required" });
    }

    // Check duplicate code
    const existing = await db.get("SELECT id FROM coupons WHERE UPPER(code) = ?", [normalizedCode]);
    if (existing) {
      return res.status(409).json({ success: false, message: `Coupon code "${normalizedCode}" already exists` });
    }

    const result = await db.run(
      `INSERT INTO coupons (code, discount_type, discount_value, min_order, max_discount, status, usage_count)
       VALUES (?, ?, ?, ?, ?, ?, 0)`,
      [
        normalizedCode,
        discountType === "flat" ? "flat" : "percentage",
        parsedValue,
        parseFloat(minOrder) || 0,
        maxDiscount !== null && maxDiscount !== undefined && maxDiscount !== "" ? parseFloat(maxDiscount) : null,
        status || "active"
      ]
    );

    const created = await db.get("SELECT * FROM coupons WHERE id = ?", [result.lastInsertRowid]);

    res.status(201).json({
      success: true,
      message: `Coupon "${normalizedCode}" created successfully`,
      data: {
        id: created.id,
        code: created.code,
        discountType: created.discount_type,
        discountValue: Number(created.discount_value),
        minOrder: Number(created.min_order),
        maxDiscount: created.max_discount !== null ? Number(created.max_discount) : null,
        status: created.status,
        usageCount: 0,
        createdAt: created.created_at
      }
    });
  } catch (err) {
    if (err.message && (err.message.includes("UNIQUE") || err.message.includes("Duplicate entry"))) {
      return res.status(409).json({ success: false, message: "Coupon code must be unique" });
    }
    console.error("Error creating coupon:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/coupons/:id - Update coupon
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await db.get("SELECT * FROM coupons WHERE id = ?", [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }

    const { code, discountType, discountValue, minOrder, maxDiscount, status } = req.body;

    let updatedCode = existing.code;
    if (code && code.trim()) {
      const normalized = code.trim().toUpperCase().replace(/\s+/g, "");
      if (normalized !== existing.code) {
        const conflict = await db.get("SELECT id FROM coupons WHERE UPPER(code) = ? AND id != ?", [normalized, id]);
        if (conflict) {
          return res.status(409).json({ success: false, message: `Coupon code "${normalized}" is already in use` });
        }
        updatedCode = normalized;
      }
    }

    const updatedType = discountType || existing.discount_type;
    const updatedValue = discountValue !== undefined ? parseFloat(discountValue) : existing.discount_value;
    const updatedMin = minOrder !== undefined ? parseFloat(minOrder) : existing.min_order;
    const updatedMax = maxDiscount !== undefined ? (maxDiscount ? parseFloat(maxDiscount) : null) : existing.max_discount;
    const updatedStatus = status || existing.status;

    await db.run(
      `UPDATE coupons 
       SET code = ?, discount_type = ?, discount_value = ?, min_order = ?, max_discount = ?, status = ?
       WHERE id = ?`,
      [updatedCode, updatedType, updatedValue, updatedMin, updatedMax, updatedStatus, id]
    );

    const updated = await db.get("SELECT * FROM coupons WHERE id = ?", [id]);

    res.json({
      success: true,
      message: `Coupon "${updated.code}" updated successfully`,
      data: {
        id: updated.id,
        code: updated.code,
        discountType: updated.discount_type,
        discountValue: Number(updated.discount_value),
        minOrder: Number(updated.min_order),
        maxDiscount: updated.max_discount !== null ? Number(updated.max_discount) : null,
        status: updated.status,
        usageCount: Number(updated.usage_count || 0),
        createdAt: updated.created_at
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/coupons/:id - Delete coupon
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await db.get("SELECT * FROM coupons WHERE id = ?", [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }

    await db.run("DELETE FROM coupons WHERE id = ?", [id]);

    res.json({
      success: true,
      message: `Coupon "${existing.code}" deleted successfully`,
      deletedId: Number(id)
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/coupons/validate - Validate coupon for checkout and compute discount
router.post("/validate", async (req, res) => {
  try {
    const { code, subtotal, orderAmount } = req.body;
    if (!code || !code.trim()) {
      return res.status(400).json({ success: false, message: "Coupon code is required" });
    }

    const orderSubtotal = parseFloat(subtotal !== undefined ? subtotal : orderAmount) || 0;
    const normalized = code.trim().toUpperCase().replace(/\s+/g, "");

    const coupon = await db.get("SELECT * FROM coupons WHERE UPPER(code) = ?", [normalized]);
    if (!coupon) {
      return res.status(404).json({ success: false, message: `Coupon code "${normalized}" is invalid` });
    }

    if (coupon.status !== "active") {
      return res.status(400).json({ success: false, message: `Coupon "${normalized}" is no longer active` });
    }

    const minRequired = Number(coupon.min_order || 0);
    if (orderSubtotal < minRequired) {
      return res.status(400).json({
        success: false,
        message: `Coupon "${normalized}" requires a minimum order of ₹${minRequired}. Add ₹${minRequired - orderSubtotal} more to qualify.`
      });
    }

    let calculatedDiscount = 0;
    if (coupon.discount_type === "flat") {
      calculatedDiscount = Number(coupon.discount_value);
    } else {
      calculatedDiscount = Math.round((orderSubtotal * Number(coupon.discount_value)) / 100);
      if (coupon.max_discount && calculatedDiscount > Number(coupon.max_discount)) {
        calculatedDiscount = Number(coupon.max_discount);
      }
    }

    // Do not exceed subtotal
    calculatedDiscount = Math.min(calculatedDiscount, orderSubtotal);
    const finalTotal = Math.max(0, orderSubtotal - calculatedDiscount);

    res.json({
      success: true,
      discountAmount: calculatedDiscount,
      finalTotal,
      data: {
        code: coupon.code,
        discountType: coupon.discount_type,
        discountValue: Number(coupon.discount_value),
        calculatedDiscount,
        newSubtotal: finalTotal
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
