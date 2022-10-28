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
    res.status(500).send({
      status: "fail",
      message: "Something went very wrong!"
    })
  }
}


module.exports = async (err, req, res, next) => {
  //if unknown error 
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    console.log(err);
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    console.log(err);
    const copyError = { ...err }

    sendErrorProd(copyError, res)
  }
}