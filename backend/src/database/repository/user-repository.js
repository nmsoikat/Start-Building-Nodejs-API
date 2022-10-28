const { ServerError } = require('../../utils/app-error');
const { User } = require('../models')

const createUser = async (data) => {
  try {
    return await User.create(data);
  } catch (error) {
    throw new ServerError("Mongodb: User create time error")
  }
}

module.exports = {
  createUser
}