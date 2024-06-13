/**
 * @typedef {import('@prisma/client').vehicles} vehicles
 * @typedef {import('@prisma/client').PrismaClient} PrismaClient
 */

/**
 * Repository for vehicle-related operations using Prisma.
 * @class
 */
class VehicleRepository {
	/** @type {PrismaClient} */
	#prisma;

	/**
	 * Creates a new VehicleRepository instance.
	 * @param {PrismaClient} prisma - The Prisma client instance.
	 */
	constructor(prisma) {
		this.#prisma = prisma;
	}

	/**
	 * Select a vehicle data by UUID.
	 * @param {string} uuid - The vehicle UUID.
	 * @returns {Promise<vehicles>} - The vehicle data.
	 * @async
	 */
	async selectVehicleByUuid(uuid) {
		const vehicle = await this.#prisma.vehicles.findUnique({
			where: { uuid: uuid },
		});

		return vehicle;
	}

	/**
	 * Select all vehicles.
	 * @param {{ limit: number, offset: number }} params - The parameters for listing vehicles with pagination.
	 * @returns {Promise<{ count: number, vehicles: vehicles[] }>} - The total count of vehicles and the vehicles data.
	 * @async
	 */
	async selectAllVehicles(params) {
		const vehicles = await this.#prisma.vehicles.findMany({
			take: params.limit,
			skip: params.offset,
		});

		const count = await this.#prisma.vehicles.count();

		return { count, vehicles };
	}
}

module.exports = VehicleRepository;
