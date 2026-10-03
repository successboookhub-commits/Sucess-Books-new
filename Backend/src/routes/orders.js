import { Router } from "express";
import { db } from "../db/database.js";

const router = Router();

// Helper to generate readable tracking code e.g. SBH-7492
function generateOrderId() {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `SBH-${randomDigits}`;
}

// POST create new order
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail = "",
      deliveryAddress,
      city = "",
      pincode = "",
      items,
      subtotal,
      deliveryFee = 0,
      paymentMethod = "COD",
      orderNotes = ""
    } = req.body;

    if (!customerName || !customerPhone || !deliveryAddress || !items || !items.length) {
      return res.status(400).json({
        success: false,
        message: "Customer name, phone number, delivery address, and at least one item are required."
      });
    }

    const orderId = generateOrderId();
    const parsedSubtotal = parseFloat(subtotal) || 0;
    const parsedDelivery = parseFloat(deliveryFee) || 0;
    const total = parsedSubtotal + parsedDelivery;

    await db.run(`
      INSERT INTO orders (
        id, customer_name, customer_phone, customer_email, 
        delivery_address, city, pincode, items_json, 
        subtotal, delivery_fee, total, payment_method, 
        status, order_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    `, [
      orderId,
      customerName.trim(),
      customerPhone.trim(),
      customerEmail.trim(),
      deliveryAddress.trim(),
      city.trim(),
      pincode.trim(),
      JSON.stringify(items),
      parsedSubtotal,
      parsedDelivery,
      total,
      paymentMethod,
      orderNotes.trim()
    ]);

    // Format WhatsApp message text
    const itemsText = items
      .map(it => `• ${it.title} × ${it.quantity} — ₹${it.price * it.quantity}`)
      .join("\n");

    const whatsappMessage = `*New Order: ${orderId}*\n\n` +
      `*Customer:* ${customerName}\n` +
      `*Phone:* ${customerPhone}\n` +
      `*Address:* ${deliveryAddress}${city ? `, ${city}` : ""}${pincode ? ` - ${pincode}` : ""}\n` +
      `*Payment:* ${paymentMethod}\n\n` +
      `*Items:*\n${itemsText}\n\n` +
      `*Total:* ₹${total}\n\n` +
      `Please confirm order delivery schedule.`;

    const whatsappUrl = `https://wa.me/${process.env.WHATSAPP_NUMBER || "919876543210"}?text=${encodeURIComponent(whatsappMessage)}`;

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: {
        orderId,
        customerName,
        customerPhone,
        deliveryAddress,
        city,
        pincode,
        items,
        subtotal: parsedSubtotal,
        deliveryFee: parsedDelivery,
        total,
        paymentMethod,
        status: "pending",
        orderNotes,
        whatsappUrl
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all orders (for store manager / admin view)
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    let query = "SELECT * FROM orders";
    const params = [];

    if (status && status !== "all") {
      query += " WHERE status = ?";
      params.push(status);
    }

    query += " ORDER BY created_at DESC";

    const orders = await db.all(query, params);

    const formatted = orders.map(o => {
      let items = [];
      try {
        items = typeof o.items_json === "string" ? JSON.parse(o.items_json) : (o.items_json || []);
      } catch {
        items = [];
      }
      return {
        id: o.id,
        customerName: o.customer_name,
        customerPhone: o.customer_phone,
        customerEmail: o.customer_email,
        deliveryAddress: o.delivery_address,
        city: o.city,
        pincode: o.pincode,
        items,
        subtotal: Number(o.subtotal),
        deliveryFee: Number(o.delivery_fee),
        total: Number(o.total),
        paymentMethod: o.payment_method,
        status: o.status,
        orderNotes: o.order_notes,
        createdAt: o.created_at
      };
    });

    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET order by tracking ID
router.get("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId.toUpperCase();
    const order = await db.get("SELECT * FROM orders WHERE UPPER(id) = ?", [orderId]);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order #${orderId} not found. Please check your order ID.`
      });
    }

    let items = [];
    try {
      items = typeof order.items_json === "string" ? JSON.parse(order.items_json) : (order.items_json || []);
    } catch {
      items = [];
    }

    res.json({
      success: true,
      data: {
        id: order.id,
        customerName: order.customer_name,
        customerPhone: order.customer_phone,
        deliveryAddress: order.delivery_address,
        city: order.city,
        pincode: order.pincode,
        items,
        subtotal: Number(order.subtotal),
        deliveryFee: Number(order.delivery_fee),
        total: Number(order.total),
        paymentMethod: order.payment_method,
        status: order.status,
        orderNotes: order.order_notes,
        createdAt: order.created_at
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH update order status
router.patch("/:orderId/status", async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.orderId.toUpperCase();

    const validStatuses = ["pending", "confirmed", "dispatched", "delivered", "cancelled"];
    if (!validStatuses.includes(status?.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Valid options: ${validStatuses.join(", ")}`
      });
    }

    const result = await db.run(`
      UPDATE orders 
      SET status = ? 
      WHERE UPPER(id) = ?
    `, [status.toLowerCase(), orderId]);

    if (result.changes === 0 && result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      message: `Order #${orderId} updated to ${status}`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
