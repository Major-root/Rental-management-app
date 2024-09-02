const express = require("express");
const appRouter = require("./router");
const AppError = require("./src/utils/appError");
const errorHandler = require("./src/controllers/error/error");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

appRouter(app);

app.use("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} is not found in my server`, 400));
});

app.use(errorHandler);

module.exports = app;
