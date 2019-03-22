const express = require('express')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var config = require('../../config/jwt')
const Reviewer = require('../../models/Reviewer')
const router = express.Router()
const validator = require('../../validations/reviewerValidations')
const Admin = require('../../models/Admin')

router.get('/', async (req, res) => {
  const reviewers = await Reviewer.find()
  res.json({ data: reviewers })
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const reviewers = await Reviewer.findById(id)
  res.send(reviewers)
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const reviewers = await Reviewer.findOne({ id })
    if (!reviewers) { return res.status(404).send({ error: 'reviewer does not exist' }) }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
    await Reviewer.updateOne(req.body)
    res.json({ msg: 'reviewer updated successfully' })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

// registering reviewer by admin
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
  const newReviewer = new Reviewer({
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
  token = jwt.sign({ id: newReviewer._id }, config.secret, {
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

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deletedreviewer = await Reviewer.findByIdAndRemove(id)
    res.json({
      msg: 'reviewer was deleted successfully',
      data: deletedreviewer
    })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})



router.put('/addcomment/:id/:companyId',async function(req,res){
  var reviewerId= req.params.id
  var companyId= req.params.companyId
  const query={
    $and:[{status:'RejectedReviewer'},{reviewer:reviewerId},{_id:companyId}]
  };
  const editableCompanies = await Company.find(query);
  var token=req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });
  jwt.verify(token,config.secret,function(err,decoded){
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

  });
  if (!editableCompanies){
    return res.status(404).send({error: "There are no Fourms to be edited"})
  }
  else{
    const isValidated=companyvalidator.updateValidationSSC(req.body);
    if (isValidated.error){
      return res.status(400).send({error: isValidated.error.details[0].message});
    }
    const updatedCompany= await Company.findByIdAndUpdate(companyId, {reviewerComment : req.body});
    res.json({ msg: 'Comment added Successfully'})
  }
});

// s2
router.post('/login', function (req, res) {
  Reviewer.findOne({ email: req.body.email }, function (err, user) {
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

console.log('hai')
module.exports = router
