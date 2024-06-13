/**
 * @typedef {import("express").Express} Express
 * @typedef {import("../middleware/Middleware")} Middleware
 * @typedef {import("../controller/AuthController")} UserController
 * @typedef {import("../controller/VehicleController")} VehicleController
 * @typedef {import("../controller/AlertsController")} AlertController
 * @typedef {import("../controller/AuthController")} AuthController
 */

const { Router } = require("express");
const { setAuthRoutes } = require("./auth");
const { setVehicleRoutes } = require("./vehicle");
const { setAlertRoutes } = require("./alert");

/**
 * Set the routes for the application.
 * @param {Express} app - The express app instance.
 * @param {Middleware} middleware - The middleware instance.
 * @param {UserController} authCtrl - The auth controller instance.
 * @param {VehicleController} vehicleCtrl - The vehicle controller instance.
 * @param {AlertController} alertCtrl - The alert controller instance.
 */
function setRoutes(app, middleware, authCtrl, vehicleCtrl, alertCtrl) {
	const v1 = Router();

	const userRouter = setAuthRoutes(middleware, authCtrl);
	const vehicleRouter = setVehicleRoutes(middleware, vehicleCtrl);
	const alertRouter = setAlertRoutes(middleware, alertCtrl);

	v1.use("/v1", v1);

	v1.use(userRouter);
	v1.use(vehicleRouter);
	v1.use(alertRouter);

	app.use("/api", v1);
}

module.exports = setRoutes;
