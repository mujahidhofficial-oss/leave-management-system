const Leave = require("../models/Leave");
const AuditLog = require("../models/AuditLog");

// Helper: calculate total days (inclusive)
const calculateTotalDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // remove time part (avoid timezone issues)
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffMs = end - start;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1; // inclusive
  return diffDays;
};

// (Employee) Create leave request
const createLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;

    if (!startDate || !endDate || !reason) {
      return res
        .status(400)
        .json({ message: "startDate, endDate, reason are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return res
        .status(400)
        .json({ message: "End Date cannot be before Start Date" });
    }

    const totalDays = calculateTotalDays(startDate, endDate);

    const leave = await Leave.create({
      employeeId: req.user.id,
      startDate,
      endDate,
      reason,
      totalDays,
      status: "Pending",
    });

    res.status(201).json({ message: "Leave request created", leave });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// (Employee) Get my leaves
const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ leaves });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// (Admin) Get all leaves
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employeeId", "name email role")
      .sort({ createdAt: -1 });

    res.json({ leaves });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// (Admin) Update leave status + Audit Log
const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: 'Status must be "Approved" or "Rejected"' });
    }

    const updated = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("employeeId", "name email");

    if (!updated) {
      return res.status(404).json({ message: "Leave not found" });
    }

    // ✅ Audit Log entry
    await AuditLog.create({
      adminId: req.user.id,
      leaveId: updated._id,
      action: status,
      message: `Admin ${req.user.id} ${status.toLowerCase()} leave ${updated._id}`,
    });

    res.json({ message: "Leave status updated", leave: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
};
