const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ManagerSchema = new Schema({
    name: { 
        type:String,
        required:true
    },
    type:{ 
        type:String,
        required:true
    },
    sex: { 
        type:String,
        required:true
    },
    nationality: { 
        type:String,
        required:true
    },
    identificationType: { 
        type:String,
        required:true
    },
    identificationNumber:{ 
        type:String,
        required:true
    },
    birthDate: { 
        type:Date,
        required:true
    },
    address: { 
        type:String,
        required:true
    },
    managerialPosition: { 
        type:String
    }
})



module.exports = Manager = mongoose.model('managers', ManagerSchema)