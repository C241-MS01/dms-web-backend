/**
 * Represents an error that occurs on the client side.
 * @class
 * @augments Error
 */
class ClientError extends Error {
	/**
	 * Creates a new ClientError instance with the specified message and status code.
	 * @param {string} message - The error message.
	 * @param {number} [statusCode] - The HTTP status code for the error (default is 400 Bad Request).
	 */
	constructor(message, statusCode = 400) {
		super(message);
		this.statusCode = statusCode;
		this.name = "ClientError";
	}
}

module.exports = ClientError;
