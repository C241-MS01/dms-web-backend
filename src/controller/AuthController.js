/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {import('express').Express} Express
 * @typedef {import('../service/AuthService')} AuthService
 * @typedef {import('../validator/AuthValidator')} AuthValidator
 */

const autoBind = require("auto-bind");
const httpContext = require("express-http-context");

/**
 * Authentication and authorization operations controller.
 * @class
 */
class AuthController {
	/** @type {AuthService} */
	#service;
	/** @type {AuthValidator} */
	#validator;

	/**
	 * Creates a new AuthController instance.
	 * @param {AuthService} service - The auth service instance.
	 * @param {AuthValidator} validator - The auth validator instance.
	 */
	constructor(service, validator) {
		this.#service = service;
		this.#validator = validator;

		autoBind(this);
	}

	/**
	 * Register a new user.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @param {NextFunction} next - The next function.
	 * @returns {Promise<Response>} - The response object.
	 * @async
	 */
	async register(req, res, next) {
		try {
			this.#validator.validateRegisterBody(req.body);

			const { email, password } = req.body;

			await this.#service.register({ email, password });

			return res.status(201).json({
				status: "success",
				message: "User registered successfully",
			});
		} catch (e) {
			next(e);
		}
	}

	/**
	 * Login a user.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @param {NextFunction} next - The next function.
	 * @returns {Promise<Response>} - The response object.
	 * @async
	 */
	async login(req, res, next) {
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
			next(e);
		}
	}

	/**
	 * Logout a user.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @param {NextFunction} next - The next function.
	 * @returns {Promise<Response>} - The response object.
	 * @async
	 */
	async logout(req, res, next) {
		try {
			const auth = httpContext.get("auth");
			const tokenUuid = auth.token_uuid;
			const token = await this.#service.logout(tokenUuid);

			return res.status(200).json({
				status: true,
				message: "success",
				description: "Account logged out successfully",
				data: {
					token: token,
				},
			});
		} catch (e) {
			next(e);
		}
	}
}

module.exports = AuthController;
