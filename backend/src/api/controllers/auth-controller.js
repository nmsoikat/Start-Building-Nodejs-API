const { authService } = require('../../services');
const { APISuccessResponse, FormatExpressValidatorError } = require('../../utils');

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await authService.signup({ username, email, password })

    return APISuccessResponse(res, newUser)
  } catch (error) {

    console.log(error);
  }
}


const login = async (req, res, next) => {

}

module.exports = {
  signup,
  login
}