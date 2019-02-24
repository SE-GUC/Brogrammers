const uuid = require('uuid')

class Manager{
    constructor(name, type, sex, nationality, identificationType, identificationNumber, birthDate, address, managerialPosition ){
        this.name=name;
        this.type=type;
        this.sex=sex;
        this.nationality=nationality;
        this.identificationType=identificationType;
        this.identificationNumber=identificationNumber;
        this.birthDate=birthDate;
        this.address=address;
        this.managerialPosition=managerialPosition;
        this.id = uuid.v4();
    }
}
module.exports = Manager;