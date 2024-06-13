/**
 * @typedef {import('../middleware/Middleware')} Middleware
 * @typedef {import('../controller/VehicleController')} VehicleController
 */

const { Router } = require("express");

/**
 * Set the routes for vehicle-related requests.
 * @param {Middleware} middleware - Middleware instance.
 * @param {VehicleController} vehicleCtrl - Vehicle controller instance.
 * @returns {Router} - The router instance.
 */
function setVehicleRoutes(middleware, vehicleCtrl) {
	const router = Router();

	router.use("/vehicles", router);

	router.get("/", middleware.authenticate, vehicleCtrl.listVehicles);
	router.get("/:vehicle_id", middleware.authenticate, vehicleCtrl.getVehicle);

	return router;
}

module.exports = setVehicleRoutes;
