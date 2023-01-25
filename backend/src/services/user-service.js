const { UserRepository } = require("../database/repository")

const UserService = {
  async getAllUser(){
    return UserRepository.findUser()
  }
}


module.exports = UserService