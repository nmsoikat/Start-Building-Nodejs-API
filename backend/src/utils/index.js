const bcrypt = require('bcryptjs')

module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt()
}

module.exports.GenerateHashedPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt)
}

module.exports.APISuccessResponse = (res, data) => {
  res.status(200).json({
    status: 'success',
    data
  })
}

module.exports.FormatData = (data) => {
  if (data) {
    return data;
  } else {
    console.log(error);
  }
}