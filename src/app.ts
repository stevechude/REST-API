import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const port = config.get<number>("port");

//Connect DB
connect();

const app = express();

//body-parser
app.use(express.json())

// middleware
app.use(deserializeUser)

app.listen(port, () => {
  logger.info(`App is running at http://localhost:${port}`);

  routes(app)
});
