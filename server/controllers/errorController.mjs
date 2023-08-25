import AppError from "../utils/appError.mjs";
// handleCastErrorDB: handles the CastError from the database
const handleCastErrorDB = (err) => {
  // console.log(err.apth)
  const message = `Invalid id: ${err.value}.`;
  return new AppError(message, 400);
};

// handleDuplicateFieldsDB: handles the duplicate fields error from the database
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// handleValidationErrorDB: handles the validation error from the database
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

// handleJWTError: handles the invalid token error
const handleJWTError = () =>
  new AppError("Invalid token, Please login again!", 401);

// handleJWTExpiredError: handles the expired token error
const handleJWTExpiredError = () =>
  new AppError("Token expired, Please login again!", 401);

// sendErrorDev: sends the error in the development environment
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// sendErrorProd: sends the error in the production environment
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown error: don't leak error details
    // console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

// exports golbal error handler function
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = err;
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(error, res);
  }
};
