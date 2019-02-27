
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();
const app=express()

// Models
const Investor = require('../../models/Investor');

const investors = [
    new Investor("Sawires","Buisness Man","male","Egyptian","normal","123","6/6/1980","address",1234,"fax","emal@host.com","pass1"),
    new Investor("Mansour","Buisness Man","male","Egyptian","normal","1236","6/8/1980","addresss",12345,"faxi","email@host.com","pass12"),
    new Investor("Ghabour","Buisness Man","male","Egyptian","normal","1237","9/8/1980","addressse",123456,"faxis","emails@host.com","pass123")
]

router.put('/:id', (req, res) => {
    const index = req.params.id;

    const inves = investors.find(investor=>investor.id==index);
    
    const name = req.body.name;
    const type = req.body.type;
    const gender= req.body.gender;
    const nationality=req.body.nationality;
    const idType=req.body.idType;
    const idNumber=req.body.idNumber;
    const dob=req.body.dob;
    const address=req.body.address;
    const telephone=req.body.telephone;
    const fax=req.body.fax;
    const mail=req.body.mail;
    const password=req.body.password;

    const schema = {
        name:Joi.string(),
        type:Joi.string(),
        gender:Joi.string(),
        nationality:Joi.string(),
        idType:Joi.string(),
        idNumber:Joi.number(),
        dob:Joi.date(),
        dob:Joi.string(),
        address:Joi.string(),
        telephone:Joi.number(),
        fax:Joi.string(),
        mail:Joi.string(),
        password:Joi.string()
        }
    
    const result= Joi.validate(req.body, schema);
    if(result.error) return res.status(400).send({ error: result.error.details[0].message });
    

    if(name)
        inves.name=name;
    if(type)
        inves.type=type;
    if(gender)
        inves.gender=gender;
    if(nationality)
        inves.nationalmineity=nationality;
    if(idType)
        inves.idType=idType;
    if(idNumber)
        inves.idNumber=idNumber;
    if(dob)
        inves.dob=dob;
    if(address)
        inves.address=address;
    if(telephone)
        inves.telephone=telephone;
    if(fax)
        inves.fax=fax;
    if(mail)
        inves.mail=mail;
    if(password)
        inves.password=password;
    
    res.send(investors);

    

})

router.delete('/:id', (req, res) => {
    const identifier = req.params.id 
    const inves = investors.find(investor=>investor.id==identifier);
    const index = investors.indexOf(inves);
    investors.splice(index,1)
    res.send(investors)
})

router.get('/', (req, res) => res.json({ data: investors }))

module.exports = router

