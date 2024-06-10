/**
 * @typedef {import("../middleware/Middleware")} Middleware
 * @typedef {import("../controller/AuthController")} AuthController
 */

const { Router } = require("express");

/**
 * Set the routes for authentication and authorization requests.
 * @param {Middleware} middleware - Middleware instance.
 * @param {AuthController} authCtrl - Auth controller instance.
 * @returns {Router} - The router instance.
 */
function setAuthRoutes(middleware, authCtrl) {
	const router = Router();

	router.use("/auth", router);

	router.post("/register", authCtrl.register);
	router.post("/login", authCtrl.login);
	router.delete("/logout", middleware.authenticate, authCtrl.logout);

	return router;
}

module.exports = {
	setAuthRoutes,
};
