const { StatusCode } = require("../constant");

class AppError extends Error {
  constructor(message, statusCode) {
    super(message)

    this.name = "App Error"
    this.status = 'fail';
    this.statusCode = statusCode || StatusCode.BAD_REQUEST;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor)
  }
}

class ValidationError extends AppError {
  constructor(errors) {
    // console.log(errors);

    let formattedErrors = ''
    for (let err of errors) {
      formattedErrors += `${err.param}:${err.msg} \n `
      //'username:Please provide username \n password:Please provide password \n '
      //split by \n for proper message
    }

    super(formattedErrors)

    this.name = "Validation Error"
    this.statusCode = StatusCode.UN_PROCESSABLE_ENTITY;
  }
}

class ServerError extends AppError {
  constructor(error, message = "Internal Server Error") {
    super(message)

    this.name = "Internal Error"
    this.statusCode = StatusCode.INTERNAL_ERROR;

    this.isOperational = false;
  }
}


module.exports = {
  AppError,
  ServerError,
  ValidationError
}