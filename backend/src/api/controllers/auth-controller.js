const { authService } = require('../../services');
const { APISuccessResponse } = require('../../utils');
const { ServerError } = require('../../utils/app-error');

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await authService.signup({ username, email, password })

    return APISuccessResponse(res, newUser)
  } catch (error) {
    return next(new ServerError(error.message))
  }
}


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const loginUser = await authService.login({email, password})

    return APISuccessResponse(res, loginUser)
  } catch (error) {
    return next(new ServerError(error.message))
  }
}

module.exports = {
  signup,
  login
}