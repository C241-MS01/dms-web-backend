/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('../service/VehicleService')} VehicleService
 * @typedef {import('../logger/Logger')} Logger
 */

const autoBind = require("auto-bind");
const ClientError = require("../exceptions/ClientError");

/**
 * Controller for handling vehicle-related operations.
 * @class
 */
class VehicleController {
	/** @type {VehicleService} */
	#service;
	/** @type {Logger} */
	#logger;

	/**
	 * Creates a new VehicleController instance.
	 * @param {VehicleService} service - The vehicle service instance.
	 * @param {import('./VehicleController').Logger} logger - The logger instance.
	 */
	constructor(service, logger) {
		this.#service = service;
		this.#logger = logger;

		autoBind(this);
	}

	/**
	 * Create a new vehicle.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async createVehicle(req, res) {
		try {
			const vehicle = await this.#service.createVehicle(req.body);

			const { id } = req.body;
			await this.#service.createVehicle({ id });

			return res.status(201).json({
				status: "success create vehicle",
				data: vehicle,
			});
		} catch (e) {
			if (e instanceof ClientError) {
				return res.status(e.statusCode).json({
					status: "failed",
					message: e.message,
				});
			}

			this.#logger.error(e.message);

			return res.status(500).json({
				status: "failed",
				message: "Internal server error",
			});
		}
	}

	/**
	 * Get a vehicle by ID.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async getVehicleById(req, res) {
		try {
			const vehicle = await this.#service.getVehicleById(req.params.id);

			return res.status(200).json({
				status: "success getVehicle byId",
				data: vehicle,
			});
		} catch (e) {
			if (e instanceof ClientError) {
				return res.status(e.statusCode).json({
					status: "failed",
					message: e.message,
				});
			}

			this.#logger.error(e.message);

			return res.status(500).json({
				status: "failed",
				message: "Internal server error",
			});
		}
	}

	/**
	 * Get all vehicles.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async getVehicles(req, res) {
		try {
			const vehicles = await this.#service.getVehicles();

			return res.status(200).json({
				status: "success getAllVehicle",
				data: vehicles,
			});
		} catch (e) {
			if (e instanceof ClientError) {
				return res.status(e.statusCode).json({
					status: "failed",
					message: e.message,
				});
			}

			this.#logger.error(e.message);

			return res.status(500).json({
				status: "failed",
				message: "Internal server error",
			});
		}
	}

	/**
	 * Update a vehicle.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async updateVehicle(req, res) {
		try {
			const vehicle = await this.#service.updateVehicle(
				req.params.id,
				req.body,
			);

			return res.status(200).json({
				status: "success update vehicle",
				data: vehicle,
			});
		} catch (e) {
			if (e instanceof ClientError) {
				return res.status(e.statusCode).json({
					status: "failed",
					message: e.message,
				});
			}

			this.#logger.error(e.message);

			return res.status(500).json({
				status: "failed",
				message: "Internal server error",
			});
		}
	}

	/**
	 * Delete a vehicle by ID.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async deleteVehicle(req, res) {
		try {
			const vehicle = await this.#service.deleteVehicle(req.params.id);

			return res.status(200).json({
				status: "success delete vehicle",
				data: vehicle,
			});
		} catch (e) {
			if (e instanceof ClientError) {
				return res.status(e.statusCode).json({
					status: "failed",
					message: e.message,
				});
			}

			this.#logger.error(e.message);

			return res.status(500).json({
				status: "failed",
				message: "Internal server error",
			});
		}
	}
}

module.exports = VehicleController;
