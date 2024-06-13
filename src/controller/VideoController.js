/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {import('../service/VideoService')} VideoService
 * @typedef {import('../validator/VideoValidator')} VideoValidator
 * @typedef {import('../logger/Logger')} Logger
 */

const autoBind = require("auto-bind");

/**
 * Controller for handling video-related operations.
 * @class
 */
class VideoController {
	/** @type {VideoService} */
	#service;
	/** @type {VideoValidator} */
	#validator;

	/**
	 * Creates a new VideoController instance.
	 * @param {VideoService} service - The video service instance.
	 * @param {VideoValidator} validator - The video validator instance.
	 */
	constructor(service, validator) {
		this.#service = service;
		this.#validator = validator;

		autoBind(this);
	}

	/**
	 * list all videos.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @param {NextFunction} next - The next function.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async listVideos(req, res, next) {
		try {
			const query = {
				limit: req.query.limit
					? parseInt(req.query.limit.toString(), 10)
					: undefined,
				offset: req.query.offset
					? parseInt(req.query.offset.toString(), 10)
					: undefined,
			};

			this.#validator.validateListVideosQuery(query);
			this.#validator.validateListVideosParams({
				vehicle_id: req.params.vehicle_id,
			});

			const data = await this.#service.listVideos(req.params.vehicle_id, query);

			return res.status(200).json({
				status: "success",
				data: data,
			});
		} catch (e) {
			next(e);
		}
	}

	/**
	 * Get a video by ID.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @param {NextFunction} next - The next function.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async getVideo(req, res, next) {
		try {
			this.#validator.validateGetDeleteVideoParams({
				vehicle_id: req.params.vehicle_id,
				video_id: req.params.video_id,
			});

			const videos = await this.#service.getVideoByUuid(
				req.params.vehicle_id,
				req.params.video_id,
			);

			return res.status(200).json({
				status: "success",
				data: videos,
			});
		} catch (e) {
			next(e);
		}
	}
}

module.exports = VideoController;
