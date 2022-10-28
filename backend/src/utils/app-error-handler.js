const sendErrorDev = (err, res) => {
  console.log(err);

  res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  })
}

const sendErrorProd = (err, res) => {
  // console.log(err);

  if(err.isOperational){
    res.status(err.statusCode).send({
      status: err.status,
      message: err.message,
    })
  }else{
    res.status(500).send({
      status: "fail",
      message: "Something went very wrong!"
    })
  }
}


module.exports.ErrorHandler = async (err, req, res, next) => {  
  // we will wrap all code using try-case block. so status code will be there
  // err.statusCode = err.statusCode || 500,
  // err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    console.log(err);
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    const copyError = { ...err }
    
    sendErrorProd(copyError, res)
  }
}