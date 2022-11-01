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
  uniqueTest: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = model("User", UserSchema)