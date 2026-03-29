require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db/db");

require("./models/SensorData");
require("./models/Alerts");
require("./models/User");
require("./models/Wristband");

require("./services/mqttService");

const sensorRoutes = require("./routes/sensorRoutes");
const alertRoutes = require("./routes/alert.routes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend running" });
});

app.use("/api/sensor", sensorRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });