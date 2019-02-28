const uuid = require('uuid')
class Lawyer
{
    constructor (name , email ,password ,  mobile_number, Social_Security_Number, salary ,birth_Date,yearsOfExperience )

    {
        this.name = name;
        
        this.email = email;
        this.password = password;
        this.mobile_number = mobile_number;
        this.Social_Security_Number = Social_Security_Number;
        this.salary = salary;
        this.birth_Date = birth_Date;
        this.yearsOfExperience = yearsOfExperience;
        this.uuid = uuid.v4();
    }
}
module.exports = Lawyer