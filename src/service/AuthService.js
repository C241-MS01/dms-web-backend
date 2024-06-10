/**
 * @typedef {import("../token-manager/JWT")} JWT
 * @typedef {import("../repository/UserRepository")} UserRepository
 */

const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const { v4: uuidV4 } = require("uuid");
const AuthenticationError = require("../exceptions/AuthenticationError");
const ClientError = require("../exceptions/ClientError");

/**
 * Service for handling user authentication and authorization operations.
 * @class
 */
class AuthService {
	/** @type {JWT} */
	#jwt;
	/** @type {UserRepository} */
	#userRepo;

	/**
	 * Creates a new AuthService instance.
	 * @param {JWT} jwt - The JWT token manager instance.
	 * @param {UserRepository} userRepo - The user repository instance.
	 */
	constructor(jwt, userRepo) {
		this.#jwt = jwt;
		this.#userRepo = userRepo;
	}

	/**
	 * Register a new user data.
	 * @param {{ email: string, password: string }} data - The user data to be registered.
	 * @throws {ClientError} - If an user account already exist.
	 * @async
	 */
	async register(data) {
		try {
			const uuid = uuidV4();
			const hashedPassword = await bcrypt.hashSync(data.password, salt);

			const user = {
				id: uuid,
				email: data.email,
				password: hashedPassword,
			};

			await this.#userRepo.insertUser(user);
		} catch (e) {
			switch (e.code) {
				case "P2002":
					throw new ClientError(
						"This email is already associated with an account",
					);
				default:
					throw e;
			}
		}
	}

	/**
	 * Login an user account.
	 * @param {{ email: string, password: string }} params - The user data to be logged in.
	 * @returns {Promise<{ token: string, user: { id: string, email: string, created_at: Date } }>} The JWT token and the user data.
	 * @throws {AuthenticationError} If the email or password is invalid.
	 * @async
	 */
	async login(params) {
		const user = await this.#userRepo.selectUserByEmail(params.email);

		if (!user) {
			throw new AuthenticationError("Email or password is incorrect");
		}

		const isPasswordMatch = await bcrypt.compare(
			params.password,
			user.password,
		);

		if (!isPasswordMatch) {
			throw new AuthenticationError("Email or password is incorrect");
		}

		const token = await this.#jwt.createToken(user.id);

		const data = {
			token: token,
			user: {
				id: user.id,
				email: user.email,
				created_at: user.created_at,
			},
		};

		return data;
	}

	/**
	 * Logout an user account by deleting the JWT token.
	 * @param {string} tokenId - The token ID to be deleted.
	 * @returns {Promise<string>} The deleted JWT token string.
	 * @async
	 */
	async logout(tokenId) {
		const payload = await this.#jwt.deleteToken(tokenId);
		return payload.token;
	}
}

module.exports = AuthService;
