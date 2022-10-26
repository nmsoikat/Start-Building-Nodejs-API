const { authService } = require('../../services');
const { APISuccessResponse } = require('../../utils');
const { validationResult } = require('express-validator')

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const vresult = validationResult(req)
    if(vresult.errors.length){
      console.log(vresult.errors);
      throw "vlidation error"
    }

    const newUser = await authService.signup({ username, email, password })

    return APISuccessResponse(res, newUser)
  } catch (error) {

    console.log(error);
  }
}


const login = async (req, res, next) => {

}

module.exports = {
  signup,
  login
}