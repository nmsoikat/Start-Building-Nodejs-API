const { UserService } = require("../../services")
const { APISuccessResponse } = require("../../utils")

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await UserService.getAllUser()
    
    APISuccessResponse(res, users)
  } catch (error) {
    next(error)
  }
}