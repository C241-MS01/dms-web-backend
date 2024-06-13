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
	 * Insert a new vehicle to the database.
	 * @param {{ id: string }} vehicle - The vehicle data to be added.
	 * @returns {Promise<vehicles>} - The inserted vehicle data.
	 * @async
	 */
	async insertVehicle(vehicle) {
		const newVehicle = await this.#prisma.vehicles.create({
			data: vehicle,
		});
		return newVehicle;
	}

	/**
	 * Select a vehicle data by ID.
	 * @param {string} id - The vehicle ID.
	 * @returns {Promise<vehicles>} - The vehicle data.
	 * @async
	 */
	async selectVehicleById(id) {
		const vehicle = await this.#prisma.vehicles.findUnique({
			where: { id },
		});
		return vehicle;
	}

	/**
	 * Select all vehicles.
	 * @returns {Promise<Array<vehicles>>} - The list of vehicles.
	 * @async
	 */
	async selectAllVehicles() {
		const vehicles = await this.#prisma.vehicles.findMany();
		return vehicles;
	}

	/**
	 * Update a vehicle data by ID.
	 * @param {string} id - The vehicle ID.
	 * @param {{ id: string }} vehicle - The vehicle data to be updated.
	 * @returns {Promise<vehicles>} - The updated vehicle data.
	 * @async
	 */
	async updateVehicle(id, vehicle) {
		const updatedVehicle = await this.#prisma.vehicles.update({
			where: { id },
			data: vehicle,
		});
		return updatedVehicle;
	}

	/**
	 * Delete a vehicle data by ID.
	 * @param {string} id - The vehicle ID.
	 * @returns {Promise<vehicles>} - The deleted vehicle data.
	 * @async
	 */
	async deleteVehicle(id) {
		const vehicle = await this.#prisma.vehicles.delete({
			where: { id },
		});
		return vehicle;
	}
}

module.exports = VehicleRepository;
