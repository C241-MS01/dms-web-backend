/**
 * @typedef {import("express").Express} Express
 * @typedef {import("../middleware/Middleware")} Middleware
 * @typedef {import("../controller/AuthController")} UserController
 */

const { Router } = require("express");
const { setAuthRoutes } = require("./auth");

/**
 * Set the routes for the application.
 * @param {Express} app - The express app instance.
 * @param {Middleware} middleware - The middleware instance.
 * @param {UserController} authCtrl - The auth controller instance.
 */
function setRoutes(app, middleware, authCtrl) {
	const v1 = Router();

	const userRouter = setAuthRoutes(middleware, authCtrl);

	v1.use("/v1", v1);

	v1.use(userRouter);

	app.use("/api", v1);
}

module.exports = setRoutes;
