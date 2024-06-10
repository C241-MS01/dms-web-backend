const ClientError = require("./ClientError");

/**
 * Represents an error that occurs during authentication.
 * @class
 * @augments ClientError
 */
class AuthenticationError extends ClientError {
	/**
	 * Creates a new AuthenticationError instance with 401 error code and the specified message.
	 * @param {string} message - The error message.
	 */
	constructor(message) {
		super(message, 401);
		this.name = "AuthenticationError";
	}
}

module.exports = AuthenticationError;
