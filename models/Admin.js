//const uuid=require('uuid');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
  
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    gender: {
        type: String, 
        required: false
    },
    birthDate: {
        type: [String]
    },
    joinDate: {
        type: [String]
        
    },
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }
})

// class Admin{

// constructor(name,email,phone,gender,joinDate,username,password,birthDate){
// this.name=name;
// this.email=email;
// this.phone=phone;

// this.gender=gender;
// this.joinDate=joinDate;
// this.username=username;
// this.password=password;
// this.birthDate=birthDate;
// this.id = uuid.v4();
//     };
// };


module.exports = Admin = mongoose.model('admins', AdminSchema)