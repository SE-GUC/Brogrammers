const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const reviewerSchema = new Schema({

  ssn: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
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
  yearsOfExperience: {
    type: Number,
    reqired: true
  },
  age: {
    type: Number,
    required: true
  },
  birth: {
    type: String,
    required: true
  },
  task: {
    type: Number
  }

})

module.exports = mongoose.model('reviewer', reviewerSchema)
