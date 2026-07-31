const { College } = require("../models");

/** GET /api/colleges — public, powers the registration dropdown */
async function listColleges(req, res, next) {
  try {
    const colleges = await College.findAll({ order: [["name", "ASC"]] });
    res.json(colleges);
  } catch (err) {
    next(err);
  }
}

/** POST /api/colleges — admin only */
async function addCollege(req, res, next) {
  try {
    const { name, city, state } = req.body;
    if (!name) return res.status(400).json({ message: "College name is required." });
    const [college, created] = await College.findOrCreate({
      where: { name },
      defaults: { city, state },
    });
    if (!created) {
      return res.status(409).json({ message: "A college with this name already exists." });
    }
    res.status(201).json(college);
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/colleges/:id — admin only */
async function deleteCollege(req, res, next) {
  try {
    const college = await College.findByPk(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found." });
    await college.destroy();
    res.json({ message: "College deleted." });
  } catch (err) {
    next(err);
  }
}

module.exports = { listColleges, addCollege, deleteCollege };
