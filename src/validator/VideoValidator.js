const Joi = require("joi");
const ValidationError = require("../exceptions/ValidationError");

/**
 * Validator for video controller.
 * @class
 */
class VideoValidator {
	/**
	 * Validate the list videos request query parameters.
	 * @param {{limit: number, offset: number}} query - the request query parameters.
	 * @throws {ValidationError} - if the payload is invalid
	 */
	validateListVideosQuery(query) {
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
	 * Validate the list videos request parameters.
	 * @param {{vehicle_id: string}} params - the request parameters
	 */
	validateListVideosParams(params) {
		const schema = Joi.object({
			vehicle_id: Joi.string().guid({ version: "uuidv4" }).required(),
		});

		const { error } = schema.validate(params);

		if (error) {
			throw new ValidationError(error.message);
		}
	}

	/**
	 * Validate the get and delete video request parameters.
	 * @param {{vehicle_id: string, video_id: string}} params - the request parameters
	 */
	validateGetDeleteVideoParams(params) {
		const schema = Joi.object({
			vehicle_id: Joi.string().guid({ version: "uuidv4" }).required(),
			video_id: Joi.string().guid({ version: "uuidv4" }).required(),
		});

		const { error } = schema.validate(params);

		if (error) {
			throw new ValidationError(error.message);
		}
	}
}

module.exports = VideoValidator;
