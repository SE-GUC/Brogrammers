const express=require('express');

const uuid=require('uuid');
const router = express.Router();
const Admin= require('../../Models/Admin');
const Joi = require('joi');

const arrayOfAdmins=[
    new Admin("Atef","atef@gmail.com","01005478965","Male","2018-07-23","moatef","1234","1997-07-02"),
    new Admin("Alaa","alaa@gmail.com","01007778965","Male","2018-06-12","alaas","3456","1997-05-15"),
    new Admin("Omar","omar@gmail.com","01006678965","Male","2018-07-08","raed","12345","1997-04-14"),
    new Admin("Waly","waly@gmail.com","01005578965","Male","2018-12-15","walys","5555","1997-08-12"),
    new Admin("Andrew","andrew@gmail.com","01001178965","Male","2018-09-11","andrew","6666","1997-09-09")
    
    
    
    ]
    




    






router.get('/:id',async (req,res)=> {
    const Adminid=req.params.id;
    const adm=arrayOfAdmins.find(Admin=>Admin.id==Adminid);
    res.send(adm);
    
    
    });
    

router.post('/', async (req, res) => {
    const name = req.body.name;
    const id = uuid.v4();
    const email = req.body.email;
    const phone = req.body.phone;
    const birthDate=req.body.birthDate;
    const gender=req.body.gender;
    const joinDate=req.body.joinDate;
    const username=req.body.username;
    const password=req.body.password;




    const schema = {
        name: Joi.string(),
        email: Joi.string(),
        phone: Joi.number(),
        username: Joi.string(),
        password: Joi.string().min(8),
        birthDate: Joi.date(),
        gender: Joi.string(),
        joinDate: Joi.date(),

    }

 const result = Joi.validate(req.body, schema);
    if(result.error) 
    {
        return  res.status(400).send({error: result.error.details[0].message});
    }
else{
   

    var a=new Admin(name,email,phone,gender,joinDate,username,password,birthDate,id);
    arrayOfAdmins.push(a)
    res.send(arrayOfAdmins)
}
});



router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const Admin = arrayOfAdmins.find(Admin => Admin.id == id);
    const index = arrayOfAdmins.indexOf(Admin);
    arrayOfAdmins.splice(index,1);
    res.send(arrayOfAdmins);
});

module.exports = router