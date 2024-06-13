/**
 * @typedef {import("../token-manager/JWT")} JWT
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 * @typedef {import("../logger/Logger")} Logger
 */

const autoBind = require("auto-bind");
const httpContext = require("express-http-context");
const ClientError = require("../exceptions/ClientError");
const AuthorizationError = require("../exceptions/AuthorizationError");

/**
 * List of custom middleware for the application.
 * @class
 */
class Middleware {
	/** @type {JWT} */
	#jwt;
	/** @type {Logger} */
	#logger;

	/**
	 * Creates a new Middleware instance.
	 * @param {JWT} jwt - The JWT token manager.
	 * @param {Logger} logger - The logger for logging operations.
	 */
	constructor(jwt, logger) {
		this.#jwt = jwt;
		this.#logger = logger;

		autoBind(this);
	}

	/**
	 * Handles the error response for the application.
	 * @param {Error} err - The error object.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @param {NextFunction} next - The next function.
	 * @returns {Promise<Response>} The response object.
	 * @async
	 */
	// eslint-disable-next-line no-unused-vars
	async errorResponse(err, req, res, next) {
		if (err instanceof ClientError) {
			return res.status(err.statusCode).json({
				status: "failed",
				message: err.message,
			});
		}

		this.#logger.error(err.message);

		return res.status(500).json({
			status: "failed",
			message: "Internal server error",
		});
	}

	/**
	 * Checks the authorization header and authenticate the user.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @param {NextFunction} next - The next function.
	 * @throws {AuthorizationError} If the authorization header is not present or invalid.
	 * @async
	 */
	// @ts-ignore
	async authenticate(req, res, next) {
		try {
			const { authorization } = req.headers;
			if (!authorization) {
				throw new AuthorizationError("`Authorization` header is required");
			}

			const token = authorization.replace("Bearer ", "");
			const payload = this.#jwt.verifyToken(token);

			// @ts-ignore
			const tokenUuid = payload.uuid;
			const tokenData = await this.#jwt.getToken(tokenUuid);

			/** @type {{ token_uuid: string, user_uuid: string, user_email: string }} */
			const auth = {
				token_uuid: tokenData.uuid,
				// @ts-ignore
				user_uuid: tokenData.user.uuid,
				// @ts-ignore
				user_email: tokenData.user.email,
			};

			httpContext.set("auth", auth);

			next();
		} catch (e) {
			next(e);
		}
	}
}

module.exports = Middleware;
