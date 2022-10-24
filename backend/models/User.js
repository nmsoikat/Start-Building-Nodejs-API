const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  username: String,
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
})

module.exports.User = model("User", UserSchema)