const { STATUS_CODE } = require("../config/constant")
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
    console.log('#Generic Error Log:',err);
    
    res.status(STATUS_CODE.INTERNAL_ERROR).send({
      status: "fail",
      message: "Something went very wrong!"
    })
  }
}

// production error handlers
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, STATUS_CODE.BAD_REQUEST)
}

const handleDuplicateFieldErrorDB = (err) => {
  try {
    const value = Object.entries(err.keyValue)[0][1]
    const message = `Duplicate field value: ${value}. Please use another value!`
    return new AppError(message, STATUS_CODE.BAD_REQUEST)
  } catch (error) {
    return error
  }
}

const validationErrorDB = (err) => {
  try {
    const errors = Object.entries(err.errors)

    let formattedErrors = ''
    for(let [key, value] of errors){
      formattedErrors += `${key}:${value.message.split(`\`${key}\``)[1]} \n `
      //'username:Please provide username \n password:Please provide password \n '
      //split by \n for proper message
    }

    return new AppError(formattedErrors, STATUS_CODE.UN_PROCESSABLE_ENTITY)
  } catch (error) {
    return error
  }
}

module.exports = async (err, req, res, next) => {
  //if unknown error 
  err.statusCode = err.statusCode || STATUS_CODE.INTERNAL_ERROR;
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    console.log(err);
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    console.log("#ERROR-LOG:", err);

    let copyError = { ...err }

    // Three mongoose error //make as operational err for production
    //1) _id value is invalid
    if (err.name === "CastError") {
      copyError = handleCastErrorDB(copyError)
    }

    //2) duplicate value  //err from mongodb 
    if (copyError.code === 11000) {
      copyError = handleDuplicateFieldErrorDB(copyError)
    }

    //3) db validation failed
    if (err.name === "ValidationError") {
      copyError = validationErrorDB(copyError)
    }


    sendErrorProd(copyError, res)
  }
}