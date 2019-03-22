const express = require('express')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
var config = require('../../config/jwt')
const Companys = require('../../models/Company')
var jwt = require('jsonwebtoken')
const router = express.Router()
const mongoose = require('mongoose')
const Admin = require('../../models/Admin')
const validator = require('../../validations/LawyerValidation')
const Company = require('../../models/Company')
const Lawyer = require('../../models/Lawyer')
const companyvalidator = require('../../validations/companyValidations')

router.get('/', async (req, res) => {
  const lawyers = await Lawyer.find()
  res.json({ data: lawyers })
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const lawyer = await Lawyer.findById(id)
  res.send(lawyer)
})

// creating a lawyer by Admin only
router.post('/register', async (req, res) => {
  var stat = 0
  var token = req.headers['x-access-token']
  if (!token) { return res.status(401).send({ auth: false, message: 'Please login first.' }) }
  jwt.verify(token, config.secret, async function (err, decoded) {
    if (err) { return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }) }
    stat = decoded.id
  })
  const admin = await Admin.findById(stat)
  if (!admin) {
    return res.status(400).send({ error: 'You are not an admin' })
  }
  const { firstName, middleName, lastName, email, password, mobile_number, Social_Security_Number, salary, birth_Date, yearsOfExperience } = req.body
  const lawyer = await Lawyer.findOne({ email })
  if (lawyer) return res.status(400).json({ error: 'Email already exists' })

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
  const newLawyer = new Lawyer({
    firstName,
    middleName,
    lastName,
    password: hashedPassword,
    email,
    mobile_number,
    Social_Security_Number,
    salary,
    birth_Date,
    yearsOfExperience
  })
  const newLawyers = await Lawyer.create(newLawyer)
  var token = jwt.sign({ id: newLawyers._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  })
  res
    .status(200)
    .send({
      auth: true,
      token: token,
      msg: 'Lawyer was created successfully',
      data: newLawyers
    })
  res.json({ msg: 'Lawyer was created successfully', data: newLawyers })
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const lawyer = await Lawyer.findOne({}, { _id: id })
    if (!lawyer) return res.status(404).send({ error: 'lawyer does not exist' })
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const updatedLawyer = await Lawyer.updateOne(req.body)
    res.json({ msg: 'Lawyer updated successfully' })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deletedLawyer = await Lawyer.findByIdAndRemove(id)
    res.json({ msg: 'Lawyer was deleted successfully', data: deletedLawyer })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})
// s2
router.post('/login', function (req, res) {
  Lawyer.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.')
    if (!user) return res.status(404).send('No user found.')
    // const admin = Admin.findOne({ email: req.body.email});
    const loginPassword = req.body.password
    const userPassword = user.password
    // var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!(loginPassword == userPassword)) return res.status(401).send({ auth: false, token: null })
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    })
    res.status(200).send({ auth: true, token: token })
  })
})

router.get('/editForm/:id', async function (req, res) {
  var lawyerId = req.params.id
  const query = {
    $and: [{ status: 'RejectedReviewer' }, { lawyer: lawyerId }]
  }
  const editableCompanies = await Company.find(query, { _id: 0 })
  var token = req.headers['x-access-token']
  if (!token) { return res.status(401).send({ auth: false, message: 'No token provided.' }) }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }

    res.json({ data: editableCompanies })
  })
})

router.put('/editForm/:id/:companyId', async function (req, res) {
  var lawyerId = req.params.id
  var companyId = req.params.companyId
  const query = {
    $and: [{ status: 'RejectedReviewer' }, { lawyer: lawyerId }, { _id: companyId }]
  }
  const editableCompanies = await Company.find(query)

  var token = req.headers['x-access-token']
  if (!token) { return res.status(401).send({ auth: false, message: 'No token provided.' }) }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
  })

  if (!editableCompanies) {
    return res.status(404).send({ error: 'There are no Fourms to be edited' })
  } else {
    const isValidated = companyvalidator.updateValidationSSC(req.body)
    if (isValidated.error) {
      return res.status(400).send({ error: isValidated.error.details[0].message })
    }
    const updatedCompany = await Company.findByIdAndUpdate(companyId, req.body)
    res.json({ msg: 'fourm updated successfully' })
  }
})

router.post('/lawyerinvestor/createcompany', async (req, res) => {
  try {
    const { regulationLaw, legalCompanyForm, nameInArabic, nameInEnglish, governerateHQ, cityHQ, addressHQ, telephoneHQ, faxHQ, capitalCurrency, capital, investorName,
      investorType, investorSex, investorNationality, investorIdentificationType, investorIdentificationNumber, investorBD, investorAddress, investorTelephone, investorFax,
      investorEmail } = req.body
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
    })
    const company = await Companys.create(newCompany)
    res.json({ msg: 'Company was created successfully', data: company })
  } catch (error) {
    console.log(error)
  }
})

router.get('/getall/cases', async (req, res) => {
  try {
    const company = await Companys.find()
    console.log(company)
    res.json({ data: company })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
