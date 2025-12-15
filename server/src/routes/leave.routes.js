const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const {
  createLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
} = require("../controllers/leave.controller");

// Employee routes
router.post("/", authMiddleware, roleMiddleware(["employee"]), createLeave);
router.get("/my-leaves", authMiddleware, roleMiddleware(["employee"]), getMyLeaves);

// Admin routes
router.get("/all", authMiddleware, roleMiddleware(["admin"]), getAllLeaves);
router.put("/:id/status", authMiddleware, roleMiddleware(["admin"]), updateLeaveStatus);

module.exports = router;
