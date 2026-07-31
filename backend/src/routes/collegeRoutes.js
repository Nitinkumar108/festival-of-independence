const express = require("express");
const router = express.Router();
const { protect, requireRole } = require("../middleware/authMiddleware");
const { listColleges, addCollege, deleteCollege } = require("../controllers/collegeController");

router.get("/", listColleges); // public, used by the registration dropdown
router.post("/", protect, requireRole("admin"), addCollege);
router.delete("/:id", protect, requireRole("admin"), deleteCollege);

module.exports = router;
