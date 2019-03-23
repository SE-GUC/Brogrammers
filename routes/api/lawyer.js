const express = require('express')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const router = express.Router()
const companyvalidator = require('../../validations/companyValidations')
const Admin = require('../../models/Admin')
const validator = require('../../validations/LawyerValidation')
var config = require('../../config/jwt')
const Lawyer = require('../../models/Lawyer')
const Company = require('../../models/Company')

router.get('/', async (req, res) => {
  var token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
  })
  const lawyers = await Lawyer.find()
  res.json({ data: lawyers })
})

// Atef methods

// returns specific tasks of a certain lawyer by his id
router.get('/:id/getTasks', async (req, res) => {
  try {
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
    const lawyerss = await Lawyer.findById(id)
    const lawyerssn = await lawyerss.socialSecurityNumber

    var query = { lawyer: lawyerssn }
    const comps = await Company.find(query)

    res.json({ data: comps })
  } catch (error) {
    console.log(error)
  }
})

// Gets all the tasks that are free for any lawyer to choose from
router.get('/getAllTasks/view', async (req, res) => {
  try {
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

    var query = { lawyer: null, status: 'PendingLawyer' }
    const availableCompanies = await Company.find(query)
    if (!availableCompanies) {
      return res.status(404).send({ error: 'There are no free tasks' })
    } else {
      res.json({ data: availableCompanies })
    }
  } catch (error) {
    console.log(error)
  }
})

// Lawyer Chooses one task at a time and assigns it to himself/herself
router.put('/:id/assignFreeTask/:id2', async (req, res) => {
  try {
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

    let id = req.params.id
    let lawyerID = await Lawyer.findById(id)
    let lawyerSSN = await lawyerID.socialSecurityNumber
    let companyID = req.params.id2
    var query = { _id: companyID, lawyer: null, status: 'PendingLawyer' }
    let currentCompany = await Company.findOne(query)
    if (!currentCompany) {
      return res
        .status(404)
        .send({ error: 'There are no free tasks to be assigned' })
    } else {
      await Company.findOneAndUpdate(query, { lawyer: lawyerSSN })
      // const isValidated=await companyvalidator.updateValidationSSC
      res.json({ msg: 'Task assigned Successfully' })
    }
  } catch (error) {
    console.log(error)
  }
})

// Approves the task and updates the company status
router.put('/:id/getTasks/approve/:id2', async (req, res) => {
  try {
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
    const compid = req.params.id2
    const lawyerss = await Lawyer.findById(id)
    const lawyerssn = await lawyerss.socialSecurityNumber
    var query = {
      lawyer: lawyerssn,
      _id: compid,
      $or: [{ status: 'PendingLawyer' }, { status: 'RejectedLawyer' }]
    }
    const company = await Company.find(query)
    if (!company) {
      return res.status(404).send({ error: 'You have no due tasks' })
    } else {
      await Company.findByIdAndUpdate(compid, { status: 'PendingReviewer' })
      const isValidated = await companyvalidator.updateValidationSSC({
        status: 'PendingReviewer'
      })
      if (isValidated.error) {
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message })
      }
      res.json({ msg: 'Task approved successfully' })
    }
  } catch (error) {
    console.log(error)
  }
})

// Disapproves the task and updates company status
router.put('/:id/getTasks/disapprove/:id2', async (req, res) => {
  try {
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

    const lawyerID = req.params.id
    const currentLawyer = await Lawyer.findById(lawyerID)
    const lawyerSSN = await currentLawyer.socialSecurityNumber
    const companyID = req.params.id2

    var query = { lawyer: lawyerSSN, status: 'PendingLawyer', _id: companyID }
    const currentCompany = await Company.find(query)
    if (!currentCompany) {
      return res.status(404).send({ error: 'You have no due tasks' })
    } else {
      await Company.findByIdAndUpdate(companyID, { status: 'RejectedLawyer' })
      const isValidated = await companyvalidator.updateValidationSSC({
        status: 'RejectedLawyer'
      })
      if (isValidated.error) {
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message })
      }
      res.json({ msg: 'Task disapproved successfully' })
    }
  } catch (error) {
    console.log(error)
  }
})

// creating a lawyer by Admin only
router.post('/register', async (req, res) => {
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
  const admin = await Admin.findById(stat)
  if (!admin) {
    return res.status(400).send({ error: 'You are not an admin' })
  }
  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    mobileNumber,
    socialSecurityNumber,
    salary,
    birthDate,
    yearsOfExperience
  } = req.body
  const lawyer = await Lawyer.findOne({ email })
  if (lawyer) return res.status(400).json({ error: 'Email already exists' })
  const ssn = await Lawyer.findOne({ socialSecurityNumber })
  if (ssn) return res.status(400).json({ error: 'SSN already exists' })

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
  const newLawyer = new Lawyer({
    firstName,
    middleName,
    lastName,
    password: hashedPassword,
    email,
    mobileNumber,
    socialSecurityNumber,
    salary,
    birthDate,
    yearsOfExperience
  })
  const newLawyers = await Lawyer.create(newLawyer)
  token = jwt.sign({ id: newLawyers._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  })
  res.status(200).send({
    auth: true,
    token: token,
    msg: 'Lawyer was created successfully',
    data: newLawyers
  })
  res.json({ msg: 'Lawyer was created successfully', data: newLawyers })
})

router.delete('/:id', async (req, res) => {
  try {
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
    const admin = await Admin.find({ _id: stat })
    console.log(admin)
    if (admin) {
      const id = req.params.id
      const lawyer = await Lawyer.find({ _id: id })
      if (lawyer) {
        await Lawyer.findByIdAndRemove(id)
        res.json({
          msg: 'Lawyer deleted successfully'
        })
      } else {
        res.json({ msg: 'Lawyer does not exist' })
      }
    } else {
      return res.json({ message: 'You do not have the authorization.' })
    }
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
    const match = bcrypt.compareSync(loginPassword, userPassword)
    // var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!match) return res.status(401).send({ auth: false, token: null })
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    })
    res.status(200).send({ auth: true, token: token })
  })
})

//Logout Sprint2
router.get('/logout', function(req, res) {
  res.status(200).send( { auth: false, token: null });
})

router.put('/editForm/:id/:companyId', async function (req, res) {
  var lawyerId = req.params.id
  var companyId = req.params.companyId
  const query = {
    $and: [
      { status: 'RejectedReviewer' },
      { lawyer: lawyerId },
      { _id: companyId }
    ]
  }
  const editableCompanies = await Company.find(query)

  var token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }

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
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
    await Company.findByIdAndUpdate(companyId, req.body)
    res.json({ msg: 'fourm updated successfully' })
  }
})
//alaa
router.post('/lawyerinvestor/createspccompany', async (req, res) => {
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
    const currLawyer = await Lawyer.findById(stat)
    if (!currLawyer) {
      return res.status(404).send({ error: 'Lawyer does not exist' })
    }
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
      capital,
      investorName,
      investorSex,
      investorNationality,
      investorIdentificationType,
      investorIdentificationNumber,
      investorBD,
      investorAddress,
      investorTelephone,
      investorFax,
      investorEmail
    } = req.body
    const isValidated = companyvalidator.createValidationSPC(req.body)
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
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
//alaa
router.post('/lawyerinvestor/createssccompany', async (req, res) => {
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
    const currLawyer = await Lawyer.findById(stat)
    if (!currLawyer) {
      return res.status(404).send({ error: 'Lawyer does not exist' })
    }
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
      investorEmail,
      managers
    } = req.body
    const isValidated = companyvalidator.createValidationSSC(req.body)
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
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
      investorEmail,
      managers
    })
    const company = await Company.create(newCompany)
    res.json({ msg: 'Company was created successfully', data: company })
  } catch (error) {
    console.log(error)
  }
})
//alaa
router.get('/getall/cases', async (req, res) => {
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
    const currLawyer = await Lawyer.findById(stat)
    if (!currLawyer) {
      return res.status(404).send({ error: 'Lawyer does not exist' })
    }
    const company = await Company.find()
    console.log(company)
    res.json({ data: company })
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id', async (req, res) => {
  var token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
  })
  const id = req.params.id
  const lawyer = await Lawyer.findById(id)
  res.send(lawyer)
})

router.put('/', async (req, res) => {
  try {
    var stat = 0
    var token = req.headers['x-access-token']
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided.' })
    }
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' })
      }
      stat = decoded.id
    })
    const lawyer = await Lawyer.findOne({}, { _id: stat })
    if (!lawyer) {
      return res.status(404).send({ error: 'lawyer does not exist' })
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
    await Lawyer.findByIdAndUpdate(stat, req.body)
    res.json({ msg: 'Lawyer updated successfully' })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})
router.delete('/', async (req, res) => {
  try {
    var stat = 0
    var token = req.headers['x-access-token']
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided.' })
    }
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' })
      }
      stat = decoded.id
    })
    const deletedLawyer = await Lawyer.findByIdAndRemove(stat)
    res.json({ msg: 'Lawyer was deleted successfully', data: deletedLawyer })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

router.get('/editForm/:id', async function (req, res) {
  var lawyerId = req.params.id
  const query = {
    $and: [{ status: 'RejectedReviewer' }, { lawyer: lawyerId }]
  }
  const editableCompanies = await Company.find(query, { _id: 0 })
  var token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }

    res.json({ data: editableCompanies })
  })
})

router.put('/addcomment/:id/:companyId', async function (req, res) {
  var lawyerId = req.params.id
  var companyId = req.params.companyId
  const query = {
    $and: [
      { status: 'RejectedLawyer' },
      { lawyer: lawyerId },
      { _id: companyId }
    ]
  }
  const editableCompanies = await Company.find(query)
  var stat=0
  var token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }
  jwt.verify(token, config.secret, function (err, decoded) {
    stat=decoded.id
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
  })
  if(lawyerId!==stat)
    return res.status(401).send({message: 'Token does not match lawyer' })
  if (!editableCompanies) {
    return res.status(404).send({ error: 'There are no Fourms to be edited' })
  } else {
    const isValidated = companyvalidator.updateValidationSSC(req.body)
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
    await Company.findByIdAndUpdate(companyId, {
      lawyerComment: req.body.lawyerComment
    })
    res.json({ msg: 'Comment added Successfully' })
  }
})

router.get('/:companyID/viewFees', async (req, res) => {
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
  const lawyer = await Admin.findById(stat)
  if (!lawyer) {
    return res.status(400).send({ error: 'You are not an lawyer' })
  }
  const companyId = req.params.companyID
  const c = await Company.findById(companyId)
  var fees = 'Unchanged'

  if (c.regulationLaw === 'Law 159') {
    var GAFI = c.capital * (1 / 1000)
    if (GAFI < 100) {
      GAFI = 100
    }
    if (GAFI > 1000) {
      GAFI = 1000
    }

    var Notary = c.capital * (0.25 / 100)
    if (Notary < 10) {
      Notary = 10
    }
    if (Notary > 1000) {
      Notary = 1000
    }

    fees = GAFI + Notary + 56
  } else {
    if (c.regulationLaw === 'Law 72') {
      fees = 610
    }
  }

  res.json({ EstimatedFees: fees })
})

router.put('/resubmit/:id/:companyId', async function (req, res) {
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
  const lawyer = await Admin.findById(stat)
  if (!lawyer) {
    return res.status(400).send({ error: 'You are not an lawyer' })
  }

  var lawyerId = req.params.id
  var companyId = req.params.companyId
  const query = {
    $and: [{ lawyer: lawyerId }, { _id: companyId }]
  }
  const pendingCompanies = await Company.find(query)

  if (!pendingCompanies) {
    return res
      .status(404)
      .send({ error: 'There are no Fourms to be resubmitted' })
  } else {
    await Company.findByIdAndUpdate(companyId, { status: 'PendingReviewer' })
    res.json({ msg: 'fourm resubmitted successfully' })
  }
})
router.get('/mycases/:id', async (req, res) => {
  try {
    var stat = 0
    var token = req.headers['x-access-token']
    if (!token) { return res.status(401).send({ auth: false, message: 'Please login first.' }) }
    jwt.verify(token, config.secret, async function (err, decoded) {
      if (err) { return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }) }
      stat = decoded.id
    })
    const lawyers = await Lawyer.findById(stat)
    if (!lawyers) {
      return res.status(400).send({ error: 'You are not a Lawyer' })
    } if (stat === req.params.id) {
      const lawyer = await Lawyer.findById(req.params.id)
      const company = await Company.find()
      if (company.lawyer === lawyer.socialSecurityNumber) { res.json({ data: company }) }
    } else return res.status(400).send({ error: 'Wrong ID' })
  } catch (error) {
    console.log(error)
  }
})
module.exports = router
