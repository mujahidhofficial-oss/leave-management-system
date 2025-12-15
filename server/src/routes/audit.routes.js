const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const { getAuditLogs } = require("../controllers/audit.controller");

// Admin only
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAuditLogs
);

module.exports = router;
