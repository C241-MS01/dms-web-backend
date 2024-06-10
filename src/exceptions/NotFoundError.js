const ClientError = require("./ClientError");

/**
 * Represents a 404 Not Found error.
 * @class
 * @augments ClientError
 */
class NotFoundError extends ClientError {
	/**
	 * Creates a new NotFoundError instance with the specified message.
	 * @param {string} message - The error message.
	 */
	constructor(message) {
		super(message, 404);
		this.name = "NotFoundError";
	}
}

module.exports = NotFoundError;
