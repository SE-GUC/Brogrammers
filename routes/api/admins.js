const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();
const Admin = require('../../models/Admin.js');


const arrayOfAdmins=[
    new Admin("Atef","atef@gmail.com","01005478965","Male","2018-07-23","moatef","1234aaaaaaa","1997-07-02"),
    new Admin("Alaa","alaa@gmail.com","01007778965","Male","2018-06-12","alaas","3456bbbbbbb","1997-05-15"),
    new Admin("Omar","omar@gmail.com","01006678965","Male","2018-07-08","raed","12345cccccc","1997-04-14"),
    new Admin("Waly","waly@gmail.com","01005578965","Male","2018-12-15","walys","5555dddddd","1997-08-12"),
    new Admin("Andrew","andrew@gmail.com","01001178965","Male","2018-09-11","andrew","6666xasadasdad","1997-09-09")
    ]

// router.get('/admins', (req, res) => res.json({ data: arrayOfAdmins }));

router.get('/', (req, res) => {
    const info = [];
    for(var i = 0;i<arrayOfAdmins.length;i++)
    {
        const admin = arrayOfAdmins[i];
        curr = {
            name : admin.name,
            id : admin.id,
            birthDate : admin.birthDate,
            gender : admin.gender,
            joinDate : admin.joinDate,
            email : admin.email,
            phone : admin.phone
        }
        info.push(curr);
    }
    res.send(info);
});

router.get('/:id', (req, res) => {
        const adminId =  req.params.id;
        const admin = arrayOfAdmins.find(curr => curr.id == adminId);
        curr = {
            name : admin.name,
            id : admin.id,
            birthDate : admin.birthDate,
            gender : admin.gender,
            joinDate : admin.joinDate,
            email : admin.email,
            phone : admin.email
        }
        res.send(curr);
});

router.put('/:id', (req, res) => {
    const adminId = req.params.id;
    const admin = arrayOfAdmins.find(curr => curr.id == adminId);
    const updatedEmail = req.body.email;
    const updatedPhone = req.body.phone;
    const updatedUsername = req.body.username;
    const updatedPassword = req.body.password;
    const updatedGender = req.body.gender;

    const schema = {
        email: Joi.string(),
        phone: Joi.number(),
        username: Joi.string(),
        password: Joi.string().min(8),
        gender : Joi.string()
    }

    const result = Joi.validate(req.body, schema);
    if(result.error) 
    {
        return  res.status(400).send({error: result.error.details[0].message});
    }

    admin.email = updatedEmail;
    admin.phone = updatedPhone;
    admin.username = updatedUsername;
    admin.password = updatedPassword;
    admin.gender = updatedGender;
    res.send(admin);
});


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
module.exports = router;   

    if(result.error) 
    {
        return  res.status(400).send({error: result.error.details[0].message});
    }
    else{
        var a=new Admin(name,email,phone,gender,joinDate,username,password,birthDate,id);
        arrayOfAdmins.push(a)
        const info = [];
        for(var i = 0;i<arrayOfAdmins.length;i++)
        {
            const admin = arrayOfAdmins[i];
            curr = {
                name : admin.name,
                id : admin.id,
                birthDate : admin.birthDate,
                gender : admin.gender,
                joinDate : admin.joinDate,
                email : admin.email,
                phone : admin.phone
            }
            info.push(curr);
        }
        res.send(info);
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
