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
	 * Select an alert data by ID.
	 * @param {bigint} videoId - The video ID.
	 * @param {string} uuid - The alert UUID.
	 * @returns {Promise<alerts>} - The alert data.
	 * @async
	 */
	async selectAlertByUuid(videoId, uuid) {
		const alert = await this.#prisma.alerts.findUnique({
			where: { video_id: videoId, uuid: uuid },
		});

		return alert;
	}

	/**
	 * Select all alerts.
	 * @param {bigint} videoId - The video ID.
	 * @param {{ limit: number, offset: number }} params - The parameters for listing alerts with pagination.
	 * @returns {Promise<{ count: number, alerts: alerts[] }>} - The total count of alerts and the alerts data.
	 * @async
	 */
	async selectAllAlerts(videoId, params) {
		const alerts = await this.#prisma.alerts.findMany({
			where: { video_id: videoId },
			take: params.limit,
			skip: params.offset,
		});

		const count = await this.#prisma.alerts.count({
			where: { video_id: videoId },
		});

		return { count, alerts };
	}
}

module.exports = AlertRepository;
