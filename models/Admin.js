const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birthDate: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    required: true
  }

})
module.exports = mongoose.model('admins', adminSchema)
