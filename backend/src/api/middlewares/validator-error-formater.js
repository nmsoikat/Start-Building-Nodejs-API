const { validationResult } = require('express-validator');
const { ServerError, ValidationError } = require('../../utils/app-error');

const formatExpressValidatorError = (req, res, next) => {
  try {
    const result = validationResult(req)

    if (result.errors.length) {
      return next(new ValidationError(result.array()))
    }
  
    next();
  } catch (error) {
    throw new ServerError("Validation Result Checking Fail")
  }

}

module.exports = {
  formatExpressValidatorError
}