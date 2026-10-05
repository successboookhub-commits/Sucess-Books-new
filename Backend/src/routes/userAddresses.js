import { Router } from "express";
import { db } from "../db/database.js";
import { requireUserAuth } from "../middleware/auth.js";

const router = Router();

// All address routes require user login
router.use(requireUserAuth);

/**
 * 1. GET /api/user/addresses
 * Get all saved delivery addresses for logged in customer
 */
router.get("/", async (req, res) => {
  try {
    const userEmail = req.user.email;
    const addresses = await db.all(
      `SELECT * FROM user_addresses 
       WHERE user_email = ? 
       ORDER BY is_default DESC, created_at DESC`,
      [userEmail]
    );

    const formatted = addresses.map(a => ({
      id: a.id,
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
    }));

    return res.json({
      success: true,
      data: formatted
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 2. POST /api/user/addresses
 * Add a new delivery address
 */
router.post("/", async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userId = req.user.id || null;
    const {
      fullName,
      phone,
      alternatePhone,
      pincode,
      flatHouse,
      areaStreet,
      landmark,
      city,
      state = "Telangana",
      addressType = "Home",
      isDefault = false
    } = req.body;

    if (!fullName || !phone || !pincode || !flatHouse || !areaStreet || !city) {
      return res.status(400).json({
        success: false,
        message: "Full name, phone, pincode, flat/house no, area/street, and city are required."
      });
    }

    // If first address or marked default, clear previous defaults
    const existingCount = await db.get("SELECT COUNT(*) as count FROM user_addresses WHERE user_email = ?", [userEmail]);
    const shouldBeDefault = isDefault || (existingCount?.count === 0);

    if (shouldBeDefault) {
      await db.run("UPDATE user_addresses SET is_default = 0 WHERE user_email = ?", [userEmail]);
    }

    const result = await db.run(`
      INSERT INTO user_addresses (
        user_id, user_email, full_name, phone, alternate_phone,
        pincode, flat_house, area_street, landmark, city, state,
        address_type, is_default
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      userId,
      userEmail,
      fullName.trim(),
      phone.trim(),
      alternatePhone ? alternatePhone.trim() : null,
      pincode.trim(),
      flatHouse.trim(),
      areaStreet.trim(),
      landmark ? landmark.trim() : null,
      city.trim(),
      state.trim(),
      addressType || "Home",
      shouldBeDefault ? 1 : 0
    ]);

    const created = await db.get("SELECT * FROM user_addresses WHERE id = ?", [result.lastInsertRowid]);

    return res.status(201).json({
      success: true,
      message: "Address saved successfully!",
      data: {
        id: created.id,
        fullName: created.full_name,
        phone: created.phone,
        alternatePhone: created.alternate_phone || "",
        pincode: created.pincode,
        flatHouse: created.flat_house,
        areaStreet: created.area_street,
        landmark: created.landmark || "",
        city: created.city,
        state: created.state,
        addressType: created.address_type,
        isDefault: Boolean(created.is_default),
        formattedAddress: `${created.flat_house}, ${created.area_street}${created.landmark ? `, Near ${created.landmark}` : ""}, ${created.city}, ${created.state} - ${created.pincode}`
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 3. PUT /api/user/addresses/:id
 * Update an existing delivery address
 */
router.put("/:id", async (req, res) => {
  try {
    const userEmail = req.user.email;
    const addressId = req.params.id;

    const existing = await db.get(
      "SELECT * FROM user_addresses WHERE id = ? AND user_email = ?",
      [addressId, userEmail]
    );

    if (!existing) {
      return res.status(404).json({ success: false, message: "Address not found." });
    }

    const {
      fullName = existing.full_name,
      phone = existing.phone,
      alternatePhone = existing.alternate_phone,
      pincode = existing.pincode,
      flatHouse = existing.flat_house,
      areaStreet = existing.area_street,
      landmark = existing.landmark,
      city = existing.city,
      state = existing.state,
      addressType = existing.address_type,
      isDefault = Boolean(existing.is_default)
    } = req.body;

    if (isDefault) {
      await db.run("UPDATE user_addresses SET is_default = 0 WHERE user_email = ?", [userEmail]);
    }

    await db.run(`
      UPDATE user_addresses 
      SET full_name = ?, phone = ?, alternate_phone = ?, pincode = ?, 
          flat_house = ?, area_street = ?, landmark = ?, city = ?, 
          state = ?, address_type = ?, is_default = ?
      WHERE id = ? AND user_email = ?
    `, [
      fullName.trim(),
      phone.trim(),
      alternatePhone ? alternatePhone.trim() : null,
      pincode.trim(),
      flatHouse.trim(),
      areaStreet.trim(),
      landmark ? landmark.trim() : null,
      city.trim(),
      state.trim(),
      addressType,
      isDefault ? 1 : 0,
      addressId,
      userEmail
    ]);

    const updated = await db.get("SELECT * FROM user_addresses WHERE id = ?", [addressId]);

    return res.json({
      success: true,
      message: "Address updated successfully!",
      data: {
        id: updated.id,
        fullName: updated.full_name,
        phone: updated.phone,
        alternatePhone: updated.alternate_phone || "",
        pincode: updated.pincode,
        flatHouse: updated.flat_house,
        areaStreet: updated.area_street,
        landmark: updated.landmark || "",
        city: updated.city,
        state: updated.state,
        addressType: updated.address_type,
        isDefault: Boolean(updated.is_default),
        formattedAddress: `${updated.flat_house}, ${updated.area_street}${updated.landmark ? `, Near ${updated.landmark}` : ""}, ${updated.city}, ${updated.state} - ${updated.pincode}`
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 4. DELETE /api/user/addresses/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const userEmail = req.user.email;
    const addressId = req.params.id;

    const result = await db.run(
      "DELETE FROM user_addresses WHERE id = ? AND user_email = ?",
      [addressId, userEmail]
    );

    if (result.changes === 0 && result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Address not found." });
    }

    return res.json({ success: true, message: "Address deleted successfully." });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 5. PATCH /api/user/addresses/:id/default
 */
router.patch("/:id/default", async (req, res) => {
  try {
    const userEmail = req.user.email;
    const addressId = req.params.id;

    await db.run("UPDATE user_addresses SET is_default = 0 WHERE user_email = ?", [userEmail]);
    const result = await db.run(
      "UPDATE user_addresses SET is_default = 1 WHERE id = ? AND user_email = ?",
      [addressId, userEmail]
    );

    if (result.changes === 0 && result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Address not found." });
    }

    return res.json({ success: true, message: "Default address updated!" });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
