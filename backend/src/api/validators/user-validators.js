const { body } = require('express-validator')

module.exports.signupValidation = () => {
  return [
    body('username').exists(),
    body('email').exists(),
    body('password').exists()
  ]
}