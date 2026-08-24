const crypto = require("crypto");
const { College, Cluster } = require("../models");

// ─── Cluster → Colleges seed map ─────────────────────────────────────────────
// Exact 54 colleges as per the official cluster plan (image provided by admin)
const CLUSTER_COLLEGE_MAP = [
  {
    code: "CC1",
    facilitatorName: "Hariom Prabhu",
    colleges: [
      "NSHM Knowledge Campus",
      "Heritage Institute of Technology",
      "Surendranath College",
      "Bhawanipur Education Society College",
      "Heramba Chandra College",
      "Prafulla Chandra College",
      "Asutosh College",
      "SSKM Medical College (IPGMER)",
    ],
  },
  {
    code: "CC2",
    facilitatorName: "Yash Prabhu",
    colleges: [
      "THK Jain College",
      "Ananda Mohan College",
      "Goenka College of Commerce & Business Administration",
      "Shyambazar Law College",
      "City College",
    ],
  },
  {
    code: "CC3",
    facilitatorName: "Suvilas Nitai Chandra Prabhu",
    colleges: [
      "MCKV Institute of Engineering",
      "Swami Vivekananda College",
      "Scottish Church College",
      "South Calcutta Law College",
      "St. Thomas College of Engineering and Technology",
      "Indian Statistical Institute (ISI)",
      "Government College of Art & Craft",
      "Narula Institute of Technology",
    ],
  },
  {
    code: "CC4",
    facilitatorName: "Swamynath Prabhu",
    colleges: [
      "Umesh Chandra College",
      "City College of Commerce (Evening - Umesh Chandra Campus)",
      "Seth Anandram Jaipuria College",
      "Bangabasi College",
    ],
  },
  {
    code: "CC5",
    facilitatorName: "Arup Prabhu",
    colleges: [
      "Acharya Girish Chandra Bose College",
      "Chittaranjan College",
      "Sirish Chandra College",
      "Maharaja Manindra Chandra College",
      "Sir Gurudas Mahavidyalaya",
      "Shibpur Dinobundhoo Institution (College)",
      "Rabindra Bharati University",
    ],
  },
  {
    code: "CC6",
    facilitatorName: "Sadkirti Nityananda Prabhu",
    colleges: [
      "A.J.C. Bose College",
      "Charuchandra College",
      "Bengal Music College",
      "Jogesh Chandra Chaudhuri College",
      "Vijaygarh Jyotish Ray College",
      "Netaji Nagar College",
      "Sammilani Mahavidyalaya",
      "K.K. Das College",
      "Dinabandhu Andrews College",
      "Dr. Kanai Lal Bhattacharya College",
      "NRS Medical College (Nilratan Sircar)",
      "Presidency University",
    ],
  },
  {
    code: "CC7",
    facilitatorName: "Sandipan Prabhu",
    colleges: [
      "Behala College",
      "Rabin Mukherjee College",
      "Kishore Bharati Bhagini Nivedita College",
      "Vivekananda College (Thakurpukur)",
      "Shishuram Das College (Sarisha)",
      "Sarsuna College",
      "New Alipore College",
    ],
  },
  {
    code: "CC8",
    facilitatorName: "Adarsh Prabhu",
    colleges: [
      "Indian Institute of Engineering Science and Technology (IIEST), Shibpur",
    ],
  },
  {
    code: "CC9",
    facilitatorName: "Jay Prakash Prabhu",
    colleges: [
      "Brainware University",
      "Barasat Government College",
    ],
  },
];

// ─── Legacy / alternate college name aliases ─────────────────────────────────
// Maps OLD college names (from the previous DEFAULT_COLLEGES list that
// students already registered with) → to the correct cluster code.
// This ensures existing registrations are allocated to a cluster on first run.
const LEGACY_NAME_TO_CLUSTER_CODE = {
  // CC1
  "The Bhawanipur Education Society College": "CC1",
  "Bhawanipur Education Society": "CC1",
  "SSKM Medical College": "CC1",
  "IPGMER (Institute of Post Graduate Medical Education and Research / SSKM Hospital)": "CC1",
  "SSKM Hospital": "CC1",
  "Heritage Law College": "CC1", // approximate — Heritage is CC1 cluster area

  // CC2
  "Goenka College of Commerce & B.A.": "CC2",
  "Goenka College of Commerce and Business Administration": "CC2",

  // CC3
  "Swami Vivekananda College": "CC3",
  "South Calcutta Law College": "CC3",

  // CC4
  "Umeschandra College": "CC4",
  "Umesh Chandra College": "CC4",
  "City College of Commerce & B.A.": "CC4",
  "City College of Commerce and B.A.": "CC4",
  "Seth Anandram Jaipuria College": "CC4",
  "Jaipuria College": "CC4",

  // CC5
  "Maharaja Srischandra College": "CC5", // closest CC5 college geographically
  "Sirish Chandra College": "CC5",

  // CC6
  "Acharya Jagadish Chandra Bose College": "CC6", // A.J.C. Bose College = CC6
  "A.J.C. Bose College": "CC6",
  "Jogesh Chandra Chaudhuri College": "CC6",
  "Dr. Kanailal Bhattacharyya College": "CC6",
  "Dr. Kanai Lal Bhattacharya College": "CC6",
  "Nilratan Sircar (NRS) Medical College and Hospital": "CC6",
  "NRS Medical College": "CC6",

  // CC7
  "Shishuram Das College": "CC7",
  "Shishuram Das College (Sarisha)": "CC7",
  "Vivekananda College (Thakurpukur)": "CC7",

  // CC8
  "IIEST Shibpur": "CC8",
  "Indian Institute of Engineering Science and Technology, Shibpur": "CC8",
};

// ─── Seed function: run once on startup ──────────────────────────────────────
async function seedClustersAndColleges() {
  try {
    // ── Pass 1: Upsert the 9 clusters and their 54 canonical colleges ─────────
    for (const clusterData of CLUSTER_COLLEGE_MAP) {
      // 1a. Upsert cluster record
      const [cluster] = await Cluster.findOrCreate({
        where: { code: clusterData.code },
        defaults: {
          facilitatorName: clusterData.facilitatorName,
          accessToken: crypto.randomBytes(32).toString("hex"),
        },
      });

      // Update facilitator name if it changed
      if (cluster.facilitatorName !== clusterData.facilitatorName) {
        cluster.facilitatorName = clusterData.facilitatorName;
        await cluster.save();
      }

      // 1b. Upsert each canonical college and assign to this cluster
      for (const collegeName of clusterData.colleges) {
        const [college, created] = await College.findOrCreate({
          where: { name: collegeName },
          defaults: {
            name: collegeName,
            clusterId: cluster.id,
            isPending: false,
          },
        });

        // If the college already existed but had no cluster, assign it now
        if (!created && !college.clusterId) {
          college.clusterId = cluster.id;
          college.isPending = false;
          await college.save();
        }
      }
    }

    // ── Pass 2: Remap legacy / alternate college names from existing DB rows ──
    // Handles students who registered before this feature using the old name list.
    let legacyUpdated = 0;
    for (const [legacyName, clusterCode] of Object.entries(LEGACY_NAME_TO_CLUSTER_CODE)) {
      const cluster = await Cluster.findOne({ where: { code: clusterCode } });
      if (!cluster) continue;

      // Find any existing college with this legacy name that has no cluster yet
      const college = await College.findOne({ where: { name: legacyName } });
      if (college && !college.clusterId) {
        college.clusterId = cluster.id;
        college.isPending = false;
        await college.save();
        legacyUpdated++;
      }
    }

    console.log(`✅ Clusters and colleges seeded/verified successfully. (${legacyUpdated} legacy college names remapped)`);
  } catch (err) {
    console.error("❌ Failed to seed clusters and colleges:", err.message);
  }
}

// ─── Route Handlers ───────────────────────────────────────────────────────────

/** GET /api/colleges — public, powers the registration dropdown
 *  Returns only non-pending colleges, ordered alphabetically.
 */
async function listColleges(req, res, next) {
  try {
    const colleges = await College.findAll({
      where: { isPending: false },
      attributes: ["id", "name", "clusterId"],
      order: [["name", "ASC"]],
    });
    res.json(colleges);
  } catch (err) {
    next(err);
  }
}

/** POST /api/colleges — admin only: manually add a college */
async function addCollege(req, res, next) {
  try {
    const { name, clusterId } = req.body;
    if (!name) return res.status(400).json({ message: "College name is required." });
    const [college, created] = await College.findOrCreate({
      where: { name },
      defaults: { name, clusterId: clusterId || null, isPending: false },
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

module.exports = {
  listColleges,
  addCollege,
  deleteCollege,
  seedClustersAndColleges,
  CLUSTER_COLLEGE_MAP,
};
