const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    leaveId: { type: mongoose.Schema.Types.ObjectId, ref: "Leave", required: true },
    action: { type: String, enum: ["Approved", "Rejected"], required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
