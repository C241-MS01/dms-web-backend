const ClientError = require("./ClientError");

/**
 * Represents an error that occurs during request validation.
 * @class
 * @augments ClientError
 */
class ValidationError extends ClientError {
	/**
	 * Creates a new ValidationError instance with 422 error code and the specified message.
	 * @param {string} message - The error message.
	 */
	constructor(message) {
		super(message, 422);
		this.name = "ValidationError";
	}
}

module.exports = ValidationError;
