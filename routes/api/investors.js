
const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const Investor = require('../../models/Investor');
const validator = require('../../validations/investorValidations');
const bcrypt = require('bcryptjs');



//View All Investors
//router.get('/investors', (req, res) => res.send(investors));
router.get('/', async (req, res) => {
    const investors = await Investor.find()
    res.json({data: investors})
})

//View an Investor
router.get('/:id', async (req, res)=>
{
    const id = req.params.id;
    const investor = await Investor.findById(id);
    // if(!investor) return res.status(404).send({error: 'Could not find Investor'});

    // const investor = investor.find(Investor => investorID == Investor.id);
    res.json({data: investor}); 
});

//Create an investor
// router.post('/create', async (req, res) =>
// {
//     try {
//         const isValidated = validator.createValidation(req.body)
//         if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
//         const newInvestor = await Investor.create(req.body)
//         res.json({msg:'Investor was created successfully', data: newInvestor})
//        }
//        catch(error) {
//            // We will be handling the error later
//            console.log(error)
//        }  
    
// });

router.post('/create', async (req,res) => {
    const { name,type,gender, nationality,idType, idNumber, dob,address,telephone, fax, mail, password } = req.body
    const investor = await Investor.findOne({mail})
    if(investor) return res.status(400).json({error: 'Email already exists'})
    
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,salt)
    const newInv = new Investor({
            name,
            type,
            gender,
            nationality,idType, idNumber, dob,address,telephone, fax, mail,
            password: hashedPassword 
        })
        const newInvestor =  await Investor.create(newInv)
        res.json({msg:'Investor was created successfully', data: newInvestor})
})



router.put('/:id', async (req, res) => {
    
    try {
        const id = req.params.id
        const investor = await Investor.findOne({},{_id:id})
        if(!investor) return res.status(404).send({error: 'Investor does not exist'})
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedInvestor = await Investor.updateOne(req.body)
        res.json({msg: 'Investor updated successfully'})
       }
       catch(error) {
           // We will be handling the error later
           console.log(error)
       } 
})

router.delete('/:id',  async (req, res) => {
    
    try
    {
        const id = req.params.id 
        const deletedInvestor = await Investor.findByIdAndRemove(id);
        res.json({msg: 'Investor was successfully deleted', data: deletedInvestor});
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    } 
});

module.exports = router
