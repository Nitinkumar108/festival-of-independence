const express = require("express");
const router = express.Router();
const {
  sendOtp,
  verifyOtp,
  registerStudent,
  loginStudent,
  loginAdmin,
  verifyAdminOtp,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/student/register", registerStudent);
router.post("/student/login", loginStudent);
router.post("/admin/login", loginAdmin);
router.post("/admin/verify-otp", verifyAdminOtp);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
