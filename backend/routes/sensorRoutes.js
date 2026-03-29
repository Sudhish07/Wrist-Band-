const express = require("express");
const router = express.Router();
const controller = require("../controllers/sensorController"); // Make sure this path is correct

console.log("Setting up sensor routes...");

router.get("/latest", controller.getLatest);
console.log("- GET /latest route registered");

router.get("/history", controller.getHistory);
console.log("- GET /history route registered");

router.post("/", controller.create);
console.log("- POST / route registered");

module.exports = router;