/**
 * @typedef {import('@prisma/client').videos} videos
 * @typedef {import('@prisma/client').PrismaClient} PrismaClient
 */

/**
 * Repository for video-related operations using Prisma.
 * @class
 */
class VideoRepository {
	/** @type {PrismaClient} */
	#prisma;

	/**
	 * Creates a new VideoRepository instance.
	 * @param {PrismaClient} prisma - The Prisma client instance.
	 */
	constructor(prisma) {
		this.#prisma = prisma;
	}

	/**
	 * Select a video data by UUID.
	 * @param {bigint} vehicleId - The vehicle ID.
	 * @param {string} uuid - The video UUID.
	 * @returns {Promise<videos>} - The video data.
	 * @async
	 */
	async selectVideoByUuid(vehicleId, uuid) {
		const video = await this.#prisma.videos.findUnique({
			where: { vehicle_id: vehicleId, uuid: uuid },
		});

		return video;
	}

	/**
	 * Select all videos.
	 * @param {bigint} vehicleId - The vehicle ID.
	 * @param {{ limit: number, offset: number }} params - The parameters for listing videos with pagination.
	 * @returns {Promise<{ count: number, videos: videos[] }>} - The total count of videos and the videos data.
	 * @async
	 */
	async selectAllVideos(vehicleId, params) {
		const videos = await this.#prisma.videos.findMany({
			where: { vehicle_id: vehicleId },
			orderBy: { created_at: "desc" },
			take: params.limit,
			skip: params.offset,
		});

		const count = await this.#prisma.videos.count({
			where: { vehicle_id: vehicleId },
		});

		return { count, videos };
	}
}

module.exports = VideoRepository;
