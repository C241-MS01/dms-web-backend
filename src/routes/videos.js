/**
 * @typedef {import('../middleware/Middleware')} Middleware
 * @typedef {import('../controller/VideoController')} VideoController
 */

const { Router } = require("express");

/**
 * Set the routes for video-related requests.
 * @param {Middleware} middleware - Middleware instance.
 * @param {VideoController} videoCtrl - Video controller instance.
 * @returns {Router} - The router instance.
 */
function setVideoRoutes(middleware, videoCtrl) {
	const router = Router();

	router.use("/vehicles", router);

	router.get(
		"/:vehicle_id/videos",
		middleware.authenticate,
		videoCtrl.listVideos,
	);
	router.get(
		"/:vehicle_id/videos/:video_id",
		middleware.authenticate,
		videoCtrl.getVideo,
	);

	return router;
}

module.exports = setVideoRoutes;
