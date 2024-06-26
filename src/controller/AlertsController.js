/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {import('../service/AlertService')} AlertService
 * @typedef {import('../validator/AlertValidator')} AlertValidator
 */

const autoBind = require("auto-bind");

class AlertsController {
	/** @type {AlertService} */
	#service;
	/** @type {AlertValidator} */
	#validator;

	/**
	 * Creates a new AlertsController instance.
	 * @param {AlertService} service - The alert service instance.
	 * @param {AlertValidator} validator - The alert validator instance.
	 */
	constructor(service, validator) {
		this.#service = service;
		this.#validator = validator;

		autoBind(this);
	}

	/**
	 * List all alerts.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @param {NextFunction} next - The next function.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async listAlerts(req, res, next) {
		try {
			const query = {
				limit: req.query.limit
					? parseInt(req.query.limit.toString(), 10)
					: undefined,
				offset: req.query.offset
					? parseInt(req.query.offset.toString(), 10)
					: undefined,
			};

			this.#validator.validateListAlertsQuery(query);
			this.#validator.validateListAlertsParams({
				vehicle_id: req.params.vehicle_id,
				video_id: req.params.video_id,
			});

			const alerts = await this.#service.listAlerts(
				req.params.vehicle_id,
				req.params.video_id,
				query,
			);

			return res.status(200).json({
				status: "success",
				data: alerts,
			});
		} catch (e) {
			next(e);
		}
	}

	/**
	 * Get alert by ID.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @param {NextFunction} next - The next function.
	 * @returns {Promise<Response>} - A promise that resolves to the response object.
	 * @async
	 */
	async getAlert(req, res, next) {
		try {
			this.#validator.validateGetDeleteAlertParams({
				vehicle_id: req.params.vehicle_id,
				video_id: req.params.video_id,
				alert_id: req.params.alert_id,
			});

			const alert = await this.#service.getAlertByUuid(
				req.params.vehicle_id,
				req.params.video_id,
				req.params.alert_id,
			);

			return res.status(200).json({
				status: {
					code: "200",
					message: "success",
				},
				data: alert,
			});
		} catch (e) {
			next(e);
		}
	}
}

module.exports = AlertsController;
