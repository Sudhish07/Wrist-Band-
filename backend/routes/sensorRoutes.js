const express = require("express");
const router = express.Router();
const controller = require("../controllers/sensorController");

router.get("/latest",controller.getLatest);

router.post("/",controller.create);

module.exports = router;