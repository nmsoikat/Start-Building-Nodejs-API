const { authService } = require('../../services');
const { APISuccessResponse } = require('../../utils');
const catchAsync = require('../../utils/catch-async');

const signup = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = await authService.signup({ username, email, password })

  return APISuccessResponse(res, newUser)
})

const login = catchAsync(async (req, res, next) => {

  const { email, password } = req.body;

  const loginUser = await authService.login(res, { email, password })

  return APISuccessResponse(res, loginUser)
})

module.exports = {
  signup,
  login
}