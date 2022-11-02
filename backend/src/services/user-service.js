const { userRepository } = require("../database/repository")

const getAllUser = async () => {
  try {
    return userRepository.findUser()
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllUser
}