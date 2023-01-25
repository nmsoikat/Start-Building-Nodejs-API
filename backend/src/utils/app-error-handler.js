const { StatusCode } = require("../constant")
const { AppError } = require("./app-error")

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  })
}

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).send({
      status: err.status,
      message: err.message,
    })
  } else {
    console.log('#PROD-Generic-Error-Log:', err);

    res.status(StatusCode.INTERNAL_ERROR).send({
      status: "fail",
      message: "Something went very wrong!"
    })
  }
}

// production error handlers
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, StatusCode.BAD_REQUEST)
}

const handleDuplicateFieldErrorDB = (err) => {
  try {
    const value = Object.entries(err.keyValue)[0][1]
    const message = `Duplicate field value: ${value}. Please use another value!`
    return new AppError(message, StatusCode.BAD_REQUEST)
  } catch (error) {
    return error
  }
}

const validationErrorDB = (err) => {
  try {
    const errors = Object.entries(err.errors)

    let formattedErrors = ''
    for (let [key, value] of errors) {
      formattedErrors += `${key}:${value.message.split(`\`${key}\``)[1]} \n `
      //'username:Please provide username \n password:Please provide password \n '
      //split by \n for proper message
    }

    return new AppError(formattedErrors, StatusCode.UN_PROCESSABLE_ENTITY)
  } catch (error) {
    return error
  }
}

const jsonWebTokenError = (err) => {
  return new AppError("Invalid token! Please login again", StatusCode.UN_AUTHORIZED)
}

const jsonWebTokenExpiredError = (err) => {
  return new AppError("Your token has expired! Please login again", StatusCode.UN_AUTHORIZED)
}

module.exports = async (err, req, res, next) => {
  //if unknown error 
  err.statusCode = err.statusCode || StatusCode.INTERNAL_ERROR;
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    console.log("#Dev-Log:", err);
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    console.log("#PROD-ERROR-LOG:", err);

    let copyError = { ...err }
    copyError.name = err.name;
    copyError.message = err.message;

    // console.log("#PROD-ERROR-LOG-Name-Message:", copyError.name, copyError.message);

    // Three mongoose error //make as operational err for production
    //1) _id value is invalid
    if (copyError.name === "CastError") {
      copyError = handleCastErrorDB(copyError)
    }

    //2) duplicate value  //err from mongodb 
    if (copyError.code === 11000) {
      copyError = handleDuplicateFieldErrorDB(copyError)
    }

    //3) db validation failed
    if (copyError.name === "ValidationError") {
      copyError = validationErrorDB(copyError)
    }

    //JWT Invalid
    if (copyError.name === "JsonWebTokenError") {
      copyError = jsonWebTokenError()
    }

    //JWT Expired
    if (copyError.name === "TokenExpiredError") {
      copyError = jsonWebTokenExpiredError()
    }


    sendErrorProd(copyError, res)
  }
}