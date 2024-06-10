const { PrismaClient } = require("@prisma/client");
const { default: helmet } = require("helmet");
const dotenv = require("dotenv");
const httpContext = require("express-http-context");
const cors = require("cors");
const express = require("express");
const Logger = require("./logger/Logger");
const JWT = require("./token-manager/JWT");
const TokenRepository = require("./repository/TokenRepository");
const Middleware = require("./middleware/Middleware");
const UserRepository = require("./repository/UserRepository");
const AuthService = require("./service/AuthService");
const AuthValidator = require("./validator/AuthValidator");
const AuthController = require("./controller/AuthController");
const setRoutes = require("./routes");

/**
 * Entry point of the application
 * @async
 */
async function main() {
	try {
		if (process.env.NODE_ENV !== "production") {
			dotenv.config();
		}

		const host = process.env.HTTP_HOST || "localhost";
		const port = parseInt(process.env.HTTP_PORT) || 3000;

		const tokenSecret = process.env.TOKEN_SECRET;
		const tokenDuration = process.env.TOKEN_DURATION;

		const prisma = new PrismaClient();
		const logger = new Logger();

		await prisma.$connect();
		logger.info("connected to the database");

		const app = express();
		app.use(cors());
		app.use(helmet());
		app.use(express.json());
		app.use(logger.middleware());
		app.use(httpContext.middleware);

		const tokenRepo = new TokenRepository(prisma);
		const jwt = new JWT(tokenRepo, tokenSecret, tokenDuration);

		const middleware = new Middleware(jwt, logger);

		const userRepo = new UserRepository(prisma);
		const authSvc = new AuthService(jwt, userRepo);
		const authVldtr = new AuthValidator();
		const authCtrl = new AuthController(authSvc, authVldtr, logger);

		setRoutes(app, middleware, authCtrl);

		app.listen(port, host, () => {
			logger.info(`Server listening at http://${host}:${port}`);
		});
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}

main();
