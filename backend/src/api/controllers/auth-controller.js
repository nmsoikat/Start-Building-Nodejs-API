const { AuthService } = require('../../services');
const { APISuccessResponse } = require('../../utils');
const catchAsync = require('../../utils/catch-async');

exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = await AuthService.signup({ username, email, password })

  return APISuccessResponse(res, newUser)
})

exports.login = catchAsync(async (req, res, next) => {

  const { email, password } = req.body;

  const loginUser = await AuthService.login(res, { email, password })

  return APISuccessResponse(res, loginUser)
})