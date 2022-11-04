const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  username: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  passwordChangedAt: {
    type: Date
  }
})

UserSchema.methods.checkChangePasswordAfter = function (jwtIat) {
  if(this.passwordChangedAt){
    // jwtIat as second by default
    const passwordChangedAtAsSecond = parseInt(this.passwordChangedAt.getTime() / 1000, 10)

    return jwtIat < passwordChangedAtAsSecond
  }

  //false means, Password dose not changed
  return false
}

module.exports = model("User", UserSchema)