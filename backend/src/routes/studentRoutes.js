const express = require("express");
const router = express.Router();
const { protect, requireRole } = require("../middleware/authMiddleware");
const {
  getMyProfile,
  updateMyProfile,
  getMySchedule,
  getMyPayments,
  getMyNotifications,
  getMyRegisteredEvents,
} = require("../controllers/studentController");

router.use(protect, requireRole("student"));

router.get("/me", getMyProfile);
router.put("/me", updateMyProfile);
router.get("/me/schedule", getMySchedule);
router.get("/me/payments", getMyPayments);
router.get("/me/notifications", getMyNotifications);
router.get("/me/registered-events", getMyRegisteredEvents);

module.exports = router;
