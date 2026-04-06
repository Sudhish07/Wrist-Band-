require("dotenv").config();
const bcrypt = require("bcryptjs");
const sequelize = require("./db/db");
const User = require("./models/User");

async function createAdmin() {
  try {
    await sequelize.authenticate();

    const email = "rajalakshmi@gmail.com";
    const plainPassword = "Rajee@123";

    const existingAdmin = await User.findOne({
      where: { email },
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:", error);
    process.exit(1);
  }
}

createAdmin();