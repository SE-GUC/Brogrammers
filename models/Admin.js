const uuid=require('uuid');
class Admin{

constructor(name,email,phone,gender,joinDate,username,password,birthDate){
this.name=name;
this.email=email;
this.phone=phone;

this.gender=gender;
this.joinDate=joinDate;
this.username=username;
this.password=password;
this.birthDate=birthDate;
this.id = uuid.v4();
    };
};

module.exports= Admin