const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  username: String,
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
    select: false
  }
})

module.exports = model("User", UserSchema)