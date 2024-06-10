const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const ValidationError = require("../exceptions/ValidationError");

/**
 * Validator for authentication and authorization controller.
 * @class
 */
class AuthValidator {
	/**
	 * Validate the register request.
	 * @param {{email: string, password: string, confirmation_password: string}} payload - request payload
	 * @throws {ValidationError} - if the payload is invalid
	 */
	validateRegisterBody(payload) {
		const passwordComplexityOptions = {
			min: 8,
			max: 128,
			lowerCase: 1,
			upperCase: 1,
			numeric: 1,
			symbol: 1,
		};

		const schema = Joi.object({
			email: Joi.string().email().required(),
			// @ts-ignore
			password: passwordComplexity(passwordComplexityOptions).required(),
			confirmation_password: Joi.string().valid(Joi.ref("password")).required(),
		});

		const { error } = schema.validate(payload);

		if (error) {
			throw new ValidationError(error.message);
		}
	}

	/**
	 * Validate the login request.
	 * @param {{email: string, password: string}} payload - request payload
	 */
	validateLoginBody(payload) {
		const schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		});

		const { error } = schema.validate(payload);

		if (error) {
			throw new ValidationError(error.message);
		}
	}
}

module.exports = AuthValidator;
