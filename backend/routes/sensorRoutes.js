const express = require("express");
const router = express.Router();
const controller = require("../controllers/sensorController");
const auth = require("../middleware/auth");

router.get("/latest", auth, controller.getLatest);
router.get("/history", auth, controller.getHistory);
router.post("/", auth, controller.create);

module.exports = router;