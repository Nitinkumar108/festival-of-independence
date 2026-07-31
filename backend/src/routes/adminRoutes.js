const express = require("express");
const router = express.Router();
const { protect, requireRole } = require("../middleware/authMiddleware");
const {
  listStudents,
  deleteStudent,
  exportStudents,
  listPayments,
  createNotification,
  listNotifications,
  deleteNotification,
  listAdmins,
  createAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

router.use(protect, requireRole("admin"));

router.get("/students", listStudents);
router.delete("/students/:id", deleteStudent);
router.get("/students/export", exportStudents);
router.get("/payments", listPayments);

router.get("/notifications", listNotifications);
router.post("/notifications", createNotification);
router.delete("/notifications/:id", deleteNotification);

router.get("/team", listAdmins);
router.post("/team", createAdmin);
router.delete("/team/:id", deleteAdmin);

module.exports = router;
