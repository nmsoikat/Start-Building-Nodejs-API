const { UserRepository } = require("../repository")

const UserService = {
  async getAllUser(req) {
    return await UserRepository.findUser()
  }
}


module.exports = UserService