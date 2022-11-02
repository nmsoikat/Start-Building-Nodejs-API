const { userService } = require("../../services")
const { APISuccessResponse } = require("../../utils")

const getAllUser = async (req, res, next) => {
  try {
    const users = await userService.getAllUser()
    APISuccessResponse(res, users)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllUser
}