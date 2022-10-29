const { STATUS_CODE } = require('../config/constant');
const { userRepository } = require('../database/repository');
const { CheckDataIsEmpty, GenerateSalt, GenerateHashedPassword, CompareHashedPassword, GenerateSignature } = require('../utils');
const { ServerError, AppError } = require('../utils/app-error');

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

const login = async (data) => {
  const { email, password } = data;

  const user = await userRepository.findOneUserWithPass({ email })

  if (!user || !(await CompareHashedPassword(password, user.password))) {
    throw new AppError("Incorrect email or password", STATUS_CODE.UN_AUTHORIZED)
  }

  user.password = undefined; //skip password filed

  const token = await GenerateSignature({ id: user._id })

  //todo: set http cookie

  return { user, token };
}

module.exports = {
  signup,
  login
}