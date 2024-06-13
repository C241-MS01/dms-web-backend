/**
 * @typedef {import("@prisma/client").alerts} alerts
 * @typedef {import("@prisma/client").PrismaClient} PrismaClient
 * @typedef {'DROWSY' | 'DISTRACTED' | 'SMOKING' | 'PHONE'} alert_status
 */

/**
 * Repository for alert-related operations using Prisma.
 * @class
 */
class AlertRepository {
	/** @type {PrismaClient} */
	#prisma;

	/**
	 * Creates a new AlertRepository instance.
	 * @param {PrismaClient} prisma - The Prisma client instance.
	 */
	constructor(prisma) {
		this.#prisma = prisma;
	}

	/**
	 * Insert a new alert to the database.
	 * @param {{ vehicle_id: string, status: alert_status, video_url: string }} alert - The alert data to be added.
	 * @returns {Promise<alerts>} - The inserted alert data.
	 * @async
	 */
	async insertAlert(alert) {
		const newAlert = await this.#prisma.alerts.create({
			data: alert,
		});
		return newAlert;
	}

	/**
	 * Select an alert data by ID.
	 * @param {string} id - The ID of the alert for the where clause.
	 * @returns {Promise<alerts>} - The alert data.
	 * @async
	 */
	async selectAlertById(id) {
		const alert = await this.#prisma.alerts.findUnique({
			where: {
				id: id,
			},
		});
		return alert;
	}

	/**
	 * Select all alerts.
	 * @returns {Promise<Array<alerts>>} - The list of all alerts.
	 * @async
	 */
	async selectAllAlerts() {
		const alerts = await this.#prisma.alerts.findMany();
		return alerts;
	}

	/**
	 * Update an alert data by ID.
	 * @param {string} id - The alert ID.
	 * @param {{ status: alert_status, video_url: string }} alert - The alert data to be updated.
	 * @returns {Promise<alerts>} - The updated alert data.
	 * @async
	 */
	async updateAlert(id, alert) {
		const updatedAlert = await this.#prisma.alerts.update({
			where: {
				id: id,
			},
			data: {
				status: alert.status,
				video_url: alert.video_url,
				updated_at: new Date(), // Ensure the updated_at field is set to the current date
			},
		});
		return updatedAlert;
	}

	/**
	 * Delete an alert data by ID.
	 * @param {string} id - The ID of the alert to be deleted.
	 * @returns {Promise<alerts>} - The deleted alert data.
	 * @async
	 */
	async deleteAlert(id) {
		const alert = await this.#prisma.alerts.delete({
			where: {
				id,
			},
		});
		return alert;
	}

	/**
	 * Search alerts based on status.
	 * @param {alert_status | undefined} status - The status to filter alerts.
	 * @returns {Promise<Array<alerts>>} - The list of matching alerts.
	 * @async
	 */
	async searchAlerts(status) {
		const conditions = {};
		if (status) {
			conditions.status = status; // Correct property name is 'status'
		}

		const alerts = await this.#prisma.alerts.findMany({
			where: conditions,
			select: {
				id: true,
				vehicle_id: true,
				status: true,
				created_at: true,
			},
		});
		return alerts;
	}
}

module.exports = AlertRepository;
