const express = require('express')
var jwt = require('jsonwebtoken')
var config = require('../../config/jwt')
const router = express.Router()
const Company = require('../../models/Company')
const Investor = require('../../models/Investor')
const validator = require('../../validations/investorValidations')
const companyvalidator = require('../../validations/companyValidations')
const bcrypt = require('bcryptjs')

// View All Investors
// router.get('/investors', (req, res) => res.send(investors));
router.get('/', async (req, res) => {
  const investors = await Investor.find()
  res.json({ data: investors })
})

// View All Investors
router.get('/', async (req, res) => {
  const investors = await Investor.find()
  var token = req.headers['x-access-token']
  if (!token) { return res.status(401).send({ auth: false, message: 'No token provided.' }) }
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }

    res.json({ id: decoded, data: investors })
  })
})

// View an Investor
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const investor = await Investor.findById(id)
  res.json({ data: investor })
})
// View Company Details
router.get('/:id/MyRequests/:companyid/', async (req, res) => {
  var stat = 0
  var token = req.headers['x-access-token']
  if (!token) {
    return res
      .status(401)
      .send({ auth: false, message: 'Please login first.' })
  }
  jwt.verify(token, config.secret, async function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
    stat = decoded.id
  })
  try {
    const id = req.params.id
    if (id != stat) { return res.status(500).send({ auth: false, message: 'Failed to authenticate' }) }
    const companyid = req.params.companyid
    console.log(companyid)
    const investor = await Investor.findById(id)
    const inid = investor.idNumber
    const query = {
      $and: [{ investorIdentificationNumber: inid }, { _id: companyid }]
    }
    const company = await Company.findOne(query)
    if (!company) { return res.status(404).send({ error: 'Company does not exist' }) } else {
      res.json({ data: company })
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})
// Update Company after being rejected by lawyer
router.put('/:id/MyRequests/:companyid/', async (req, res) => {
  var stat = 0
  var token = req.headers['x-access-token']
  if (!token) {
    return res
      .status(401)
      .send({ auth: false, message: 'Please login first.' })
  }
  jwt.verify(token, config.secret, async function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
    stat = decoded.id
  })

  try {
    const id = req.params.id
    if (id != stat) { return res.status(500).send({ auth: false, message: 'Failed to authenticate' }) }
    const companyid = req.params.companyid
    console.log(companyid)
    const investor = await Investor.findById(id)
    const inid = investor.idNumber
    const query = {
      $and: [
        { investorIdentificationNumber: inid },
        { _id: companyid },
        { status: 'RejectedLawyer' }
      ]
    }
    const company = await Company.findOne(query)
    if (!company) { return res.status(404).send({ error: 'Company does not exist' }) } else {
      const isValidated = companyvalidator.updateValidationSSC(req.body)
      if (isValidated.error) {
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message })
      }
      await Company.findByIdAndUpdate(
        companyid,
        req.body
      )
      const updatedcompstatus = await Company.findByIdAndUpdate(companyid, {
        status: 'PendingLawyer'
      })
      res.json({ msg: 'Form Updated Successfully', data: updatedcompstatus })
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})
// track all cases status
router.get('/:id/MyRequests', async (req, res) => {
  var stat = 0
  var token = req.headers['x-access-token']
  if (!token) {
    return res
      .status(401)
      .send({ auth: false, message: 'Please login first.' })
  }
  jwt.verify(token, config.secret, async function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
    stat = decoded.id
  })

  const id = req.params.id
  if (id != stat) {
    return res.status(500).send({ auth: false, message: 'Failed to authenticate' })
  }
  const investor = await Investor.findById(id)
  const inid = investor.idNumber
  const query = {
    investorIdentificationNumber: inid,
    status: { $ne: 'Accepted' }
  }
  const company = await Company.find(query, {
    _id: 0,
    nameInArabic: 1,
    lawyerComment: 1,
    status: 1
  })
  res.json({ data: company })
})

// registring an Investor while not logged in
router.post('/register', async (req, res) => {
  var token = req.headers['x-access-token']
  if (token) {
    return res
      .status(401)
      .send({ auth: false, message: 'You are already logged in' })
  }
  const {
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
    password
  } = req.body
  const investor = await Investor.findOne({ mail })
  if (investor) return res.status(400).json({ error: 'Email already exists' })
  const hashedPassword = bcrypt.hashSync(password, 10)
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
  token = jwt.sign({ id: newInvestor._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  })
  res.status(200).send({
    auth: true,
    token: token,
    msg: 'Investor was created successfully',
    data: newInvestor
  })
  res.json({ msg: 'Investor was created successfully', data: newInvestor })
})

// updating investor
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const investor = await Investor.findOne({ _id: id }, {})
    console.log(investor)
    if (!investor) { return res.status(404).send({ error: 'Investor does not exist' }) }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
    await Investor.findByIdAndUpdate(id, req.body)
    res.json({ msg: 'Investor updated successfully' })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

router.get('/:id/ViewCompanies', async (req, res) => {
  const id = req.params.id
  const investor = await Investor.findById(id)
  const investorNatID = investor.idNumber
  const arrayOfCompanies = await Company.find({
    investorIdentificationNumber: investorNatID
  })
  res.json({ msg: 'Your Companies ', data: arrayOfCompanies })
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deletedInvestor = await Investor.findByIdAndRemove(id)
    res.json({
      msg: 'Investor was successfully deleted',
      data: deletedInvestor
    })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

router.post('/createcompany', async (req, res) => {
  var stat = 0
  try {
    var token = req.headers['x-access-token']
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: 'Please login first.' })
    }
    jwt.verify(token, config.secret, async function (err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' })
      }
      stat = decoded.id
    })
    const currInvestor = await Investor.findById(stat)
    if (!Investor) { return res.status(404).send({ error: 'Investor does not exist' }) }
    const {
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
      capital
    } = req.body
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
    const newCompany = new Company({
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
    const company = await Company.create(newCompany)
    res.json({ msg: 'Company was created successfully', data: company })
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deletedInvestor = await Investor.findByIdAndRemove(id)
    res.json({
      msg: 'Investor was successfully deleted',
      data: deletedInvestor
    })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})
// s2
router.post('/login', function (req, res) {
  Investor.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.')
    if (!user) return res.status(404).send('No user found.')
    // const admin = Admin.findOne({ email: req.body.email});
    const loginPassword = req.body.password
    const userPassword = user.password
    const match = bcrypt.compareSync(loginPassword, userPassword)
    // var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!(match)) return res.status(401).send({ auth: false, token: null })
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    })
    res.status(200).send({ auth: true, token: token })
  })
  res.status(200).send({ auth: true, token: token })
})

router.get('/getall/cases', async (req, res) => {
  try {
    const company = await Company.find()
    console.log(company)
    res.json({ data: company })
  } catch (error) {
    console.log(error)
  }
})

router.get('/:companyID/viewFees', async (req, res)=>
{
    const companyId = req.params.companyID;
    const c = await Company.findById(companyId);
    var x = "Unchanged";
    
    if(c.regulationLaw==="Law 159"){
        x = (c.capital * (1/1000)) + (c.capital * (0.25/100)) + 56;
    }else{
        if(c.regulationLaw==="Law 72"){
          x=610;
        }
    }
    
    res.json({EstimatedFees : x});

});

module.exports = router
