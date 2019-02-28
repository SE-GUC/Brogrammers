
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvestorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    nationality:{
        type:String,
        required:true
    },
    idType:{
        type:String,
        required:true
    },
    idNumber:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    telephone:{
        type:Number,
        required:true
    },
    fax:{
        type:String,
        required:true
    },
    mail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    
})

module.exports = Investor = mongoose.model('investors', InvestorSchema)
