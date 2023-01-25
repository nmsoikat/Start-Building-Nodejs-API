const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { StatusCode } = require('../constant')
const { AppError } = require('./app-error')


module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt()
}

module.exports.GenerateHashedPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt)
}

module.exports.CompareHashedPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

module.exports.GenerateSignature = async (payload) => {
  return await jwt.sign(payload, process.env.APP_SECRET, { expiresIn: `${process.env.LOGIN_EXPIRE}d` })
}

module.exports.APISuccessResponse = (res, data) => {
  res.status(StatusCode.OK).json({
    status: 'success',
    data
  })
}

module.exports.CheckDataIsEmpty = (data) => {
  if (data) {
    return data;
  } else {
    throw new AppError("Document Not Found", StatusCode.NOT_FOUND)
  }
}