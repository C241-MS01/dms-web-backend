/**
 * @typedef {import("../repository/AlertRepository")} AlertRepository
 * @typedef {'DROWSY' | 'DISTRACTED' | 'SMOKING' | 'PHONE'} alert_status
 */

/**
 * Service for handling alert-related operations.
 * @class
 */
class AlertService {
	/** @type {AlertRepository} */
	#alertRepo;

	/**
	 * Creates a new AlertService instance.
	 * @param {AlertRepository} alertRepo - The alert repository instance.
	 */
	constructor(alertRepo) {
		this.#alertRepo = alertRepo;
	}

	/**
	 * Create a new alert.
	 * @param {{ id: string, vehicle_id, status, video_url }} data - The alert data to be create.
	 * @returns {Promise<{ id: string, vehicle_id: string, status: alert_status, video_url: string, created_at: Date, updated_at: Date }>} The create alert data.
	 * @async
	 */
	async createAlert(data) {
		const alert = {
			vehicle_id: data.vehicle_id,
			status: data.status,
			video_url: data.video_url,
		};

		const newAlert = await this.#alertRepo.insertAlert(alert);
		return newAlert;
	}

	/**
	 * Get alert data by ID.
	 * @param {string} id - The alert ID.
	 * @returns {Promise<{ id: string, vehicle_id: string, status: alert_status, video_url: string, created_at: Date, updated_at: Date }>} The alert data.
	 * @async
	 */
	async getAlertById(id) {
		const alert = await this.#alertRepo.selectAlertById(id);

		if (!alert) {
			throw new Error("Alert not found");
		}

		return alert;
	}

	/**
	 * Get all alerts.
	 * @returns {Promise<Array<{ id: string, vehicle_id: string, status: alert_status, video_url: string, created_at: Date, updated_at: Date }>>} The list of all alerts.
	 * @async
	 */
	async getAllAlerts() {
		const alerts = await this.#alertRepo.selectAllAlerts();
		return alerts;
	}

	/**
	 * Update an alert data.
	 * @param {string} id - The alert ID.
	 * @param {{ status: alert_status, video_url: string }} data - The alert data to be updated.
	 * @returns {Promise<{ id: string, vehicle_id: string, status: alert_status, video_url: string, created_at: Date, updated_at: Date }>} The updated alert data.
	 * @async
	 */
	async updateAlert(id, data) {
		const alert = {
			id,
			status: data.status,
			video_url: data.video_url,
		};

		const updatedAlert = await this.#alertRepo.updateAlert(id, alert);

		return updatedAlert;
	}

	/**
	 * Delete an alert data by ID.
	 * @param {string} id - The alert ID.
	 * @returns {Promise<{ id: string, vehicle_id: string, status: alert_status, video_url: string, created_at: Date, updated_at: Date }>} The deleted alert data.
	 * @async
	 */
	async deleteAlert(id) {
		const alert = await this.#alertRepo.deleteAlert(id);
		return alert;
	}

	/**
	 * Search alerts based on time and status.
	 * @param {alert_status | undefined} status - The status to filter alerts.
	 * @returns {Promise<Array<{ id: string, vehicle_id: string, status: alert_status, video_url: string, created_at: Date, updated_at: Date }>>} The list of all alerts.
	 * @async
	 */
	async searchAlerts(status) {
		const alerts = await this.#alertRepo.searchAlerts(status);
		return alerts;
	}
}

module.exports = AlertService;
