/**
 * @typedef {import('../service/AlertService')} AlertService
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('../logger/Logger')} Logger
 * @typedef {'DROWSY' | 'DISTRACTED' | 'SMOKING' | 'PHONE'} alert_status
 */

const autoBind = require("auto-bind");
const ClientError = require("../exceptions/ClientError");

class AlertsController {
	/** @type {AlertService} */
	#service;
	/** @type {Logger} */
	#logger;

	/**
	 * Creates a new AlertsController instance.
	 * @param {AlertService} service - The alert service instance.
	 * @param {import('./VehicleController').Logger} logger - The logger instance.
	 */
	constructor(service, logger) {
		this.#service = service;
		this.#logger = logger;

		autoBind(this);
	}

	/**
	 * Get all alerts.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async getAlerts(req, res) {
		try {
			const alerts = await this.#service.getAllAlerts();

			return res.status(200).json({
				status: "success getAllAlerts",
				data: alerts,
			});
		} catch (e) {
			if (e instanceof ClientError) {
				return res.status(e.statusCode).json({
					status: "failed",
					message: e.message,
				});
			}

			this.#logger.error(e.message);

			return res.status(500).json({
				status: "failed",
				message: "Internal server error",
			});
		}
	}

	/**
	 * Get alert by ID.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async getAlertById(req, res) {
		try {
			const alert = await this.#service.getAlertById(req.params.id);

			return res.status(200).json({
				status: {
					code: "200",
					message: "success",
				},
				data: alert,
			});
		} catch (e) {
			if (e instanceof ClientError) {
				return res.status(e.statusCode).json({
					status: "failed",
					message: e.message,
				});
			}

			this.#logger.error(e.message);

			return res.status(500).json({
				status: "failed",
				message: "Internal server error",
			});
		}
	}

	/**
	 * Create a new alert.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async createAlert(req, res) {
		try {
			const newAlert = await this.#service.createAlert(req.body);

			const { id, vehicle_id, status, video_url } = req.body;
			await this.#service.createAlert({ id, vehicle_id, status, video_url });

			return res.status(201).json({
				status: "success create new Alert",
				data: newAlert,
			});
		} catch (e) {
			if (e instanceof ClientError) {
				return res.status(e.statusCode).json({
					status: "failed",
					message: e.message,
				});
			}

			this.#logger.error(e.message);

			return res.status(500).json({
				status: "failed",
				message: "Internal server error",
			});
		}
	}

	/**
	 * Update an existing alert.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async updateAlert(req, res) {
		try {
			const updatedAlert = await this.#service.updateAlert(
				req.params.id,
				req.body,
			);
			return res.status(200).json({
				status: "success updated alert",
				data: updatedAlert,
			});
		} catch (e) {
			if (e instanceof ClientError) {
				return res.status(e.statusCode).json({
					status: "failed",
					message: e.message,
				});
			}

			this.#logger.error(e.message);

			return res.status(500).json({
				status: "failed",
				message: "Internal server error",
			});
		}
	}

	/**
	 * Delete an alert.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async deleteAlert(req, res) {
		try {
			const alert = await this.#service.deleteAlert(req.params.id);

			return res.status(200).json({
				status: "success delete alert",
				data: alert,
			});
		} catch (e) {
			if (e instanceof ClientError) {
				return res.status(e.statusCode).json({
					status: "failed",
					message: e.message,
				});
			}

			this.#logger.error(e.message);

			return res.status(500).json({
				status: "failed",
				message: "Internal server error",
			});
		}
	}

	/**
	 * Search alerts based on status.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async searchAlert(req, res) {
		try {
			let { status } = req.query;

			// Validate status
			const validStatuses = ["DROWSY", "DISTRACTED", "SMOKING", "PHONE"];
			if (status && !validStatuses.includes(status)) {
				return res.status(400).json({
					status: "failed",
					message: "Invalid status value",
				});
			}

			status = status ? String(status) : undefined;

			const alerts = await this.#service.searchAlerts(status);

			return res.status(200).json({
				status: {
					code: "200",
					message: "success",
				},
				data: alerts.map((alert) => ({
					alertId: alert.id,
					time: alert.created_at.toISOString(),
					vehicleId: alert.vehicle_id,
					status: alert.status,
				})),
			});
		} catch (e) {
			if (e instanceof ClientError) {
				return res.status(e.statusCode).json({
					status: "failed",
					message: e.message,
				});
			}

			this.#logger.error(e.message);

			return res.status(500).json({
				status: "failed",
				message: "Internal server error",
			});
		}
	}
}

module.exports = AlertsController;
