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

	router.post("/alerts", middleware.authenticate, alertCtrl.createAlert);
	router.get("/alerts/recent", middleware.authenticate, alertCtrl.getAlerts);
	router.get("/alerts/search", middleware.authenticate, alertCtrl.searchAlert);
	router.get("/alerts/:id", middleware.authenticate, alertCtrl.getAlertById);
	router.put("/alerts/:id", middleware.authenticate, alertCtrl.updateAlert);
	router.delete("/alerts/:id", middleware.authenticate, alertCtrl.deleteAlert);

	return router;
}

module.exports = {
	setAlertRoutes,
};
