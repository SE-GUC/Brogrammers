const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();
const Admin = require('../../models/Admin.js');
const mongoose = require('mongoose');
const validator = require('../../validations/adminValidations');
const bcrypt = require('bcryptjs');

// const arrayOfAdmins=[
//     new Admin("Atef","atef@gmail.com","01005478965","Male","2018-07-23","moatef","1234aaaaaaa","1997-07-02"),
//     new Admin("Alaa","alaa@gmail.com","01007778965","Male","2018-06-12","alaas","3456bbbbbbb","1997-05-15"),
//     new Admin("Omar","omar@gmail.com","01006678965","Male","2018-07-08","raed","12345cccccc","1997-04-14"),
//     new Admin("Waly","waly@gmail.com","01005578965","Male","2018-12-15","walys","5555dddddd","1997-08-12"),
//     new Admin("Andrew","andrew@gmail.com","01001178965","Male","2018-09-11","andrew","6666xasadasdad","1997-09-09")
//     ]

// router.get('/admins', (req, res) => res.json({ data: arrayOfAdmins }));

router.get('/', async (req, res) => {
    try{
        const info = [];
    const arrayOfAdmins = await Admin.find();
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
    catch(error)
    {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const adminId =  req.params.id;
        const admin = await Admin.findById(adminId);
        curr = {
            name : admin.name,
            id : admin.id,
            birthDate : admin.birthDate,
            gender : admin.gender,
            joinDate : admin.joinDate,
            email : admin.email,
            phone : admin.phone
        }
        res.send(curr);
    }
    catch(error)
    {
        console.log(error);
    }
});

router.put('/:id', async (req, res) => {
    try{
        const isValidated = validator.updateValidation(req.body);
        if(isValidated.error) 
        {
            return  res.status(400).send({error: isValidated.error.details[0].message});
        }
        const id = req.params.id;
        const updatedAdmin = await Admin.FindByIdAndUpdate(id,eq.body);
        // res.send(admin);
        res.json({msg: "Information updated successfully"});
    }
    catch(error)
    {
        console.log(error);
    }
});
    

router.post('/', async (req, res) => {
    try{
        // const name = req.body.name;
         const email = req.body.email;
        // const phone = req.body.phone;
        // const birthDate=req.body.birthDate;
        // const gender=req.body.gender;
        // const joinDate=req.body.joinDate;
        // const username=req.body.username;
        // const password=req.body.password;
    
        const isValidated = validator.createValidation(req.body);
        const admin = await Admin.findOne({email})
        if(admin) return res.status(400).json({error: 'Email already exists'})
        if(isValidated.error) 
        {
            return  res.status(400).send({error: isValidated.error.details[0].message});
        }
        
        const a = await Admin.create(req.body);
        res.json({msg: "Admin created successfully", data: a});
    }catch(error){
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const admin = await Admin.findByIdAndRemove(id);
        res.json({msg: "Admin deleted successfully"});
    }catch(error){
        console.log(error);
    }
});

module.exports = router
