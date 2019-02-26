const uuid = require('uuid');

class Admin{
    constructor(name, email, phone, gender, joinDate, username, password, birthDate, id)
    {
        this.username = username;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.joinDate = joinDate;
        this.email = email;
        this.phone = phone;
        this.birthDate = birthDate;
        this.id = uuid.v4();
    };
}

module.exports = Admin