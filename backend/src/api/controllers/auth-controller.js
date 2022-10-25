const { authService } = require('../../services')

const signup = async (req, res, next) => {

  const { username, email, password } = req.body;
  
  const newUser = await authService.signup({ username, email, password })

  res.json(newUser)
}


const login = async (req, res, next) => {

}

module.exports = {
  signup,
  login
}