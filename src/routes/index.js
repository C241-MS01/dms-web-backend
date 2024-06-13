/**
 * @typedef {import("express").Express} Express
 * @typedef {import("../middleware/Middleware")} Middleware
 * @typedef {import("../controller/AlertsController")} AlertController
 * @typedef {import("../controller/AuthController")} AuthController
 * @typedef {import("../controller/VehicleController")} VehicleController
 * @typedef {import("../controller/VideoController")} VideoController
 */

const { Router } = require("express");
const setAlertRoutes = require("./alert");
const setAuthRoutes = require("./auth");
const setVehicleRoutes = require("./vehicles");
const setVideoRoutes = require("./videos");

/**
 * Set the routes for the application.
 * @param {Express} app - The express app instance.
 * @param {Middleware} middleware - The middleware instance.
 * @param {AlertController} alertCtrl - The alert controller instance.
 * @param {AuthController} authCtrl - The auth controller instance.
 * @param {VehicleController} vehicleCtrl - The vehicle controller instance.
 * @param {VideoController} videoCtrl - The video controller instance.
 */
function setRoutes(
	app,
	middleware,
	alertCtrl,
	authCtrl,
	vehicleCtrl,
	videoCtrl,
) {
	const v1 = Router();

	const authRouter = setAuthRoutes(middleware, authCtrl);
	const vehicleRouter = setVehicleRoutes(middleware, vehicleCtrl);
	const alertRouter = setAlertRoutes(middleware, alertCtrl);
	const videoRouter = setVideoRoutes(middleware, videoCtrl);

	v1.use("/v1", v1);

	v1.use(alertRouter);
	v1.use(authRouter);
	v1.use(vehicleRouter);
	v1.use(videoRouter);

	app.use("/api", v1);

	app.use(middleware.errorResponse);
}

module.exports = setRoutes;
