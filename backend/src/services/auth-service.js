const { userRepository } = require('../database/repository');
const { FormatData, GenerateSalt, GenerateHashedPassword } = require('../utils');

const signup = async (data) => {
  try {
    const { username, email, password } = data;

    const salt = await GenerateSalt()

    const passwordHashed = await GenerateHashedPassword(password, salt)

    const user = await userRepository.createUser({ username, email, password: passwordHashed })

    return FormatData(user);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  signup
}