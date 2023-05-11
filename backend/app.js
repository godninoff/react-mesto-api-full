import dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { celebrate, Joi } from "celebrate";
import { errors } from "celebrate";
import helmet from "helmet";
import cors from "cors";
import usersRouter from "./routes/users.js";
import cardsRouter from "./routes/cards.js";
import { createUser, login } from "./controllers/users.js";
import auth from "./middlewares/auth.js";
import NotFound from "./errors/NotFound.js";
import errorHandler from "./errors/ErrorHandler.js";
import { requestLogger, errorLogger } from "./middlewares/logger.js";

const { MONGO_URL, PORT = 3002 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mesto", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
    optionsSuccesStatus: 200,
  })
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /^(https?:\/\/)?([а-я0-9_-]{1,}|[a-z0-9_-]{1,})\.([а-я0-9_-]{1,}|[a-z0-9_-]\S{1,})/
      ),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

app.use(auth);
app.use("/", usersRouter);
app.use("/", cardsRouter);

app.use("*", (req, res, next) => {
  next(new NotFound("Запрашиваемый ресурс не найден."));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
