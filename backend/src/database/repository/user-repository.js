const { User } = require('../models')

const UserRepository = {
  async createUser(data) {
    const user = await User.create(data);
    user.password = undefined; //remove password from the output
    return user; //if now use user.save() // password filed will deleted
  },

  async findUser(query = {}) {
    return await User.find(query)
  },

  async findOneUser(query) {
    return await User.findOne(query)
  },

  async findOneUserWithPass(query) {
    return await User.findOne(query).select('+password')
  },

  async findUserById(id) {
    return await User.findById(id)
  }
}

module.exports = UserRepository