const express = require("express");
const router = express.Router();
const { protect, requireRole, requireSuperAdmin } = require("../middleware/authMiddleware");
const {
  listClusters,
  listPendingColleges,
  assignCollegeToCluster,
  exportClusterExcel,
  regenerateClusterToken,
  getClusterByToken,
  getClusterRegistrationsByToken,
  exportClusterExcelByToken,
  getGlobalViewInfo,
  getGlobalRegistrations,
  exportGlobalExcel,
  getGlobalToken,
  regenerateGlobalToken,
} = require("../controllers/clusterController");

// ── Public routes (token-gated, no JWT) ──────────────────────────────────────
// ORDER MATTERS: specific paths must come before /:id wildcard paths
router.get("/by-token", getClusterByToken);
router.get("/by-token/registrations", getClusterRegistrationsByToken);
router.get("/by-token/export", exportClusterExcelByToken);

// Global view (all clusters, public token-gated)
router.get("/global-view", getGlobalViewInfo);
router.get("/global-view/registrations", getGlobalRegistrations);
router.get("/global-view/export", exportGlobalExcel);

// ── Admin routes (JWT required) ───────────────────────────────────────────────
router.use(protect, requireRole("admin"));

router.get("/", listClusters);
router.get("/pending-colleges", listPendingColleges);
router.get("/global-token", getGlobalToken);
router.post("/global-token/rotate", requireSuperAdmin, regenerateGlobalToken);
router.get("/:id/export", exportClusterExcel);
router.put("/colleges/:id/assign", requireSuperAdmin, assignCollegeToCluster);
router.post("/:id/rotate-token", requireSuperAdmin, regenerateClusterToken);

module.exports = router;
