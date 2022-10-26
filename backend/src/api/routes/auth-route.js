const router = require('express').Router();
const {authController} = require('../controllers');
const { signupValidation } = require('../validators/user-validators');

router.post('/signup', ...signupValidation(), authController.signup)
router.post('/login', authController.login)


module.exports = router;