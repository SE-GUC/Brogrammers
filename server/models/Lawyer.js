const mongoose = require('mongoose')
const Schema = mongoose.Schema
const LawyerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: true
  },
  lastName: {
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
  mobileNumber: {
    type: String,
    required: true
  },
  socialSecurityNumber: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  yearsOfExperience: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('lawyer', LawyerSchema)
