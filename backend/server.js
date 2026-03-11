const express = require("express");
const cors = require("cors");

const sequelize = require("./db/db");
const sensorRoutes = require("./routes/sensorRoutes");
const alertRoutes = require("./routes/alert.routes")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/sensor",sensorRoutes);
app.use("/api", alertRoutes);

sequelize.sync().then(()=>{

console.log("Database connected");

app.listen(5000,()=>{
console.log("Server running on port 5000");
});

});