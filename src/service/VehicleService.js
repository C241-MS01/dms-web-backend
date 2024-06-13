/**
 * @typedef {import('../repository/VehicleRepository')} VehicleRepository
 */

class VehicleService {
	/** @type {VehicleRepository} */
	#vehicleRepo;

	/**
	 * Creates a new VehicleService instance.
	 * @param {VehicleRepository} vehicleRepo - The vehicle repository instance.
	 */
	constructor(vehicleRepo) {
		this.#vehicleRepo = vehicleRepo;
	}

	/**
	 * Create a new vehicle.
	 * @param {{ id: string }} data - The vehicle data to be create.
	 * @returns {Promise<{ id: string, created_at: Date, updated_at: Date }>} The registered vehicle data.
	 * @async
	 */
	async createVehicle(data) {
		const vehicle = {
			id: data.id,
		};

		const newVehicle = await this.#vehicleRepo.insertVehicle(vehicle);
		return newVehicle;
	}

	/**
	 * Get a vehicle by ID.
	 * @param {string} id - The vehicle ID.
	 * @returns {Promise<{ id: string, created_at: Date, updated_at: Date }>} The vehicle data.
	 * @async
	 */
	async getVehicleById(id) {
		const vehicle = await this.#vehicleRepo.selectVehicleById(id);

		if (!vehicle) {
			throw new Error("Vehicle not found");
		}

		return vehicle;
	}

	/**
	 * Get all vehicles.
	 * @returns {Promise<Array<{ id: string, created_at: Date, updated_at: Date }>>} The list of vehicles.
	 * @async
	 */
	async getVehicles() {
		const vehicles = await this.#vehicleRepo.selectAllVehicles();
		return vehicles;
	}

	/**
	 * Update a vehicle data.
	 * @param {string} id - The vehicle ID.
	 * @param {{ id: string }} data - The vehicle data to be updated.
	 * @returns {Promise<{ id: string, created_at: Date, updated_at: Date }>} The updated vehicle data.
	 * @async
	 */
	async updateVehicle(id, data) {
		const vehicle = {
			id: data.id,
		};

		const updatedVehicle = await this.#vehicleRepo.updateVehicle(id, vehicle);
		return updatedVehicle;
	}

	/**
	 * Delete a vehicle by ID.
	 * @param {string} id - The vehicle ID.
	 * @returns {Promise<{ id: string, created_at: Date, updated_at: Date }>} The deleted vehicle data.
	 * @async
	 */
	async deleteVehicle(id) {
		const vehicle = await this.#vehicleRepo.deleteVehicle(id);
		return vehicle;
	}
}

module.exports = VehicleService;
