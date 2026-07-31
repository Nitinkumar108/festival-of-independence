const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { Student, Admin, OtpVerification } = require("../models");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const { Op } = require("sequelize");

/** POST /api/auth/send-otp */
async function sendOtp(req, res, next) {
  try {
    const { type, target } = req.body;
    if (!type || !target || !["email", "phone"].includes(type)) {
      return res.status(400).json({ message: "Valid type ('email' or 'phone') and target are required." });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete older OTP entries for this target & type
    await OtpVerification.destroy({ where: { target, type } });

    await OtpVerification.create({
      target,
      code,
      type,
      expiresAt,
      isVerified: false,
    });

    if (type === "email") {
      await sendEmail({
        to: target,
        subject: "Your OTP Verification Code - Festival of Independence",
        text: `Your OTP code for verification is: ${code}. It will expire in 10 minutes.`,
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #1E293B;">Festival of Independence</h2>
            <p>Your OTP verification code is:</p>
            <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #4F46E5; margin: 20px 0;">${code}</div>
            <p style="font-size: 13px; color: #64748B;">This code will expire in 10 minutes. Do not share this OTP with anyone.</p>
          </div>
        `,
      });
      console.log(`[EMAIL OTP DISPATCH] Target: ${target} Code: ${code}`);
    } else {
      console.log(`\n======================================================================`);
      console.log(`📱 [SMS PHONE OTP DISPATCH] Target Phone: ${target} | Code: ${code}`);
      console.log(`======================================================================\n`);
    }

    res.json({ message: `OTP code sent successfully to ${target}.`, devOtp: process.env.NODE_ENV !== "production" ? code : undefined });
  } catch (err) {
    next(err);
  }
}

/** POST /api/auth/verify-otp */
async function verifyOtp(req, res, next) {
  try {
    const { type, target, code } = req.body;
    if (!type || !target || !code) {
      return res.status(400).json({ message: "Type, target, and code are required." });
    }

    const record = await OtpVerification.findOne({
      where: {
        target,
        type,
        code,
        expiresAt: { [Op.gt]: new Date() },
      },
    });

    if (!record) {
      return res.status(400).json({ message: "Invalid or expired OTP code." });
    }

    record.isVerified = true;
    await record.save();

    res.json({ message: `${type === "email" ? "Email" : "Phone number"} verified successfully!`, verified: true });
  } catch (err) {
    next(err);
  }
}

/** POST /api/auth/student/register */
async function registerStudent(req, res, next) {
  try {
    const { fullName, collegeId, phoneNumber, address, email, username, password } = req.body;

    if (!fullName || !collegeId || !phoneNumber || !address || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Verify Email OTP status (Mobile verification disabled as requested)
    const emailOtp = await OtpVerification.findOne({
      where: { target: email, type: "email", isVerified: true },
    });

    if (!emailOtp) {
      return res.status(400).json({ message: "Email has not been verified via OTP yet." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const student = await Student.create({
      fullName,
      collegeId,
      phoneNumber,
      address,
      email,
      username,
      passwordHash,
    });

    const token = generateToken({ id: student.id, role: "student" });
    res.status(201).json({
      token,
      student: { id: student.id, fullName: student.fullName, email: student.email },
    });
  } catch (err) {
    next(err);
  }
}

/** POST /api/auth/student/login  (body: { identifier, password } — identifier = username or email) */
async function loginStudent(req, res, next) {
  try {
    const { identifier, password } = req.body;

    const student = await Student.findOne({
      where: { [Op.or]: [{ username: identifier }, { email: identifier }] },
    });
    if (!student) return res.status(401).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, student.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

    const token = generateToken({ id: student.id, role: "student" });
    res.json({
      token,
      student: {
        id: student.id,
        fullName: student.fullName,
        email: student.email,
        paymentStatus: student.paymentStatus,
      },
    });
  } catch (err) {
    next(err);
  }
}

/** POST /api/auth/admin/login */
async function loginAdmin(req, res, next) {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(401).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

    const token = generateToken({ id: admin.id, role: "admin" });
    res.json({ token, admin: { id: admin.id, name: admin.name, email: admin.email } });
  } catch (err) {
    next(err);
  }
}

/** POST /api/auth/forgot-password */
async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    let user = await Student.findOne({ where: { email } });
    if (!user) {
      user = await Admin.findOne({ where: { email } });
    }

    if (!user) {
      return res.status(200).json({
        message: "If that email is registered, a password reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    const resetUrl = `${clientUrl}/reset-password?token=${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request - Festival of Independence",
      text: `Click link to reset password: ${resetUrl}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Please click the button below to reset your password within 1 hour:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          <p style="word-break: break-all; color: #4F46E5;">${resetUrl}</p>
        </div>
      `,
    });

    res.status(200).json({
      message: "If that email is registered, a password reset link has been sent.",
    });
  } catch (err) {
    next(err);
  }
}

/** POST /api/auth/reset-password */
async function resetPassword(req, res, next) {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required." });
    }

    let user = await Student.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      user = await Admin.findOne({
        where: {
          resetPasswordToken: token,
          resetPasswordExpires: { [Op.gt]: new Date() },
        },
      });
    }

    if (!user) {
      return res.status(400).json({ message: "Password reset token is invalid or has expired." });
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully. You can now log in." });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  sendOtp,
  verifyOtp,
  registerStudent,
  loginStudent,
  loginAdmin,
  forgotPassword,
  resetPassword,
};
