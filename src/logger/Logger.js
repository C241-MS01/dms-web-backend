/**
 * @typedef {import("express").RequestHandler} Request
 * @typedef {import("express").Response} Response
 */

const winston = require("winston");
const morgan = require("morgan");

/**
 * Logger for logging operations.
 * @class
 */
class Logger {
	/** @type {winston.Logger} */
	#logger;

	/** Creates a new Logger instance. */
	constructor() {
		const options = {
			file: {
				level: "http",
				filename: `./logs/app.log`,
				handleExceptions: true,
				maxsize: 5242880, // 5MB
				maxFiles: 10,
				format: winston.format.combine(
					winston.format.timestamp(),
					winston.format.json(),
				),
			},
			console: {
				level: "http",
				handleExceptions: true,
				format: winston.format.combine(
					winston.format.colorize(),
					winston.format.simple(),
				),
			},
		};

		this.#logger = winston.createLogger({
			transports: [
				new winston.transports.Console(options.console),
				new winston.transports.File(options.file),
			],
		});
	}

	/**
	 * Get the middleware for logging.
	 * @returns {Request} - The request object.
	 */
	middleware() {
		return morgan("combined", {
			stream: {
				write: (message) => {
					this.#logger.http(message.trim());
				},
			},
		});
	}

	/**
	 * Logs error level message.
	 * @param {string} message - The message to be logged.
	 */
	error(message) {
		this.#logger.error(message);
	}

	/**
	 * Logs warn level message.
	 * @param {string} message - The message to be logged.
	 */
	warn(message) {
		this.#logger.warn(message);
	}

	/**
	 * Logs info level message.
	 * @param {string} message - The message to be logged.
	 */
	info(message) {
		this.#logger.info(message);
	}

	/**
	 * Logs verbose level message.
	 * @param {string} message - The message to be logged.
	 */
	verbose(message) {
		this.#logger.verbose(message);
	}

	/**
	 * Logs debug level message.
	 * @param {string} message - The message to be logged.
	 */
	debug(message) {
		this.#logger.debug(message);
	}

	/**
	 * Logs silly level message.
	 * @param {string} message - The message to be logged.
	 */
	silly(message) {
		this.#logger.silly(message);
	}
}

module.exports = Logger;
