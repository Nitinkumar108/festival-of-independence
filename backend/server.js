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
const clusterRoutes = require("./src/routes/clusterRoutes");
const contactRoutes = require("./src/routes/contactRoutes");
const testimonialRoutes = require("./src/routes/testimonialRoutes");
const { seedClustersAndColleges } = require("./src/controllers/collegeController");
const migrateClusterSchema = require("./src/utils/migrateClusterSchema");

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
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Basic rate limiting on auth endpoints to slow down brute-force attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { message: "Too many attempts. Please try again later." },
});
app.use("/api/auth", authLimiter);

// ----- Health & Keep-Alive Ping Endpoints for Cron Jobs -----
app.get("/", (req, res) => res.status(200).send("Festival of Independence API Server is Live 🚀"));
app.get("/health", (req, res) => res.status(200).json({ status: "ok", timestamp: new Date().toISOString() }));
app.get("/api/health", (req, res) => res.status(200).json({ status: "ok", timestamp: new Date().toISOString() }));
app.get("/api/ping", (req, res) => res.status(200).json({ message: "pong" }));

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/clusters", clusterRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/testimonials", testimonialRoutes);

// ----- Error handling (always last) -----
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    await migrateClusterSchema(); // Ensure clusters table & colleges columns exist in Postgres/SQLite
    await sequelize.sync({ alter: true });
    await seedClustersAndColleges(); // Seed 9 clusters + 54 colleges on every startup
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
