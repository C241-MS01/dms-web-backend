/**
 * @typedef {import("../repository/VehicleRepository")} VehicleRepository
 * @typedef {import("../repository/VideoRepository")} VideoRepository
 * @typedef {import("../repository/AlertRepository")} AlertRepository
 */

const NotFoundError = require("../exceptions/NotFoundError");

/**
 * Service for handling alert-related operations.
 * @class
 */
class AlertService {
	/** @type {AlertRepository} */
	#alertRepo;
	/**  @type {VideoRepository} */
	#videoRepo;
	/** @type {VehicleRepository} */
	#vehicleRepo;

	/**
	 * Creates a new AlertService instance.
	 * @param {AlertRepository} alertRepo - The alert repository instance.
	 * @param {VideoRepository} videoRepo - The video repository instance.
	 * @param {VehicleRepository} vehicleRepo - The vehicle repository instance.
	 */
	constructor(alertRepo, videoRepo, vehicleRepo) {
		this.#alertRepo = alertRepo;
		this.#videoRepo = videoRepo;
		this.#vehicleRepo = vehicleRepo;
	}

	/**
	 * List all alerts.
	 * @param {string} vehicleUuid - The vehicle UUID.
	 * @param {string} videoUuid - The video UUID.
	 * @param {{ limit: number, offset: number }} params - The parameters for listing alerts with pagination.
	 * @returns {Promise<{ count: number, alerts: { video_id: string, id: string, ear: number, mar: number, sleep_duration: number, yawning_duration: number, focus_duration: number, object_detected: string, time: Date }[] }>} - The total count of alerts and the alerts data.
	 * @async
	 */
	async listAlerts(vehicleUuid, videoUuid, params) {
		const vehicle = await this.#vehicleRepo.selectVehicleByUuid(vehicleUuid);
		if (!vehicle) {
			throw new NotFoundError("Vehicle not found");
		}

		const video = await this.#videoRepo.selectVideoByUuid(
			vehicle.id,
			videoUuid,
		);
		if (!video) {
			throw new NotFoundError("Video not found");
		}

		const result = await this.#alertRepo.selectAllAlerts(video.id, params);
		const alerts = result.alerts.map((alert) => {
			return {
				video_id: video.uuid,
				id: alert.uuid,
				ear: alert.ear,
				mar: alert.mar,
				sleep_duration: alert.sleep_duration,
				yawning_duration: alert.yawning_duration,
				focus_duration: alert.focus_duration,
				object_detected: alert.object_detected,
				time: alert.time,
			};
		});

		return {
			count: result.count,
			alerts: alerts,
		};
	}

	/**
	 * Get alert data by ID.
	 * @param {string} vehicleUuid - The vehicle UUID.
	 * @param {string} videoUuid - The video UUID.
	 * @param {string} uuid - The alert UUID.
	 * @returns {Promise<{ video_id: string, id: string, ear: number, mar: number, sleep_duration: number, yawning_duration: number, focus_duration: number, object_detected: string, time: Date }>} - The alert data.
	 * @async
	 */
	async getAlertByUuid(vehicleUuid, videoUuid, uuid) {
		const vehicle = await this.#vehicleRepo.selectVehicleByUuid(vehicleUuid);
		if (!vehicle) {
			throw new NotFoundError("Vehicle not found");
		}

		const video = await this.#videoRepo.selectVideoByUuid(
			vehicle.id,
			videoUuid,
		);
		if (!video) {
			throw new NotFoundError("Video not found");
		}

		const result = await this.#alertRepo.selectAlertByUuid(video.id, uuid);
		if (!result) {
			throw new NotFoundError("Alert not found");
		}

		const alert = {
			video_id: video.uuid,
			id: result.uuid,
			ear: result.ear,
			mar: result.mar,
			sleep_duration: result.sleep_duration,
			yawning_duration: result.yawning_duration,
			focus_duration: result.focus_duration,
			object_detected: result.object_detected,
			time: result.time,
		};

		return alert;
	}
}

module.exports = AlertService;
