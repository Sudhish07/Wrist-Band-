const express = require("express");
const router = express.Router();
const alertController = require("../controllers/alert.controller");
const auth = require("../middleware/auth");

// ✅ Protected routes
router.get("/", auth, alertController.getAlerts);
router.post("/", auth, alertController.createAlert);
router.get("/download", auth, alertController.downloadAlerts);

module.exports = router;