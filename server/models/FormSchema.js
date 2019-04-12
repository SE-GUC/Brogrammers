const mongoose = require('mongoose')
const Schema = mongoose.Schema


const FormSchema = new Schema({
    companyType:String,
    Schema:Object
})

module.exports = mongoose.model('formSchema', FormSchema)
