const express = require("express");
const router = express.Router();
const alertController = require("../controller/alerts");

router.get("/all", alertController.getAlerts);
router.get("/recent", alertController.getRecentAlerts);
router.get("/:id", alertController.getAlertDetails);

module.exports = router;
