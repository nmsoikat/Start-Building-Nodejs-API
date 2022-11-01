const { body } = require('express-validator')
const { findOneUser } = require('../../database/repository/user-repository');
const { ServerError } = require('../../utils/app-error');

const commonSchema = [
  // body('email').custom(async (value) => {
  //   try {
  //     if (await findOneUser({ email: value })) {
  //       throw new Error("Email already in use")
  //     }
  //     return true;
  //   } catch (error) {
  //     throw new ServerError(error)
  //   }
  // }),
  body('password').isLength({ min: 6 }).withMessage("Password will be at least 6 character long"),
]

const SignupValidatorSchema = [
  ...commonSchema,
  body('username').notEmpty().withMessage("Please provide username"),
  body('passwordConfirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirm dose not match password")
    }

    return true;
  })
]

const LoginValidatorSchema = [
  ...commonSchema
]

module.exports = {
  SignupValidatorSchema,
  LoginValidatorSchema
}