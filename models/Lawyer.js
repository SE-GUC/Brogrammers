const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Create the schema
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
    mobile_number: {
        type: Number, 
        required: true
    },
    Social_Security_Number: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    Social_Security_Number: {
        type: Number,
        required: true
    },
    birth_Date: {
        type: Date,
        required: true
    },
  yearsOfExperience: {
        type: Number,
        required: true
    }
})

module.exports = Lawyer = mongoose.model('lawyer', LawyerSchema)
