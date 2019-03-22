const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
    regulationLaw: {
        type:String,
        required:true
    },
    legalCompanyForm: {
        type:String,
        required:true
    },
    nameInArabic: { 
        type:String,
        required:true
    },
    nameInEnglish: {
        type:String,
        required:false
    },
    governerateHQ: { 
        type:String,
        required:true
    },
    cityHQ: {
        type:String,
        required:true
    },
    addressHQ: { 
        type:String,
        required:true
    },
    telephoneHQ: {
        type: Number
    },
    faxHQ: {
        type: Number
    },
    capitalCurrency: { 
        type:String,
        required:true
    },
    capital:{ 
        type:Number,
        required:true,
        min:50000
    },
    investorName: { 
        type:String,
        required:true
    },
    investorType:{ 
        type:String,
        required:false
    },
    investorSex: { 
        type:String,
        required:true
    },
    investorNationality: { 
        type:String,
        required:true
    },
    investorIdentificationType: { 
        type:String,
        required:true
    },
    investorIdentificationNumber:{ 
        type:String,
        required:true
    },
    investorBD: { 
        type:Date,
        required:true
    },
    investorAddress: { 
        type:String,
        required:true
    },
    investorTelephone: { 
        type:Number
    },
    investorFax:{ 
        type:Number
    },
    investorEmail: { 
        type:String
    },
    managers: { 
        type:[String]
    },
    status:{
        type:String,
        default:"PendingLawyer",
        enum: ["PendingLawyer","PendingReviewer","RejectedLawyer","RejectedReviewer","Accepted"]
    },
    lawyer:{
        type:String
        //Lawyer SSN
    },
    lawyerComment:{
        type:String
    },
    reviewer:{
        type:String
        //should be type reviewer
    },
    reviewerComment:{
        type:String
    }


})

module.exports = Company = mongoose.model('companys', CompanySchema)