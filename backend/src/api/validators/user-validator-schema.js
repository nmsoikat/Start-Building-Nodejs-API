const { body } = require('express-validator')

const UserValidatorSchema = [
  body('username').notEmpty().withMessage("Please provide username"),
  body('email').isEmail().withMessage("Please provide valid email"),
  body('password').isLength({min: 6}).withMessage("Password will be at least 6 character long"),
  body('passwordConfirm').custom((value, {req}) => {
    if(value !== req.body.password){
      throw new Error("Password confirm dose not match password")
    }

    return true;
  })
]

module.exports = {
  UserValidatorSchema
}