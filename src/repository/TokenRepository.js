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
	 * @param {{ uuid: string, user_id: bigint, token: string }} payload - The token data to be added.
	 * @async
	 */
	async insertToken(payload) {
		await this.#prisma.tokens.create({
			data: {
				uuid: payload.uuid,
				user_id: payload.user_id,
				token: payload.token,
			},
		});
	}

	/**
	 * Select a token data by its UUID.
	 * @param {string} uuid - The UUID of the token for the where clause.
	 * @returns {Promise<tokens>} - The token data.
	 * @async
	 */
	async selectTokenByUuid(uuid) {
		const token = await this.#prisma.tokens.findUnique({
			where: {
				uuid: uuid,
			},
			include: {
				user: true,
			},
		});

		return token;
	}

	/**
	 * Delete a token data by its uuid.
	 * @param {string} uuid - The uuid of the token for the where clause.
	 * @returns {Promise<tokens>} - The token data.
	 * @async
	 */
	async deleteToken(uuid) {
		const token = await this.#prisma.tokens.delete({
			where: {
				uuid: uuid,
			},
		});

		return token;
	}
}

module.exports = TokenRepository;
