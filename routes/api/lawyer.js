const express = require('express')
const Joi = require('joi');
const bcrypt = require('bcryptjs')

const router = express.Router()
const mongoose = require('mongoose')
const validator = require('../../validations/LawyerValidation')

const Lawyer = require('../../models/Lawyer')


router.get('/',  async(req,res) => {
    const lawyers = await  Lawyer.find()
    res.json({data: lawyers})
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const lawyer = await Lawyer.findById(id)
    res.send(lawyer)
})

router.post('/register', async (req,res) => {
    const { firstName,middleName,lastName,email, password,mobile_number, Social_Security_Number, salary,birth_Date,yearsOfExperience }  = req.body
    const lawyer = await Lawyer.findOne({email})
    if(lawyer) return res.status(400).json({error: 'Email already exists'})
    
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,salt)
    const newLawyer = new Lawyer({
            firstName,
            middleName,
            lastName,
            password: hashedPassword ,
            email,
            mobile_number,
            Social_Security_Number,
            salary,
            birth_Date,
            yearsOfExperience
        })
        const newLawyers =  await Lawyer.create(newLawyer)
        res.json({msg:'Lawyer was created successfully', data: newLawyers})
})



 router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const lawyer = await Lawyer.findOne({},{_id: id})
     if(!lawyer) return res.status(404).send({error: 'lawyer does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedLawyer = await Lawyer.updateOne(req.body)
     res.json({msg: 'Lawyer updated successfully'})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })
 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedLawyer =  await Lawyer.findByIdAndRemove(id)
     res.json({msg:'Lawyer was deleted successfully', data: deletedLawyer})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })
module.exports = router;
