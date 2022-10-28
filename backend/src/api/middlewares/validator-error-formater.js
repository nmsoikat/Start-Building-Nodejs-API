const { validationResult } = require('express-validator')

const formatExpressValidatorError = (req, res, next) => {
  const vresult = validationResult(req)

  if (vresult.errors.length) {
    console.log(vresult.errors);
    throw "vlidation error"
  }

  console.log(vresult);
}

module.exports = {
  formatExpressValidatorError
}