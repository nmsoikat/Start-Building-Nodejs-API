const { ServerError } = require('../../utils/app-error');
const { User } = require('../models')

module.exports.createUser = async (data) => {
  try {
    const user =  await User.create(data);
    user.password = undefined; //skip password filed
    return user; //if now use user.save() // password filed will empty
  } catch (error) {
    throw new ServerError(error.message)
  }
}

module.exports.findOneUser = async (query) => {
  try {
    return await User.findOne(query)
  } catch (error) {
    throw new ServerError(error.message)
  }
}

module.exports.findOneUserWithPass = async (query) => {
  try {
    return await User.findOne(query).select('+password')
  } catch (error) {
    throw new ServerError(error.message)
  }
}

module.exports.findUserById = async (id) => {
  try {
    return await User.findById(id)
  } catch (error) {
    throw new ServerError(error.message)
  }
}