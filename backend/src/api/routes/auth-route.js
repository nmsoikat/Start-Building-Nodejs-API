const router = require('express').Router();
const {authController} = require('../controllers');
const { UserValidatorSchema } = require('../validators/user-validator-schema');
const { formatExpressValidatorError } = require('../middlewares/validator-error-formater');

router.post('/signup', UserValidatorSchema, formatExpressValidatorError, authController.signup)
router.post('/login', authController.login)


module.exports = router;