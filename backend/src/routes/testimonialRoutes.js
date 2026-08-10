const express = require("express");
const router = express.Router();
const { protect, optionalAuth, requireRole } = require("../middleware/authMiddleware");
const {
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

// Public route to fetch testimonials for home page and general view
router.get("/", optionalAuth, listTestimonials);

// Protected routes for Admins / SuperAdmins to manage testimonials
router.post("/", protect, requireRole("admin"), createTestimonial);
router.put("/:id", protect, requireRole("admin"), updateTestimonial);
router.delete("/:id", protect, requireRole("admin"), deleteTestimonial);

module.exports = router;
