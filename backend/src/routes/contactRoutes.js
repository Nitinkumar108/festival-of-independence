const express = require("express");
const router = express.Router();
const { protect, requireRole } = require("../middleware/authMiddleware");
const {
  submitMessage,
  listMessages,
  updateMessageStatus,
} = require("../controllers/contactController");

router.post("/", submitMessage); // public

router.get("/", protect, requireRole("admin"), listMessages);
router.put("/:id/status", protect, requireRole("admin"), updateMessageStatus);

module.exports = router;
