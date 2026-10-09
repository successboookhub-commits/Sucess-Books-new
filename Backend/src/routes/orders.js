import { Router } from "express";
import { db } from "../db/database.js";
import { sendOrderConfirmationEmail } from "../services/mailService.js";
import { optionalUserAuth, requireUserAuth } from "../middleware/auth.js";

const router = Router();

// Helper to generate readable tracking code e.g. SBH-7492
function generateOrderId() {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `SBH-${randomDigits}`;
}

function numberToWords(num) {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const n = Math.floor(num);
  if (n === 0) return 'Zero Rupees Only';

  const inWords = (n) => {
    let str = '';
    if (n >= 100000) {
      str += inWords(Math.floor(n / 100000)) + 'Lakh ';
      n %= 100000;
    }
    if (n >= 1000) {
      str += inWords(Math.floor(n / 1000)) + 'Thousand ';
      n %= 1000;
    }
    if (n >= 100) {
      str += inWords(Math.floor(n / 100)) + 'Hundred ';
      n %= 100;
    }
    if (n > 0) {
      if (str !== '') str += 'and ';
      if (n < 20) str += a[n];
      else {
        str += b[Math.floor(n / 10)] + ' ';
        if (n % 10 > 0) str += a[n % 10];
      }
    }
    return str;
  };

  return inWords(n).trim() + ' Rupees Only';
}

// POST create new order
router.post("/", optionalUserAuth, async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail = "",
      deliveryAddress,
      city = "",
      state = "Telangana",
      pincode = "",
      addressType = "Home",
      items,
      subtotal,
      mrpTotal,
      discountTotal,
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
    const currentYear = new Date().getFullYear();
    const invoiceNo = `INV-${currentYear}-${orderId}`;

    const parsedSubtotal = parseFloat(subtotal) || 0;
    const parsedDelivery = parseFloat(deliveryFee) || 0;
    const parsedMrp = parseFloat(mrpTotal) || parsedSubtotal;
    const parsedDiscount = parseFloat(discountTotal) || Math.max(0, parsedMrp - parsedSubtotal);
    const total = parsedSubtotal + parsedDelivery;
    const { couponCode } = req.body;

    // 1. Prevent duplicate submissions: check if identical order placed within 15 seconds
    try {
      const recentDuplicate = await db.get(
        `SELECT * FROM orders 
         WHERE customer_phone = ? AND total = ? 
         ORDER BY created_at DESC LIMIT 1`,
        [customerPhone.trim(), total]
      );
      if (recentDuplicate && recentDuplicate.created_at) {
        let createdMs = 0;
        if (recentDuplicate.created_at instanceof Date) {
          createdMs = recentDuplicate.created_at.getTime();
        } else {
          const str = String(recentDuplicate.created_at).trim();
          createdMs = str.includes("T")
            ? new Date(str.endsWith("Z") ? str : str + "Z").getTime()
            : new Date(str.replace(" ", "T") + "Z").getTime();
        }
        const timeDiffMs = Math.abs(Date.now() - createdMs);
        if (timeDiffMs < 15000) {
          console.log(`[Orders] Idempotency: duplicate submission prevented for order #${recentDuplicate.id} (timeDiff: ${timeDiffMs}ms)`);
          return res.status(200).json({
            success: true,
            duplicate: true,
            idempotent: true,
            message: "Order already received (duplicate submission prevented).",
            data: {
              orderId: recentDuplicate.id,
              invoiceNo: recentDuplicate.invoice_no,
              customerName: recentDuplicate.customer_name,
              customerPhone: recentDuplicate.customer_phone,
              customerEmail: recentDuplicate.customer_email,
              total: Number(recentDuplicate.total),
              status: recentDuplicate.status,
              whatsappUrl: `https://wa.me/${process.env.WHATSAPP_NUMBER || "919876543210"}`
            }
          });
        }
      }
    } catch {
      // ignore check error and proceed
    }

    const userId = req.user?.id || null;
    const finalEmail = (customerEmail || req.user?.email || "").trim().toLowerCase();

    // 2. Persist order, update inventory stock, record payment, and clear user cart inside transaction
    await db.transaction(async (tx) => {
      await tx.run(`
        INSERT INTO orders (
          id, user_id, customer_name, customer_phone, customer_email, 
          delivery_address, city, state, pincode, address_type, items_json, 
          mrp_total, discount_total, subtotal, delivery_fee, total, payment_method, 
          status, invoice_no, order_notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)
      `, [
        orderId,
        userId,
        customerName.trim(),
        customerPhone.trim(),
        finalEmail,
        deliveryAddress.trim(),
        city.trim(),
        state.trim(),
        pincode.trim(),
        addressType || "Home",
        JSON.stringify(items),
        parsedMrp,
        parsedDiscount,
        parsedSubtotal,
        parsedDelivery,
        total,
        paymentMethod,
        invoiceNo,
        orderNotes.trim()
      ]);

      // Decrement inventory stock for each ordered book
      for (const item of items) {
        if (item.id) {
          const qty = parseInt(item.quantity) || 1;
          await tx.run(
            `UPDATE books SET stock = CASE WHEN stock >= ? THEN stock - ? ELSE 0 END WHERE id = ?`,
            [qty, qty, item.id]
          );
        }
      }

      // If coupon used, increment its usage counter
      if (couponCode && typeof couponCode === "string") {
        await tx.run(
          `UPDATE coupons SET usage_count = usage_count + 1 WHERE UPPER(code) = ?`,
          [couponCode.trim().toUpperCase()]
        );
      }

      // Record payment attempt in payments table
      try {
        const paymentProvider = paymentMethod === "COD" ? "cash_on_delivery" : (paymentMethod === "UPI" ? "upi" : "online");
        await tx.run(
          `INSERT INTO payments (order_id, user_id, amount, currency, provider, status, payment_method)
           VALUES (?, ?, ?, 'INR', ?, 'pending', ?)`,
          [orderId, userId, total, paymentProvider, paymentMethod]
        );
      } catch (payErr) {
        console.warn("[Orders] Could not record payments table entry:", payErr.message);
      }

      // Clear persistent database cart for this customer upon successful checkout
      if (finalEmail) {
        try {
          await tx.run(`DELETE FROM cart_items WHERE user_email = ?`, [finalEmail]);
        } catch {
          // ignore if table not available
        }
      }
    });

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

    // Trigger async order confirmation email if customer email is provided
    if (finalEmail) {
      sendOrderConfirmationEmail({
        id: orderId,
        customerName,
        customerEmail: finalEmail,
        customerPhone,
        deliveryAddress,
        city,
        pincode,
        items,
        subtotal: parsedSubtotal,
        deliveryFee: parsedDelivery,
        total,
        paymentMethod
      }).catch(err => console.error("[Order Email Error]:", err.message));
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: {
        orderId,
        invoiceNo,
        customerName,
        customerPhone,
        customerEmail: finalEmail,
        deliveryAddress,
        city,
        state,
        pincode,
        items,
        mrpTotal: parsedMrp,
        discountTotal: parsedDiscount,
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

// GET customer orders (for logged-in user dashboard)
router.get("/my-orders", requireUserAuth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userId = req.user.id;

    const orders = await db.all(
      `SELECT * FROM orders 
       WHERE customer_email = ? OR user_id = ? 
       ORDER BY created_at DESC`,
      [userEmail, userId]
    );

    const formatted = orders.map(o => {
      let items = [];
      try {
        items = typeof o.items_json === "string" ? JSON.parse(o.items_json) : (o.items_json || []);
      } catch {
        items = [];
      }
      return {
        id: o.id,
        invoiceNo: o.invoice_no || `INV-${o.id}`,
        customerName: o.customer_name,
        customerPhone: o.customer_phone,
        customerEmail: o.customer_email,
        deliveryAddress: o.delivery_address,
        city: o.city,
        state: o.state || "Telangana",
        pincode: o.pincode,
        addressType: o.address_type || "Home",
        items,
        mrpTotal: Number(o.mrp_total || o.subtotal),
        discountTotal: Number(o.discount_total || 0),
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

// GET all orders (for store manager / admin view)
router.get("/", async (req, res) => {
  try {
    const { status, email } = req.query;
    let query = "SELECT * FROM orders WHERE 1=1";
    const params = [];

    if (status && status !== "all") {
      query += " AND status = ?";
      params.push(status);
    }

    if (email) {
      query += " AND customer_email = ?";
      params.push(email.toLowerCase());
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
        invoiceNo: o.invoice_no || `INV-${o.id}`,
        customerName: o.customer_name,
        customerPhone: o.customer_phone,
        customerEmail: o.customer_email,
        deliveryAddress: o.delivery_address,
        city: o.city,
        state: o.state || "Telangana",
        pincode: o.pincode,
        addressType: o.address_type || "Home",
        items,
        mrpTotal: Number(o.mrp_total || o.subtotal),
        discountTotal: Number(o.discount_total || 0),
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

// GET Tax Invoice details for an order
router.get("/:orderId/invoice", async (req, res) => {
  try {
    const orderId = req.params.orderId.toUpperCase();
    const order = await db.get("SELECT * FROM orders WHERE UPPER(id) = ?", [orderId]);

    if (!order) {
      return res.status(404).json({ success: false, message: `Order #${orderId} not found.` });
    }

    let items = [];
    try {
      items = typeof order.items_json === "string" ? JSON.parse(order.items_json) : (order.items_json || []);
    } catch {
      items = [];
    }

    const subtotal = Number(order.subtotal);
    const mrpTotal = Number(order.mrp_total || subtotal);
    const discountTotal = Number(order.discount_total || (mrpTotal - subtotal));
    const deliveryFee = Number(order.delivery_fee || 0);
    const total = Number(order.total);

    // Approximate GST breakdown for books / stationery (Books are 0% or 5% GST in India, stationery 12%)
    const taxRate = 0.05;
    const taxableAmount = Math.round((subtotal / (1 + taxRate)) * 100) / 100;
    const cgst = Math.round(((subtotal - taxableAmount) / 2) * 100) / 100;
    const sgst = cgst;

    const invoiceData = {
      invoiceNo: order.invoice_no || `INV-2026-${order.id}`,
      orderId: order.id,
      orderDate: order.created_at,
      invoiceDate: order.created_at,
      status: order.status,
      paymentMethod: order.payment_method,
      seller: {
        name: "Success Book Hub Private Limited",
        tagline: "Premier Academic & Literary Books Store",
        address: "Plot 42, Book Hub Lane, Koti Market",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        gstin: "36AAACS1234F1Z8",
        pan: "AAACS1234F",
        email: "successboookhub@gmail.com",
        phone: "+91 98765 43210",
        website: "https://successbookhub.in"
      },
      buyer: {
        name: order.customer_name,
        phone: order.customer_phone,
        email: order.customer_email || "N/A",
        address: order.delivery_address,
        city: order.city,
        state: order.state || "Telangana",
        pincode: order.pincode,
        addressType: order.address_type || "Home"
      },
      items: items.map((item, index) => {
        const itemPrice = Number(item.price);
        const itemMrp = Number(item.mrp || item.oldPrice || itemPrice);
        const qty = Number(item.quantity) || 1;
        const lineTotal = itemPrice * qty;
        const lineMrp = itemMrp * qty;
        const lineDiscount = Math.max(0, lineMrp - lineTotal);

        return {
          srNo: index + 1,
          id: item.id,
          title: item.title,
          author: item.author || "Success Book Hub Publisher",
          hsn: "4901", // HSN Code for Printed Books
          quantity: qty,
          mrp: itemMrp,
          unitPrice: itemPrice,
          discount: lineDiscount,
          total: lineTotal
        };
      }),
      pricing: {
        mrpTotal,
        discountTotal,
        subtotal,
        taxableAmount,
        cgst,
        sgst,
        deliveryFee,
        total,
        totalInWords: numberToWords(total)
      }
    };

    res.json({
      success: true,
      data: invoiceData
    });
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
        invoiceNo: order.invoice_no || `INV-${order.id}`,
        customerName: order.customer_name,
        customerPhone: order.customer_phone,
        customerEmail: order.customer_email,
        deliveryAddress: order.delivery_address,
        city: order.city,
        state: order.state || "Telangana",
        pincode: order.pincode,
        addressType: order.address_type || "Home",
        items,
        mrpTotal: Number(order.mrp_total || order.subtotal),
        discountTotal: Number(order.discount_total || 0),
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

// PATCH cancel order (with stock restoration and customer authorization)
router.patch("/:orderId/cancel", optionalUserAuth, async (req, res) => {
  try {
    const orderId = req.params.orderId.toUpperCase();
    const order = await db.get("SELECT * FROM orders WHERE UPPER(id) = ?", [orderId]);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    // Verify ownership if requested by user
    if (req.user) {
      const isOwner = (order.customer_email && order.customer_email.toLowerCase() === req.user.email.toLowerCase()) ||
                      (order.user_id && order.user_id === req.user.id) ||
                      (req.user.role === "admin");
      if (!isOwner) {
        return res.status(403).json({ success: false, message: "You are not authorized to cancel this order." });
      }
    }

    const currentStatus = (order.status || "").toLowerCase();
    if (currentStatus === "cancelled") {
      return res.status(400).json({ success: false, message: "This order is already cancelled." });
    }

    if (currentStatus === "dispatched" || currentStatus === "delivered") {
      return res.status(400).json({
        success: false,
        message: `Orders with status '${order.status}' cannot be cancelled online. Please contact support.`
      });
    }

    // Parse items to restore stock
    let items = [];
    try {
      items = typeof order.items_json === "string" ? JSON.parse(order.items_json) : (order.items_json || []);
    } catch {
      items = [];
    }

    await db.transaction(async (tx) => {
      await tx.run("UPDATE orders SET status = 'cancelled' WHERE id = ?", [order.id]);

      // Restore stock in books table
      for (const item of items) {
        if (item.id) {
          const qty = parseInt(item.quantity) || 1;
          await tx.run("UPDATE books SET stock = stock + ? WHERE id = ?", [qty, item.id]);
        }
      }

      // Update payments table status if applicable
      try {
        await tx.run("UPDATE payments SET status = 'cancelled' WHERE order_id = ?", [order.id]);
      } catch {
        // ignore if payments table unavailable
      }
    });

    return res.json({
      success: true,
      message: `Order #${order.id} has been cancelled successfully. Any reserved stock has been restored.`,
      orderId: order.id,
      status: "cancelled"
    });
  } catch (err) {
    console.error("[Order Cancel Error]:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
