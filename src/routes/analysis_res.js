const express = require("express");
const router = express.Router();
const analysisController = require("../controller/analysis_res");

router.get("/all", analysisController.getAnalysisResults);
router.get("/:id", analysisController.getAnalysisResultById);

module.exports = router;
