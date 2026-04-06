const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role", "created_at"],
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ message: "Admin user cannot be deleted" });
    }

    await user.destroy();

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};