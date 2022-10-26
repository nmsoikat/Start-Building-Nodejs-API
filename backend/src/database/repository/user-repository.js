const { User } = require('../models')

const createUser = async (data) => {
  try {
    const user = await User.create(data);
    return user
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser
}