/**
 * @typedef {import("@prisma/client").tokens} tokens
 * @typedef {import("@prisma/client").PrismaClient} PrismaClient
 */

/**
 * Repository for token-related operations using Prisma.
 * @class
 */
class TokenRepository {
	/** @type {PrismaClient} */
	#prisma;

	/**
	 * Creates a new TokenRepository instance.
	 * @param {PrismaClient} prisma - The Prisma client instance.
	 */
	constructor(prisma) {
		this.#prisma = prisma;
	}

	/**
	 * Insert a new JWT token to the database.
	 * @param {{ id: string, user_id: string, token: string }} payload - The token data to be added.
	 * @async
	 */
	async insertToken(payload) {
		await this.#prisma.tokens.create({
			data: {
				id: payload.id,
				user_id: payload.user_id,
				token: payload.token,
			},
		});
	}

	/**
	 * Select a token data by its id.
	 * @param {string} id - The uuid of the token for the where clause.
	 * @returns {Promise<tokens>} - The token data.
	 * @async
	 */
	async selectTokenById(id) {
		const token = await this.#prisma.tokens.findUnique({
			where: {
				id: id,
			},
			include: {
				user: true,
			},
		});

		return token;
	}

	/**
	 * Delete a token data by its id.
	 * @param {string} id - The uuid of the token for the where clause.
	 * @returns {Promise<tokens>} - The token data.
	 * @async
	 */
	async deleteToken(id) {
		const token = await this.#prisma.tokens.delete({
			where: {
				id: id,
			},
		});

		return token;
	}
}

module.exports = TokenRepository;
