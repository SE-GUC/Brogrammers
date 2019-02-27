const uuid=require('uuid')

class reviewer{
    constructor(ssn,name,gender,address,phone,email,password,yearsOfExperience,age,birth,task){
        this.ssn=ssn;
        this.name=name;
        this.gender=gender;
        this.address=address;
        this.phone=phone;
        this.email=email;
        this.password=password;
        this.yearsOfExperience=yearsOfExperience;
        this.age=age;
        this.birth=birth;
        this.task=task;
        this.id=uuid.v4();

    };
    };    
    module.exports=reviewer;
  