const mongoose = require('mongoose')
const Schema = mongoose.Schema


const FormSchema = new Schema({
    legalCompanyForm:String,
    formSchema:Object
})

module.exports = mongoose.model('formSchema', FormSchema)
