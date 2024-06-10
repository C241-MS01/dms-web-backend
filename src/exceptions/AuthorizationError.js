const ClientError = require("./ClientError");

/**
 * Represents an error that occurs when authorization is denied.
 * @class
 * @augments ClientError
 */
class AuthorizationError extends ClientError {
	/**
	 * Creates a new AuthorizationError instance with 403 error code and the specified message.
	 * @param {string} message - The error message.
	 */
	constructor(message) {
		super(message, 403);
		this.name = "AuthorizationError";
	}
}

module.exports = AuthorizationError;
