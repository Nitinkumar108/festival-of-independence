require("dotenv").config();
const express = require("express");
// Server configuration entry point for IYF Kolkata
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const { sequelize } = require("./src/models");
const errorMiddleware = require("./src/middleware/errorMiddleware");

const authRoutes = require("./src/routes/authRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const collegeRoutes = require("./src/routes/collegeRoutes");
const contactRoutes = require("./src/routes/contactRoutes");

const app = express();

// ----- Core middleware -----
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((url) => url.trim().replace(/\/$/, ""))
  : "*";

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins === "*") return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(cleanOrigin)) {
        return callback(null, true);
      }
      return callback(null, true); // Allow origin fallback or match
    },
    credentials: true,
  })
);

// Razorpay webhook needs the RAW body to verify the signature,
// so it is mounted separately BEFORE express.json().
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));
app.use(express.json());

// Basic rate limiting on auth endpoints to slow down brute-force attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { message: "Too many attempts. Please try again later." },
});
app.use("/api/auth", authLimiter);

// ----- Routes -----
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/contact", contactRoutes);

// ----- Error handling (always last) -----
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    // In production, prefer migrations. { alter: true } is convenient for early development only.
    await sequelize.sync({ alter: process.env.NODE_ENV !== "production" });
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
