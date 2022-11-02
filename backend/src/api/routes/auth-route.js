const router = require('express').Router();
const {authController} = require('../controllers');
const { SignupValidatorSchema, LoginValidatorSchema } = require('../validators/user-validator-schema');
const { formatExpressValidatorError } = require('../middlewares/validator-error-formater');
const {AuthPath} = require('./app-route-path')

router.post(AuthPath.SIGNUP, SignupValidatorSchema, formatExpressValidatorError, authController.signup)
router.post(AuthPath.LOGIN, LoginValidatorSchema, formatExpressValidatorError, authController.login)

module.exports = router;