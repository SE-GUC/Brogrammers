const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true
    }

});
module.exports = Admin = mongoose.model('admins', adminSchema);




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

module.exports= Admin