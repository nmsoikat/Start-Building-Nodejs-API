const { User } = require('../models')

module.exports.createUser = async (data) => {
  try {
    const user =  await User.create(data);
    user.password = undefined; //remove password from the output
    return user; //if now use user.save() // password filed will deleted
  } catch (error) {
    throw error
  }
}

module.exports.findOneUser = async (query) => {
  try {
    return await User.findOne(query)
  } catch (error) {
    throw error
  }
}

module.exports.findOneUserWithPass = async (query) => {
  try {
    return await User.findOne(query).select('+password')
  } catch (error) {
    throw error
  }
}

module.exports.findUserById = async (id) => {
  try {
    return await User.findById(id)
  } catch (error) {
    throw error
  }
}