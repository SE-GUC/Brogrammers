const uuid = require('uuid')

class Investor {
    constructor(name, type, gender, nationality, idType, idNumber, dob, address, telephone, fax, mail, password) {
    this.name = name;
    this.type = type;
    this.gender = gender; 
    this.nationality = nationality; 
    this.idType = idType; 
    this.idNumber = idNumber; 
    this.dob = dob;
    this.address = address; 
    this.telephone = telephone; 
    this.fax = fax;
    this.mail = mail; 
    this.password = password;
    this.id = uuid.v4();
    };
}

module.exports = Investor
