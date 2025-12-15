const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const leaveRoutes = require("./routes/leave.routes");
const auditRoutes = require("./routes/audit.routes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/leaves", leaveRoutes);
app.use("/audit-logs", auditRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Leave Management API is running ✅" });
});

module.exports = app;
