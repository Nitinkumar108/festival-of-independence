const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { Student, Admin, OtpVerification, College } = require("../models");
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
    const { fullName, collegeId, customCollegeName, gender, phoneNumber, address, email, username, password } = req.body;

    if (!fullName || (!collegeId && !customCollegeName) || !phoneNumber || !address || !email || !username || !password) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    // 1. Legal Email Syntax Validation (RFC 5322 compliant regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const normalizedEmail = email.trim().toLowerCase();
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: "Please provide a valid and legal email address (e.g. name@example.com)." });
    }

    // 2. Check if email is already registered in the system
    const existingStudentByEmail = await Student.findOne({ where: { email: normalizedEmail } });
    if (existingStudentByEmail) {
      return res.status(400).json({ message: "An account with this email is already registered. Please log in instead." });
    }

    // 3. Check if username is already taken
    const existingStudentByUsername = await Student.findOne({ where: { username: username.trim() } });
    if (existingStudentByUsername) {
      return res.status(400).json({ message: "This username is already taken. Please choose a different username." });
    }

    // Resolve College: If customCollegeName is provided, find or create the college in DB
    let finalCollegeId = collegeId;
    if (customCollegeName && customCollegeName.trim().length > 0) {
      const trimmedName = customCollegeName.trim();
      const [customCollege] = await College.findOrCreate({
        where: { name: trimmedName },
        defaults: { name: trimmedName },
      });
      finalCollegeId = customCollege.id;
    } else if (collegeId) {
      // If collegeId is a college name string rather than a UUID, find or create it
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(collegeId);
      if (!isUuid) {
        const [cByName] = await College.findOrCreate({
          where: { name: collegeId },
          defaults: { name: collegeId },
        });
        finalCollegeId = cByName.id;
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const student = await Student.create({
      fullName: fullName.trim(),
      gender: gender || null,
      collegeId: finalCollegeId,
      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
      email: normalizedEmail,
      username: username.trim(),
      passwordHash,
    });

    const token = generateToken({ id: student.id, role: "student" });
    res.status(201).json({
      token,
      student: { id: student.id, fullName: student.fullName, email: student.email, gender: student.gender },
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

    // Direct login for both SuperAdmin and VolunteerAdmin (2FA OTP verification disabled)
    const token = generateToken({ id: admin.id, role: "admin", adminRole: admin.role });
    return res.json({
      requireOtp: false,
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    next(err);
  }
}

/** POST /api/auth/admin/verify-otp */
async function verifyAdminOtp(req, res, next) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP code are required." });
    }

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(404).json({ message: "Admin account not found." });

    const record = await OtpVerification.findOne({
      where: {
        target: email,
        type: "email",
        code: otp,
        expiresAt: { [Op.gt]: new Date() },
      },
    });

    if (!record) {
      return res.status(400).json({ message: "Invalid or expired OTP code." });
    }

    record.isVerified = true;
    await record.save();

    const token = generateToken({ id: admin.id, role: "admin", adminRole: admin.role });
    res.json({
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    });
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
  verifyAdminOtp,
  forgotPassword,
  resetPassword,
};
