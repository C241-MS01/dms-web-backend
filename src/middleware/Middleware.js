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
	 * Checks the authorization header and authenticate the user.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @param {NextFunction} next - The next function.
	 * @returns {Promise<Response>} The response object.
	 * @throws {AuthorizationError} If the authorization header is not present or invalid.
	 * @async
	 */
	async authenticate(req, res, next) {
		try {
			const { authorization } = req.headers;
			if (!authorization) {
				throw new AuthorizationError("`Authorization` header is required");
			}

			const token = authorization.replace("Bearer ", "");
			const payload = this.#jwt.verifyToken(token);

			// @ts-ignore
			const tokenId = payload.id;
			const tokenData = await this.#jwt.getToken(tokenId);

			/** @type {{ token_id: string, user_id: string, user_email: string }} */
			const auth = {
				token_id: tokenData.id,
				// @ts-ignore
				user_id: tokenData.user.id,
				// @ts-ignore
				user_email: tokenData.user.email,
			};

			httpContext.set("auth", auth);

			next();
		} catch (e) {
			if (e instanceof ClientError) {
				return res.status(e.statusCode).json({
					status: "failed",
					message: e.message,
				});
			}

			this.#logger.error(e.message);

			return res.status(500).json({
				status: "failed",
				message: "Internal server error",
			});
		}
	}
}

module.exports = Middleware;
