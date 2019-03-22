const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const companies = require('../models/Company')
//const objectID=mongoose.Schema.Types.ObjectId.companies;
//const companies2= require('../routes/api/company')
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
        type: String, 
        required: true
    },
    Social_Security_Number: {
        type: String,
        required: true
    },
    salary: {
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
