const express = require("express")
const router = express.Router()

const alertController = require("../controllers/alert.controller")

// create alert
router.post("/alerts", alertController.createAlert)

// get alerts
router.get("/alerts", alertController.getAlerts)

module.exports = router
