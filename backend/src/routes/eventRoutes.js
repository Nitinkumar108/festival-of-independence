const express = require("express");
const router = express.Router();
const { protect, optionalAuth, requireRole } = require("../middleware/authMiddleware");
const {
  listEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
  getEventAttendees,
} = require("../controllers/eventController");

router.get("/", optionalAuth, listEvents); // public with optional auth

router.post("/", protect, requireRole("admin"), createEvent);
router.put("/:id", protect, requireRole("admin"), updateEvent);
router.delete("/:id", protect, requireRole("admin"), deleteEvent);
router.get("/:id/registrations", protect, requireRole("admin"), getEventAttendees);

router.post("/:id/register", protect, requireRole("student"), registerForEvent);
router.delete("/:id/register", protect, requireRole("student"), unregisterFromEvent);

module.exports = router;
