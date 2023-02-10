const { UserRepository } = require("../database/repository")

const UserService = {
  async getAllUser(req) {
    return await UserRepository.findUser()
  }
}


module.exports = UserService