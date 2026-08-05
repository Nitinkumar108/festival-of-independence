const crypto = require("crypto");

// Razorpay disabled temporarily. To re-enable, uncomment Razorpay require and instance initialization below:
// const Razorpay = require("razorpay");
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder_id",
//   key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
// });

const { Payment, Student } = require("../models");

/**
 * POST /api/payments/create-order
 * Student must be logged in (protect + requireRole("student")).
 * Creates a Razorpay order for the registration fee (or a donation amount).
 * (Currently disabled - code preserved in template below)
 */
async function createOrder(req, res, next) {
  try {
    return res.status(200).json({
      message: "Razorpay payments are currently disabled.",
      disabled: true,
    });

    /* TEMPLATE FOR RAZORPAY CREATE ORDER:
    const { paymentType = "RegistrationFee", amount } = req.body;

    const amountInPaise =
      paymentType === "Donation"
        ? Math.round(Number(amount) * 100)
        : Math.round(Number(process.env.REGISTRATION_FEE_INR) * 100);

    if (!amountInPaise || amountInPaise <= 0) {
      return res.status(400).json({ message: "Invalid amount." });
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${req.user.id}_${Date.now()}`,
    });

    await Payment.create({
      studentId: req.user.id,
      razorpayOrderId: order.id,
      amount: amountInPaise / 100,
      status: "Created",
      paymentType,
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
    */
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/payments/verify
 * Called by the frontend right after Razorpay Checkout succeeds.
 * (Currently disabled - code preserved in template below)
 */
async function verifyPayment(req, res, next) {
  try {
    return res.status(200).json({
      message: "Razorpay payment verification is currently disabled.",
      disabled: true,
    });

    /* TEMPLATE FOR RAZORPAY VERIFY PAYMENT:
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed." });
    }

    const payment = await Payment.findOne({ where: { razorpayOrderId: razorpay_order_id } });
    if (!payment) return res.status(404).json({ message: "Payment record not found." });

    await payment.update({ razorpayPaymentId: razorpay_payment_id, status: "Success" });

    if (payment.paymentType === "RegistrationFee") {
      await Student.update({ paymentStatus: "Paid" }, { where: { id: payment.studentId } });
    }

    res.json({ message: "Payment verified successfully." });
    */
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/payments/webhook
 * Configure this exact URL in the Razorpay Dashboard.
 * (Currently disabled - code preserved in template below)
 */
async function razorpayWebhook(req, res, next) {
  try {
    return res.status(200).json({ received: true, disabled: true });

    /* TEMPLATE FOR RAZORPAY WEBHOOK:
    const signature = req.headers["x-razorpay-signature"];
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(req.body) // raw buffer
      .digest("hex");

    if (signature !== expected) {
      return res.status(400).json({ message: "Invalid webhook signature." });
    }

    const event = JSON.parse(req.body.toString());

    if (event.event === "payment.captured") {
      const orderId = event.payload.payment.entity.order_id;
      const paymentId = event.payload.payment.entity.id;

      const payment = await Payment.findOne({ where: { razorpayOrderId: orderId } });
      if (payment && payment.status !== "Success") {
        await payment.update({ razorpayPaymentId: paymentId, status: "Success" });
        if (payment.paymentType === "RegistrationFee") {
          await Student.update({ paymentStatus: "Paid" }, { where: { id: payment.studentId } });
        }
      }
    }

    res.json({ received: true });
    */
  } catch (err) {
    next(err);
  }
}

module.exports = { createOrder, verifyPayment, razorpayWebhook };
