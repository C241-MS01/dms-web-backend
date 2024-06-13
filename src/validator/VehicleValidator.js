const Joi = require("joi");
const ValidationError = require("../exceptions/ValidationError");

/**
 * Validator for vehicle controller.
 * @class
 */
class VehicleValidator {
	/**
	 * Validate the list vehicles request query parameters.
	 * @param {{limit: number, offset: number}} query - the request query parameters.
	 * @throws {ValidationError} - if the payload is invalid
	 */
	validateListVehiclesQuery(query) {
		const schema = Joi.object({
			limit: Joi.number().integer().min(1).optional(),
			offset: Joi.number().integer().min(0).optional(),
		});

		const { error } = schema.validate(query);

		if (error) {
			throw new ValidationError(error.message);
		}
	}

	/**
	 * Validate the get and delete vehicle request parameters.
	 * @param {{vehicle_id: string}} params - the request parameters
	 */
	validateGetDeleteVehicleParams(params) {
		const schema = Joi.object({
			vehicle_id: Joi.string().guid({ version: "uuidv4" }).required(),
		});

		const { error } = schema.validate(params);

		if (error) {
			throw new ValidationError(error.message);
		}
	}
}

module.exports = VehicleValidator;
