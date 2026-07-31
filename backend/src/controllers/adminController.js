const bcrypt = require("bcryptjs");
const { Student, Admin, College, Payment, Notification, EventRegistration } = require("../models");
const exportToExcel = require("../utils/excelExport");

/** GET /api/admin/students?college=&paymentStatus=&search= */
async function listStudents(req, res, next) {
  try {
    const { college, paymentStatus, search } = req.query;
    const { Op } = require("sequelize");
    const where = {};

    if (paymentStatus) where.paymentStatus = paymentStatus;
    if (search) {
      where[Op.or] = [
        { fullName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { phoneNumber: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const students = await Student.findAll({
      where,
      attributes: { exclude: ["passwordHash"] },
      include: [
        {
          model: College,
          attributes: ["id", "name"],
          where: college ? { name: college } : undefined,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(students);
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/admin/students/:id — delete registered student account */
async function deleteStudent(req, res, next) {
  try {
    const studentId = req.params.id;
    const student = await Student.findByPk(studentId);
    if (!student) return res.status(404).json({ message: "Student account not found." });

    await Payment.destroy({ where: { studentId } });
    await EventRegistration.destroy({ where: { studentId } });
    await student.destroy();

    res.json({ message: "Student account deleted successfully." });
  } catch (err) {
    next(err);
  }
}

/** GET /api/admin/students/export — download filtered list as Excel */
async function exportStudents(req, res, next) {
  try {
    const students = await Student.findAll({
      attributes: { exclude: ["passwordHash"] },
      include: [{ model: College, attributes: ["name"] }],
      order: [["createdAt", "DESC"]],
    });

    const rows = students.map((s) => ({
      fullName: s.fullName,
      email: s.email,
      phoneNumber: s.phoneNumber,
      college: s.College ? s.College.name : "",
      paymentStatus: s.paymentStatus,
      registeredOn: s.createdAt.toISOString().slice(0, 10),
    }));

    await exportToExcel(res, {
      sheetName: "Registrations",
      fileName: "festival-of-independence-registrations.xlsx",
      columns: [
        { header: "Full Name", key: "fullName", width: 25 },
        { header: "Email", key: "email", width: 28 },
        { header: "Phone", key: "phoneNumber", width: 16 },
        { header: "College", key: "college", width: 28 },
        { header: "Payment Status", key: "paymentStatus", width: 16 },
        { header: "Registered On", key: "registeredOn", width: 16 },
      ],
      rows,
    });
  } catch (err) {
    next(err);
  }
}

/** GET /api/admin/payments */
async function listPayments(req, res, next) {
  try {
    const payments = await Payment.findAll({
      include: [{ model: Student, attributes: ["fullName", "email"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(payments);
  } catch (err) {
    next(err);
  }
}

/** POST /api/admin/notifications — broadcast notification to students */
async function createNotification(req, res, next) {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      return res.status(400).json({ message: "Title and message are required." });
    }
    const notification = await Notification.create({ title, message, targetRole: "student" });
    res.status(201).json(notification);
  } catch (err) {
    next(err);
  }
}

/** GET /api/admin/notifications */
async function listNotifications(req, res, next) {
  try {
    const notifications = await Notification.findAll({ order: [["createdAt", "DESC"]] });
    res.json(notifications);
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/admin/notifications/:id */
async function deleteNotification(req, res, next) {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found." });
    await notification.destroy();
    res.json({ message: "Notification deleted." });
  } catch (err) {
    next(err);
  }
}

/** GET /api/admin/team — list all admin team members */
async function listAdmins(req, res, next) {
  try {
    const admins = await Admin.findAll({
      attributes: { exclude: ["passwordHash"] },
      order: [["createdAt", "DESC"]],
    });
    res.json(admins);
  } catch (err) {
    next(err);
  }
}

/** POST /api/admin/team — add new admin account */
async function createAdmin(req, res, next) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const existing = await Admin.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "An admin with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      name,
      email,
      passwordHash,
      role: role || "VolunteerAdmin",
    });

    res.status(201).json({
      id: newAdmin.id,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
    });
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/admin/team/:id — delete admin account */
async function deleteAdmin(req, res, next) {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found." });

    if (admin.id === req.user.id) {
      return res.status(400).json({ message: "You cannot delete your own admin account while logged in." });
    }

    await admin.destroy();
    res.json({ message: "Admin account removed." });
  } catch (err) {
    next(err);
  }
}

module.exports = {
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
};
