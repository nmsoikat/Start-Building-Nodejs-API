const { AuthService } = require('../../services');
const { APISuccessResponse } = require('../../utils');
const catchAsync = require('../../utils/catch-async');

exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const data = { username, email, password }

  const newUser = await AuthService.signup(data)

  return APISuccessResponse(res, newUser)
})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const data = { email, password }

  const loginUser = await AuthService.login(res, data)

  return APISuccessResponse(res, loginUser)
})