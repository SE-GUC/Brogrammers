const express = require('express')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var config = require('../../config/jwt')
const Reviewer = require('../../models/reviewer')
const Company = require('../../models/Company')
const Admin = require('../../models/Admin')
const router = express.Router()
const validator = require('../../validations/reviewerValidations')
const companyvalidator = require('../../validations/companyValidations')

router.get('/', async (req, res) => {
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
  })
  const reviewers = await Reviewer.find()
  res.json({ data: reviewers })
})
// alaa
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
    const reviewer = await Reviewer.findById(stat)
    if (!reviewer) {
      return res.status(400).send({ error: 'Reviewer does not exist.' })
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
  })
  const id = req.params.id
  const reviewers = await Reviewer.findById(id)
  console.log('reviwer in get is ' + reviewers)
  res.send(reviewers)
})

// Atef Methods

// Gets all the tasks that are free for any reviewer to choose from
router.get('/getAllTasks/view', async (req, res) => {
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
    })

    var query = { reviewer: null, status: 'PendingReviewer' }
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

// returns specific tasks of a certain reviewer by his id
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
    if (id !== stat) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate' })
    }
    let rev = await Reviewer.findById(id)
    let reviewerSSN = await rev.ssn

    var query = { reviewer: reviewerSSN }
    const comps = await Company.find(query)

    res.json({ data: comps })
  } catch (error) {
    console.log(error)
  }
})

// Reviewer Chooses one task at a time and assigns it to himself/herself
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

    const id = req.params.id
    if (id !== stat) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate' })
    }
    let reviewerID = await Reviewer.findById(id)
    let reviewerSSN = await reviewerID.ssn
    let companyID = req.params.id2
    var query = { _id: companyID, reviewer: null, status: 'PendingReviewer' }
    let currentCompany = await Company.findOne(query)
    if (!currentCompany) {
      return res
        .status(404)
        .send({ error: 'There are no free tasks to be assigned' })
    } else {
      await Company.findOneAndUpdate(query, { reviewer: reviewerSSN })
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
    if (id !== stat) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate' })
    }
    let compid = req.params.id2
    let rev = await Reviewer.findById(id)
    let reviewerSSN = await rev.ssn
    var query = {
      reviewer: reviewerSSN,
      _id: compid,
      $or: [{ status: 'PendingReviewer' }, { status: 'RejectedReviewer' }]
    }
    const company = await Company.find(query)
    if (!company) {
      return res.status(404).send({ error: 'You have no due tasks' })
    } else {
      await Company.findByIdAndUpdate(compid, { status: 'Accepted' })
      const isValidated = await companyvalidator.updateValidationSSC({
        status: 'Accepted'
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
    const id = req.params.id
    if (id !== stat) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate' })
    }
    let currentReviewer = await Reviewer.findById(id)
    let reviwerSSN = await currentReviewer.ssn
    let companyID = req.params.id2

    var query = {
      reviewer: reviwerSSN,
      status: { $ne: 'Accepted' },
      status: 'PendingReviewer',
      _id: companyID
    }
    const currentCompany = await Company.findOne(query)
    if (!currentCompany) {
      return res.status(404).send({ error: 'You have no due tasks' })
    } else {
      await Company.findByIdAndUpdate(companyID, {
        status: 'RejectedReviewer'
      })
      const isValidated = await companyvalidator.updateValidationSSC({
        status: 'RejectedReviewer'
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

// ends here

router.put('/', async (req, res) => {
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
    const reviewers = await Reviewer.findById(stat)
    if (!reviewers) {
      return res.status(404).send({ error: 'reviewer does not exist' })
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
    const reviewer = Reviewer.findById(stat)
    if (reviewer) {
      await Reviewer.findByIdAndUpdate(stat, req.body)
      res.json({ msg: 'Reviewer updated successfully' })
    } else {
      return res.json({ msg: 'You do not have the authorization' })
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

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
    ssn,
    name,
    gender,
    address,
    phone,
    email,
    password,
    yearsOfExperience,
    age,
    birth,
    task
  } = req.body
  const reviewers = await Reviewer.findOne({ email })
  if (reviewers) return res.status(400).json({ error: 'Email already exists' })
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
  var newReviewer = new Reviewer({
    ssn,
    name,
    gender,
    address,
    phone,
    email,
    password: hashedPassword,
    yearsOfExperience,
    age,
    birth,
    task
  })

  var newRev = await Reviewer.create(newReviewer)
  token = jwt.sign({ id: newRev._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  })
  res.status(200).send({
    auth: true,
    token: token,
    msg: 'Reviewer was created successfully',
    data: newReviewer
  })
  res.json({ msg: 'Reviewer was created successfully', data: newReviewer })
})

router.delete('/', async (req, res) => {
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
    const reviewer = await Reviewer.findById(stat)
    if (reviewer) {
      const deletedreviewer = await Reviewer.findByIdAndRemove(stat)
      res.json({
        msg: 'reviewer was deleted successfully',
        data: deletedreviewer
      })
    } else {
      return res.json({ msg: 'Reviewer does not exists' })
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
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
    const admin = await Admin.findById(stat)
    const id = req.params.id
    const reviewer = await Reviewer.findById(id)
    if (admin) {
      if (reviewer) {
        await Reviewer.findByIdAndRemove(id)
        res.json({
          msg: 'Reviewer deleted successfully'
        })
      } else {
        return res.json({ msg: 'Reviewer does not exist' })
      }
    } else {
      return res.json({ message: 'You do not have the authorization.' })
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

router.put('/addcomment/:id/:companyId', async function (req, res) {
  var reviewerId = req.params.id
  var companyId = req.params.companyId
  const query = {
    $and: [
      { status: 'RejectedReviewer' },
      { reviewer: reviewerId },
      { _id: companyId }
    ]
  }
  const editableCompanies = await Company.find(query)
  var stat = 0
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
  if (reviewerId !== stat) { return res.status(401).send({ message: 'Token does not match reviewer' }) }
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
      reviewerComment: req.body.reviewerComment
    })
    res.json({ msg: 'Comment added Successfully' })
  }
})

// s2
router.post('/login', function (req, res) {
  Reviewer.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      return res
        .status(401)
        .send({ auth: false, message: 'Server error.' })
    }
    if (!user) {
      return res
        .status(401)
        .send({ auth: false, message: 'No user found.' })
    }
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

// Logout Sprint2
router.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null })
})

router.get('/mycases/:id', async (req, res) => {
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
    const reviewers = await Reviewer.findById(stat)
    if (!reviewers) {
      return res.status(400).send({ error: 'You are not a reviewer' })
    }
    if (stat === req.params.id) {
      const id = req.params.id

      const reviewer = await Reviewer.findById(id)
      const ssn = reviewer.ssn
      var query = {
        $and: [{ status: 'PendingReviewer' }, { reviewer: ssn }]
      }
      const company = await Company.find(query)
      res.json({ data: company })
    } else {
      return res.status(400).send({ error: 'wrong ID' })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
