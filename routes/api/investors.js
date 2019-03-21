
const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const Companys = require('../../models/Company')
const Investor = require('../../models/Investor');
const validator = require('../../validations/investorValidations');
const bcrypt = require('bcryptjs');

//View All Investors
router.get('/', async (req, res) => {
    const investors = await Investor.find()
    res.json({ data: investors })
})

//View an Investor
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const investor = await Investor.findById(id);
    res.json({ data: investor });
});

router.post('/create', async (req, res) => {
    const { name, type, gender, nationality, idType, idNumber, dob, address, telephone, fax, mail, password } = req.body
    const investor = await Investor.findOne({ mail })
    if (investor) return res.status(400).json({ error: 'Email already exists' })

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const newInv = new Investor({
        name,
        type,
        gender,
        nationality,
        idType,
        idNumber,
        dob,
        address,
        telephone,
        fax,
        mail,
        password: hashedPassword
    })
    const newInvestor = await Investor.create(newInv)
    res.json({ msg: 'Investor was created successfully', data: newInvestor })
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const investor = await Investor.findOne({}, { _id: id })
        if (!investor) return res.status(404).send({ error: 'Investor does not exist' })
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedInvestor = await Investor.updateOne(req.body)
        res.json({ msg: 'Investor updated successfully' })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedInvestor = await Investor.findByIdAndRemove(id);
        res.json({ msg: 'Investor was successfully deleted', data: deletedInvestor });
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
});

router.post('/:id/createcompany', async (req, res) => {
    try {
        const id = req.params.id
        const currInvestor = await Investor.findById(id)
        if (!Investor) return res.status(404).send({ error: "Investor does not exist" })
        const { regulationLaw, legalCompanyForm, nameInArabic, nameInEnglish, governerateHQ, cityHQ, addressHQ, telephoneHQ, faxHQ, capitalCurrency, capital } = req.body
        const investorName = currInvestor.name
        const investorType = currInvestor.type
        const investorSex = currInvestor.gender
        const investorNationality = currInvestor.nationality
        const investorIdentificationType = currInvestor.idType
        const investorIdentificationNumber = currInvestor.idNumber
        const investorBD = currInvestor.dob
        const investorAddress = currInvestor.address
        const investorTelephone = currInvestor.telephone
        const investorFax = currInvestor.fax
        const investorEmail = currInvestor.mail
        const newCompany = new Companys({
            regulationLaw,
            legalCompanyForm,
            nameInArabic,
            nameInEnglish,
            governerateHQ,
            cityHQ,
            addressHQ,
            telephoneHQ,
            faxHQ,
            capitalCurrency,
            capital,
            investorName,
            investorType,
            investorSex,
            investorNationality,
            investorIdentificationType,
            investorIdentificationNumber,
            investorBD,
            investorAddress,
            investorTelephone,
            investorFax,
            investorEmail
        });
        const company = await Companys.create(newCompany)
        res.json({ msg: 'Company was created successfully', data: company })
    }
    catch (error) {
        console.log(error)
    }
})

router.get('/getall/cases', async (req, res) => {
    try {
        const company = await Companys.find()
        console.log(company)
        res.json({ data: company })
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router
