const router = require('express').Router();
const {authController} = require('../controllers');
const { SignupValidatorSchema, LoginValidatorSchema } = require('../validators/user-validator-schema');
const { formatExpressValidatorError } = require('../middlewares/validator-error-formater');

router.post('/signup', SignupValidatorSchema, formatExpressValidatorError, authController.signup)
router.post('/login', LoginValidatorSchema, formatExpressValidatorError, authController.login)

module.exports = router;