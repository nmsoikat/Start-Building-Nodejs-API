const router = require('express').Router()
const userController = require('../controllers/user-controller');
const protect = require('../middlewares/protect');
const {UserPath} = require('./app-route-path')

router.route(UserPath.USER).get(protect, userController.getAllUser)


module.exports = router;