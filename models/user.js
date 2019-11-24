const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-url')

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: mongoose.SchemaTypes.Url,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)