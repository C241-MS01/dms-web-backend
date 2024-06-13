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

	router.post("/vehicles", middleware.authenticate, vehicleCtrl.createVehicle);
	router.get(
		"/vehicles/:id",
		middleware.authenticate,
		vehicleCtrl.getVehicleById,
	);
	router.get("/vehicles", middleware.authenticate, vehicleCtrl.getVehicles);
	router.put(
		"/vehicles/:id",
		middleware.authenticate,
		vehicleCtrl.updateVehicle,
	);
	router.delete(
		"/vehicles/:id",
		middleware.authenticate,
		vehicleCtrl.deleteVehicle,
	);

	return router;
}

module.exports = {
	setVehicleRoutes,
};
