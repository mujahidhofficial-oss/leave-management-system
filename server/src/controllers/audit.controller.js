const AuditLog = require("../models/AuditLog");

// (Admin) Get all audit logs
const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate("adminId", "name email role")
      .populate("leaveId")
      .sort({ createdAt: -1 });

    res.json({ logs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAuditLogs };
