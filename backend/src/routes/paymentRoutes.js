const express = require("express");
const router = express.Router();
const { protect, requireRole } = require("../middleware/authMiddleware");
const { createOrder, verifyPayment, razorpayWebhook } = require("../controllers/paymentController");

// Webhook is public (Razorpay calls it directly) but signature-verified inside the controller.
router.post("/webhook", razorpayWebhook);

// Everything else requires a logged-in student.
router.post("/create-order", protect, requireRole("student"), createOrder);
router.post("/verify", protect, requireRole("student"), verifyPayment);

module.exports = router;
