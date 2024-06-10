/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').Express} Express
 * @typedef {import('../service/AuthService')} AuthService
 * @typedef {import('../validator/AuthValidator')} AuthValidator
 * @typedef {import('../logger/Logger')} Logger
 */

const autoBind = require("auto-bind");
const httpContext = require("express-http-context");
const ClientError = require("../exceptions/ClientError");

/**
 * Authentication and authorization operations controller.
 * @class
 */
class AuthController {
	/** @type {AuthService} */
	#service;
	/** @type {AuthValidator} */
	#validator;
	/** @type {Logger} */
	#logger;

	/**
	 * Creates a new AuthController instance.
	 * @param {AuthService} service - The auth service instance.
	 * @param {AuthValidator} validator - The auth validator instance.
	 * @param {import('./VehicleController').Logger} logger - The logger instance.
	 */
	constructor(service, validator, logger) {
		this.#service = service;
		this.#validator = validator;
		this.#logger = logger;

		autoBind(this);
	}

	/**
	 * Register a new user.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - The response object.
	 * @async
	 */
	async register(req, res) {
		try {
			this.#validator.validateRegisterBody(req.body);

			const { email, password } = req.body;

			await this.#service.register({ email, password });

			return res.status(201).json({
				status: "success",
				message: "User registered successfully",
			});
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

	/**
	 * Login a user.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - The response object.
	 * @async
	 */
	async login(req, res) {
		try {
			this.#validator.validateLoginBody(req.body);

			const { email, password } = req.body;

			const data = await this.#service.login({ email, password });

			return res.status(200).json({
				status: "success",
				message: "User logged in successfully",
				data: data,
			});
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

	/**
	 * Logout a user.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - The response object.
	 * @async
	 */
	async logout(req, res) {
		try {
			const auth = httpContext.get("auth");
			const tokenId = auth.token_id;
			const token = await this.#service.logout(tokenId);

			return res.status(200).json({
				status: true,
				message: "success",
				description: "Account logged out successfully",
				data: {
					token: token,
				},
			});
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

module.exports = AuthController;
