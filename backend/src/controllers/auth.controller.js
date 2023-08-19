const { AuthService } = require('../services');
const { APISuccessResponse } = require('../utils');
const { ServerError } = require('../utils/app-error');
const catchAsync = require('../utils/catch-async');

exports.signup = catchAsync(async (req, res, next) => {
  try {
    const newUser = await AuthService.signup(req)
    return APISuccessResponse(res, newUser)
  } catch (error) {
    next(error)
  }
})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const data = { email, password }

  const loginUser = await AuthService.login(res, data)

  return APISuccessResponse(res, loginUser)
})