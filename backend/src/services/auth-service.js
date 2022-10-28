const { userRepository } = require('../database/repository');
const { CheckDataIsEmpty, GenerateSalt, GenerateHashedPassword } = require('../utils');
const { ServerError } = require('../utils/app-error');

const signup = async (data) => {
  try {
    const { username, email, password } = data;

    const salt = await GenerateSalt()

    const passwordHashed = await GenerateHashedPassword(password, salt)

    const user = await userRepository.createUser({ username, email, password: passwordHashed })

    return CheckDataIsEmpty(user);
  } catch (error) {
    throw new ServerError(error.message)
  }
}

module.exports = {
  signup
}