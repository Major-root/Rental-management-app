const AppError = require("../../utils/appError");

const handleValidationError = (err) => {
  const message = err.errors[0].message;
  return new AppError(message, 400);
};

const handleUniqueConstraint = (err) => {
  const message = err.errors[0].message;
  return new AppError(message, 400);
};

const handleCelebrateError = (err) => {
  const message = err.details.get("body").details[0].message;
  return new AppError(message, 400);
};
const sendDevErr = (err, res) => {
  console.log("error is ", err);
  return res.status(err.statusCode).json({
    status: false,
    message: err.message,
    err: err,
  });
};
const sendErrorProd = (err, req, res) => {
  // console.log(err.details instanceof Map);
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  //   console.error("ERROR 💥", err);
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevErr(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if (error.name === "SequelizeValidationError") {
      error = handleValidationError(error);
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      error = handleUniqueConstraint(error);
    }
    if (error.details instanceof Map) {
      error = handleCelebrateError(error);
    }
    sendErrorProd(error, req, res);
  }
};
