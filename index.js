import express from "express";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import { logger } from "./middlewares/logger.js";
import morgan from "morgan";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorHandler.js";
import { requestTime } from "./middlewares/requestTime.js";
import { pool } from "./config/db.js";
import { setupSwagger } from "./config/swaggerConfig.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);
app.use(morgan("dev"));
app.use(helmet());

//global middleware
app.use(requestTime);
app.set("json spaces", 2);

setupSwagger(app);

app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server connected at ${PORT} port!`);
});
