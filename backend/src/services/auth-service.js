const {userRepository} = require('../database/repository')

const signup = async (data) => {
  const user = await userRepository.createUser(data)
  return user;
}

module.exports = {
  signup
}