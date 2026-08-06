const { College } = require("../models");

const DEFAULT_COLLEGES = [
  // 40 Calcutta University affiliated colleges
  "Umeschandra College",
  "Vidyasagar College",
  "City College",
  "Ananda Mohan College",
  "City College of Commerce & B.A.",
  "Chittaranjan College",
  "Surendranath College",
  "Bangabasi College",
  "Acharya Girish Chandra Bose College",
  "Goenka College of Commerce & B.A.",
  "Scottish Church College",
  "Seth Anandram Jaipuria College",
  "Maharaja Manindra Chandra College",
  "Maharaja Srischandra College",
  "Shyambazar Law College",
  "Sir Gurudas Mahavidyalaya",
  "Government College of Art & Craft",
  "Acharya Jagadish Chandra Bose College",
  "The Bhawanipur Education Society College",
  "Asutosh College",
  "Charuchandra College",
  "Heramba Chandra College",
  "Prafulla Chandra College",
  "Bengal Music College",
  "Jogesh Chandra Chaudhuri College",
  "Vijaygarh Jyotish Ray College",
  "Netaji Nagar College",
  "Sammilani Mahavidyalaya",
  "K.K. Das College",
  "Dinabandhu Andrews College",
  "Baruipur College",
  "Behala College",
  "Rabin Mukherjee College",
  "Kishore Bharati Bhagini Nivedita College",
  "Vivekananda College (Thakurpukur)",
  "Shishuram Das College",
  "Sarsuna College",
  "New Alipore College",
  "Shibpur Dinobundhoo Institution (College)",
  "Dr. Kanailal Bhattacharyya College",

  // Medical Colleges
  "Calcutta Medical College",
  "IPGMER (Institute of Post Graduate Medical Education and Research / SSKM Hospital)",
  "Nilratan Sircar (NRS) Medical College and Hospital",
  "R.G. Kar Medical College and Hospital",
  "Calcutta National Medical College and Hospital (CNMC)",

  // Universities & Other Colleges
  "Indian Statistical Institute (ISI)",
  "Indian Institute of Engineering Science and Technology (IIEST), Shibpur",
  "Rabindra Bharati University",
  "Jadavpur University",
  "Brainware University",
  "Adamas University",
  "Presidency University",
  "Other college under Calcutta University",
  "Other Colleges / Universities",
];

/** GET /api/colleges — public, powers the registration dropdown */
async function listColleges(req, res, next) {
  try {
    // Seed any missing default colleges
    for (const name of DEFAULT_COLLEGES) {
      await College.findOrCreate({ where: { name } });
    }
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

module.exports = { listColleges, addCollege, deleteCollege, DEFAULT_COLLEGES };

