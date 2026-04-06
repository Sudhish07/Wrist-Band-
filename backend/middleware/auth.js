const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "wristband_secret_key"
    );
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};