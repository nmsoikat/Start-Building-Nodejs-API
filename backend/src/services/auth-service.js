const { STATUS_CODE } = require('../config/constant');
const { UserRepository } = require('../database/repository');
const { CheckDataIsEmpty, GenerateSalt, GenerateHashedPassword, CompareHashedPassword, GenerateSignature } = require('../utils');
const { AppError } = require('../utils/app-error');

const AuthService = {

  async signup(data) {
    const { username, email, password } = data;

    const salt = await GenerateSalt()

    const passwordHashed = await GenerateHashedPassword(password, salt)

    const user = await UserRepository.createUser({ username, email, password: passwordHashed })

    return CheckDataIsEmpty(user);
  },

  async login(res, data) {
    const { email, password } = data;

    const user = await UserRepository.findOneUserWithPass({ email })

    if (!user || !(await CompareHashedPassword(password, user.password))) {
      throw new AppError("Incorrect email or password", STATUS_CODE.UN_AUTHORIZED)
    }

    user.password = undefined; //remove password filed from output

    const token = await GenerateSignature({ id: user._id })

    //set cookie in response //http-only:true
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + process.env.LOGIN_EXPIRE * 24 * 60 * 60 * 1000)
    }
    if (process.env.NODE_ENV === 'production') {
      cookieOptions.secure = true
    }

    res.cookie('jwt-token', token, cookieOptions)

    return { user, token };
  }
}

module.exports = AuthService