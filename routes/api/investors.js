
const express = require('express');

const router = express.Router();
const mongoose = require('mongoose')

const Investor = require('../../models/Investor')
const validator = require('../../validations/investorValidations')



const investors = [
    {
        id: uuid.v4(),
        name: 'Youssef',
        type:  'SSC',
        gender: 'Male',
        nationality: 'Egyptian',
        idType: 'National',
        idNumber: "123456789",
        dob: '26/03/1998',
        address: 'El Rehab City',
        telephone: "01127163666",
        fax: "0111111111",
        mail: 'Youssefk.abobakr@gmail.com',
        password: 'BestEveningOnYourThighs'
        
    },
    {
        id: uuid.v4(),
        name: 'Bassem',
        type:  'SPC',
        gender: 'Male',
        nationality: 'Egyptian',
        idType: 'National',
        idNumber: "124456789",
        dob: '06/06/1997',
        address: 'Nasr City, no Wifi Street',
        telephone: "011234666",
        fax: "0122222222",
        mail: 'Bassem@gmail.com',
        password: 'BestMorningOnYourThighs'
    },
    {
        id: uuid.v4(),
        name: 'Manga',
        type:  'SPC',
        gender: 'Bitch',
        nationality: '5awaga',
        idType: 'National',
        idNumber: "123456789",
        dob: '26/03/1998',
        address: 'El Rehab City',
        telephone: "01127163666",
        fax: "0111111111",
        mail: 'Manga.abobakr@gmail.com',
        password: 'BestEveningOnYourThighs',
    },
    
];

//View All Investors
//router.get('/investors', (req, res) => res.send(investors));
router.get('/', async (req, res) => {
    const investors = await Investor.find()
    res.json({data: investors})
})

//View an Investor
router.get('/:id', (req, res)=>
{
    const investorID = req.params.id;
    const investor = investors.find(Investor => investorID == Investor.id);
    res.send(investor); 
});

//Create an investor
router.post('/create', async (req, res) =>
{
    try {
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newInvestor = await Investor.create(req.body)
        res.json({msg:'Investor was created successfully', data: newInvestor})
       }
       catch(error) {
           // We will be handling the error later
           console.log(error)
       }  
    
});



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
        inves.nationality=nationality;
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

module.exports = router
