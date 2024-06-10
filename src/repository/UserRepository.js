/**
 * @typedef {import("@prisma/client").users} users
 * @typedef {import("@prisma/client").PrismaClient} PrismaClient
 */

/**
 * Repository for user-related operations using Prisma.
 * @class
 */
class UserRepository {
	/** @type {PrismaClient} */
	#prisma;

	/**
	 * Creates a new userRepository instance.
	 * @param {PrismaClient} prisma - The Prisma client instance.
	 */
	constructor(prisma) {
		this.#prisma = prisma;
	}

	/**
	 * Insert a new user to the database.
	 * @param {{ id: string, email: string, password: string }} user - The user data to be added.
	 * @async
	 */
	async insertUser(user) {
		await this.#prisma.users.create({
			data: {
				id: user.id,
				email: user.email,
				password: user.password,
			},
		});
	}

	/**
	 * Select a user data by email.
	 * @param {string} email - The email of the user for the where clause.
	 * @returns {Promise<users>} - The user data.
	 * @async
	 */
	async selectUserByEmail(email) {
		const user = await this.#prisma.users.findUnique({
			where: {
				email: email,
			},
		});

		return user;
	}

	/**
	 * Update an user data.
	 * @param {{ id: string, email: string, password: string }} user - The user data to be updated.
	 * @returns {Promise<users>} - The updated user data.
	 * @async
	 */
	async updateUser(user) {
		const updatedUser = await this.#prisma.users.update({
			where: {
				id: user.id,
			},
			data: {
				email: user.email,
				password: user.password,
			},
		});

		return updatedUser;
	}

	/**
	 * Delete a user data.
	 * @param {string} id - The id of the user to be deleted.
	 * @returns {Promise<users>} - The deleted user data.
	 * @async
	 */
	async deleteUser(id) {
		const user = await this.#prisma.users.delete({
			where: {
				id: id,
			},
		});

		return user;
	}
}

module.exports = UserRepository;
