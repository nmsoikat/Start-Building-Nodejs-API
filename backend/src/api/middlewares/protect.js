const { promisify } = require('util')
const jwt = require('jsonwebtoken');
const { AppError } = require('../../utils/app-error');

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
    

    //check user still exist

    next()
  } catch (error) {
    next(error)
  }
}