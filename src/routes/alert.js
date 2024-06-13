/**
 * @typedef {import("../middleware/Middleware")} Middleware
 * @typedef {import("../controller/AlertsController")} AlertController
 */

const { Router } = require("express");

/**
 * Set the routes for alert operations.
 * @param {Middleware} middleware - Middleware instance.
 * @param {AlertController} alertCtrl - Alert controller instance.
 * @returns {Router} - The router instance.
 */
function setAlertRoutes(middleware, alertCtrl) {
	const router = Router();

	router.use("/vehicles", router);

	router.get(
		"/:vehicle_id/videos/:video_id/alerts",
		middleware.authenticate,
		alertCtrl.listAlerts,
	);
	router.get(
		"/:vehicle_id/videos/:video_id/alerts/:alert_id",
		middleware.authenticate,
		alertCtrl.getAlert,
	);

	return router;
}

module.exports = setAlertRoutes;
