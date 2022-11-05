const { User } = require('../models')

module.exports.createUser = async (data) => {
  const user = await User.create(data);
  user.password = undefined; //remove password from the output
  return user; //if now use user.save() // password filed will deleted
}

module.exports.findUser = async (query = {}) => {
  return await User.find(query)
}

module.exports.findOneUser = async (query) => {
  return await User.findOne(query)
}

module.exports.findOneUserWithPass = async (query) => {
  return await User.findOne(query).select('+password')
}

module.exports.findUserById = async (id) => {
  return await User.findById(id)
}