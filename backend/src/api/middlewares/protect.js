const { promisify } = require('util')
const jwt = require('jsonwebtoken');
const { AppError } = require('../../utils/app-error');
const { userRepository } = require("../../database/repository");
const { STATUS_CODE } = require('../../config/constant');

module.exports = async (req, res, next) => {
  try {
    //Getting Token And Check
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Your are not logged in!. Please login to get access.', 401));
    }

    //Verify
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
    
    //Check user still exist
    const currentUser = await userRepository.findUserById(decoded.id)
    if(!currentUser){
      return next(new AppError('The user belonging to this token dose no longer exist.', STATUS_CODE.UN_AUTHORIZED))
    }

    //Check user changed password after the token was issued
    if(currentUser.checkChangePasswordAfter(decoded.iat)){
      return next(new AppError('User recently changed password! Please login again.', STATUS_CODE.UN_AUTHORIZED))
    }


    //Grant access to protected route
    req.user = currentUser
    next()
  } catch (error) {
    next(error)
  }
}