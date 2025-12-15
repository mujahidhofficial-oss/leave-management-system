require("dotenv").config();
const bcrypt = require("bcrypt");
const connectDB = require("./config/db");
const User = require("./models/User");

const seedUsers = async () => {
  try {
    await connectDB();

    // clear old users (optional)
    await User.deleteMany({});

    const adminPassword = await bcrypt.hash("Admin@123", 10);
    const employeePassword = await bcrypt.hash("Employee@123", 10);

    const users = await User.create([
      {
        name: "Admin User",
        email: "admin@gamage.com",
        password: adminPassword,
        role: "admin",
      },
      {
        name: "Employee User",
        email: "employee@gamage.com",
        password: employeePassword,
        role: "employee",
      },
    ]);

    console.log("✅ Seed done. Users created:");
    console.log(users.map(u => ({ email: u.email, role: u.role })));

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
};

seedUsers();
