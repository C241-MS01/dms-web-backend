/**
 * @typedef {import('../repository/VideoRepository')} VideoRepository
 * @typedef {import('../repository/VehicleRepository')} VehicleRepository
 */

const NotFoundError = require("../exceptions/NotFoundError");

/**
 * Service for handling video-related operations.
 * @class
 */
class VideoService {
	/** @type {VideoRepository} */
	#videoRepo;
	/** @type {VehicleRepository} */
	#vehicleRepo;

	/**
	 * Creates a new VideoService instance.
	 * @param {VideoRepository} videoRepo - The video repository instance.
	 * @param {VehicleRepository} vehicleRepo - The vehicle repository instance.
	 */
	constructor(videoRepo, vehicleRepo) {
		this.#videoRepo = videoRepo;
		this.#vehicleRepo = vehicleRepo;
	}

	/**
	 * Get all videos.
	 * @param {string} vehicleUuid - The vehicle UUID.
	 * @param {{ limit: number, offset: number }} params - The parameters for listing videos with pagination.
	 * @returns {Promise<{ count:number, videos: { vehicle_id: string, id: string, url: string, created_at: Date }[] }>} The total count of videos and the videos data.
	 * @async
	 */
	async listVideos(vehicleUuid, params) {
		const vehicle = await this.#vehicleRepo.selectVehicleByUuid(vehicleUuid);
		if (!vehicle) {
			throw new NotFoundError("Vehicle not found");
		}

		const result = await this.#videoRepo.selectAllVideos(vehicle.id, params);
		const videos = result.videos.map((video) => {
			return {
				vehicle_id: vehicle.uuid,
				id: video.uuid,
				url: video.url,
				created_at: video.created_at,
			};
		});

		return {
			count: result.count,
			videos,
		};
	}

	/**
	 * Get a video by UUID.
	 * @param {string} vehicleUuid - The vehicle UUID.
	 * @param {string} uuid - The video UUID.
	 * @returns {Promise<{ vehicle_id: string, id: string, url: string, created_at: Date }>} The video data.
	 * @async
	 */
	async getVideoByUuid(vehicleUuid, uuid) {
		const vehicle = await this.#vehicleRepo.selectVehicleByUuid(vehicleUuid);
		if (!vehicle) {
			throw new NotFoundError("Vehicle not found");
		}

		const result = await this.#videoRepo.selectVideoByUuid(vehicle.id, uuid);
		if (!result) {
			throw new NotFoundError("Video not found");
		}

		const video = {
			vehicle_id: vehicle.uuid,
			id: result.uuid,
			url: result.url,
			created_at: result.created_at,
		};

		return video;
	}
}

module.exports = VideoService;
