/**
 * @typedef {import("jsonwebtoken").JwtPayload} JwtPayload
 * @typedef {import("../repository/TokenRepository")} TokenRepository
 * @typedef {import("@prisma/client").tokens} tokens
 */

const jwt = require("jsonwebtoken");
const { v4: uuidV4 } = require("uuid");
const AuthenticationError = require("../exceptions/AuthenticationError");

/**
 * Generate and verify JWT token.
 * @class
 */
class JWT {
	/** @type {TokenRepository} */
	#tokenRepo;
	/**@type {string} */
	#secretKey;
	/** @type {string} */
	#duration;

	/**
	 * Creates a new TokenManager instance.
	 * @param {TokenRepository} tokenRepo - The token repository instance.
	 * @param {string} secretKey - The secret key for the JWT token from the environment variable.
	 * @param {string} duration - The duration of the JWT token from the environment variable.
	 */
	constructor(tokenRepo, secretKey, duration) {
		this.#tokenRepo = tokenRepo;
		this.#secretKey = secretKey;
		this.#duration = duration;
	}

	/**
	 * Create a new token with the specified user ID.
	 * @param {string} userId - The user ID.
	 * @returns {Promise<string>} The token string.
	 * @async
	 */
	async createToken(userId) {
		const uuid = uuidV4();

		const data = {
			id: uuid,
		};

		const token = jwt.sign(data, this.#secretKey, {
			expiresIn: this.#duration,
		});

		const payload = {
			id: uuid,
			user_id: userId,
			token: token,
		};

		await this.#tokenRepo.insertToken(payload);

		return token;
	}

	/**
	 * Get a token data by its id.
	 * @param {string} tokenId - The token uuid.
	 * @returns {Promise<tokens>} The token data.
	 * @throws {AuthenticationError} If the token id is invalid.
	 * @async
	 */
	async getToken(tokenId) {
		const payload = await this.#tokenRepo.selectTokenById(tokenId);

		if (!payload) {
			throw new AuthenticationError("The token is invalid");
		}

		return payload;
	}

	/**
	 * Delete a token data by its id.
	 * @param {string} tokenId - The token uuid.
	 * @returns {Promise<tokens>} The token data.
	 * @async
	 */
	async deleteToken(tokenId) {
		const payload = await this.#tokenRepo.deleteToken(tokenId);

		return payload;
	}

	/**
	 * Verify JWT token.
	 * @param {string} token - The token to be verified.
	 * @returns {string | JwtPayload} The payload of the token.
	 * @throws {AuthenticationError} If the token is invalid.
	 */
	verifyToken(token) {
		try {
			return jwt.verify(token, this.#secretKey);
		} catch (e) {
			if (e instanceof jwt.TokenExpiredError) {
				throw new AuthenticationError("The token has expired");
			} else {
				throw new AuthenticationError("The token is invalid");
			}
		}
	}
}

module.exports = JWT;
