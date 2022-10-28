const { STATUS_CODE } = require("../config/constant");

class AppError extends Error {
  constructor(message, statusCode) {
    super(message)

    this.name = "App Error"
    this.statusCode = statusCode;
    this.status = 'fail';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor)
  }
}

class ServerError extends AppError {
  constructor() {
    super()
    this.name = "Internal Error"
    this.isOperational = false;
  }
}

module.exports = {
  AppError,
  ServerError
}