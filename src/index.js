const { PrismaClient } = require("@prisma/client");
const { default: helmet } = require("helmet");
const dotenv = require("dotenv");
const httpContext = require("express-http-context");
const cors = require("cors");
const express = require("express");
const setRoutes = require("./routes");
const JWT = require("./token-manager/JWT");
const Logger = require("./logger/Logger");
const Middleware = require("./middleware/Middleware");
const AlertRepository = require("./repository/AlertRepository");
const TokenRepository = require("./repository/TokenRepository");
const UserRepository = require("./repository/UserRepository");
const VehicleRepository = require("./repository/VehicleRepository");
const VideoRepository = require("./repository/VideoRepository");
const AlertService = require("./service/AlertService");
const AuthService = require("./service/AuthService");
const VehicleService = require("./service/VehicleService");
const VideoService = require("./service/VideoService");
const AlertValidator = require("./validator/AlertValidator");
const AuthValidator = require("./validator/AuthValidator");
const VehicleValidator = require("./validator/VehicleValidator");
const VideoValidator = require("./validator/VideoValidator");
const AlertController = require("./controller/AlertsController");
const AuthController = require("./controller/AuthController");
const VehicleController = require("./controller/VehicleController");
const VideoController = require("./controller/VideoController");

/**
 * Entry point of the application
 * @async
 */
async function main() {
	if (process.env.NODE_ENV !== "production") {
		dotenv.config();
	}

	const host = process.env.HTTP_HOST || "localhost";
	const port = parseInt(process.env.HTTP_PORT) || 3000;

	const tokenSecret = process.env.TOKEN_SECRET;
	const tokenDuration = process.env.TOKEN_DURATION;

	const logger = new Logger();

	const prisma = new PrismaClient();
	await prisma.$connect();
	logger.info("connected to the database successfully");

	const app = express();
	app.use(cors());
	app.use(helmet());
	app.use(express.json());
	app.use(logger.middleware());
	app.use(httpContext.middleware);

	const alertRepo = new AlertRepository(prisma);
	const tokenRepo = new TokenRepository(prisma);
	const userRepo = new UserRepository(prisma);
	const vehicleRepo = new VehicleRepository(prisma);
	const videoRepo = new VideoRepository(prisma);

	const jwt = new JWT(tokenRepo, tokenSecret, tokenDuration);
	const middleware = new Middleware(jwt, logger);

	const alertSvc = new AlertService(alertRepo, videoRepo, vehicleRepo);
	const authSvc = new AuthService(jwt, userRepo);
	const vehicleSvc = new VehicleService(vehicleRepo);
	const VideoSvc = new VideoService(videoRepo, vehicleRepo);

	const alertVldtr = new AlertValidator();
	const authVldtr = new AuthValidator();
	const vehicleVldtr = new VehicleValidator();
	const videoVldtr = new VideoValidator();

	const alertCtrl = new AlertController(alertSvc, alertVldtr);
	const authCtrl = new AuthController(authSvc, authVldtr);
	const vehicleCtrl = new VehicleController(vehicleSvc, vehicleVldtr);
	const videoCtrl = new VideoController(VideoSvc, videoVldtr);

	setRoutes(app, middleware, alertCtrl, authCtrl, vehicleCtrl, videoCtrl);

	app.listen(port, host, () => {
		logger.info(`Server listening at http://${host}:${port}`);
	});
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
