const Joi = require("joi");
const ValidationError = require("../exceptions/ValidationError");

/**
 * Validator for alert controller.
 * @class
 */
class AlertValidator {
	/**
	 * Validate the list alerts request query parameters.
	 * @param {{limit: number, offset: number}} query - the request query parameters.
	 * @throws {ValidationError} - if the payload is invalid
	 */
	validateListAlertsQuery(query) {
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
	 * Validate the list alerts request parameters.
	 * @param {{vehicle_id: string, video_id: string}} params - the request parameters
	 */
	validateListAlertsParams(params) {
		const schema = Joi.object({
			vehicle_id: Joi.string().guid({ version: "uuidv4" }).required(),
			video_id: Joi.string().guid({ version: "uuidv4" }).required(),
		});

		const { error } = schema.validate(params);

		if (error) {
			throw new ValidationError(error.message);
		}
	}

	/**
	 * Validate the get and delete alert request parameters.
	 * @param {{vehicle_id: string, video_id: string, alert_id: string}} params - the request parameters
	 */
	validateGetDeleteAlertParams(params) {
		const schema = Joi.object({
			vehicle_id: Joi.string().guid({ version: "uuidv4" }).required(),
			video_id: Joi.string().guid({ version: "uuidv4" }).required(),
			alert_id: Joi.string().guid({ version: "uuidv4" }).required(),
		});

		const { error } = schema.validate(params);

		if (error) {
			throw new ValidationError(error.message);
		}
	}
}

module.exports = AlertValidator;
