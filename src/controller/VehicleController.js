/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {import('../service/VehicleService')} VehicleService
 * @typedef {import('../validator/VehicleValidator')} VehicleValidator
 * @typedef {import('../logger/Logger')} Logger
 */

const autoBind = require("auto-bind");

/**
 * Controller for handling vehicle-related operations.
 * @class
 */
class VehicleController {
	/** @type {VehicleService} */
	#service;
	/** @type {VehicleValidator} */
	#validator;

	/**
	 * Creates a new VehicleController instance.
	 * @param {VehicleService} service - The vehicle service instance.
	 * @param {VehicleValidator} validator - The vehicle validator instance.
	 */
	constructor(service, validator) {
		this.#service = service;
		this.#validator = validator;

		autoBind(this);
	}

	/**
	 * list all vehicles.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @param {NextFunction} next - The next function.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async listVehicles(req, res, next) {
		try {
			const query = {
				limit: req.query.limit
					? parseInt(req.query.limit.toString(), 10)
					: undefined,
				offset: req.query.offset
					? parseInt(req.query.offset.toString(), 10)
					: undefined,
			};

			this.#validator.validateListVehiclesQuery(query);

			const data = await this.#service.listVehicles(query);

			return res.status(200).json({
				status: "success",
				data: data,
			});
		} catch (e) {
			next(e);
		}
	}

	/**
	 * Get a vehicle by ID.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @param {NextFunction} next - The next function.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async getVehicle(req, res, next) {
		try {
			this.#validator.validateGetDeleteVehicleParams({
				vehicle_id: req.params.vehicle_id,
			});

			const vehicles = await this.#service.getVehicleByUuid(
				req.params.vehicle_id,
			);

			return res.status(200).json({
				status: "success",
				data: vehicles,
			});
		} catch (e) {
			next(e);
		}
	}
}

module.exports = VehicleController;
