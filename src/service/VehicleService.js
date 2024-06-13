/**
 * @typedef {import('../repository/VehicleRepository')} VehicleRepository
 */

const NotFoundError = require("../exceptions/NotFoundError");

/**
 * Service for handling vehicle-related operations.
 * @class
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
	 * Get all vehicles.
	 * @param {{ limit: number, offset: number }} params - The parameters for listing vehicles with pagination.
	 * @returns {Promise<{ count:number, vehicles: { id: string, created_at: Date}[] }>} The total count of vehicles and the vehicles data.
	 * @async
	 */
	async listVehicles(params) {
		const result = await this.#vehicleRepo.selectAllVehicles(params);
		const vehicles = result.vehicles.map((vehicle) => {
			return {
				id: vehicle.uuid,
				created_at: vehicle.created_at,
			};
		});

		return {
			count: result.count,
			vehicles,
		};
	}

	/**
	 * Get a vehicle by UUID.
	 * @param {string} uuid - The vehicle UUID.
	 * @returns {Promise<{ id: string, created_at: Date }>} The vehicle data.
	 * @async
	 */
	async getVehicleByUuid(uuid) {
		const result = await this.#vehicleRepo.selectVehicleByUuid(uuid);
		if (!result) {
			throw new NotFoundError("Vehicle not found");
		}

		const vehicle = {
			id: result.uuid,
			created_at: result.created_at,
		};

		return vehicle;
	}
}

module.exports = VehicleService;
