const express = require('express')
const router = express.Router()
const Admin = require('../../models/Admin.js')
var config = require('../../config/jwt')
const validator = require('../../validations/adminValidations')
const bcrypt = require('bcryptjs')
const Companys = require('../../models/Company')
var jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
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
    })
    const info = []
    const arrayOfAdmins = await Admin.find()
    for (var i = 0; i < arrayOfAdmins.length; i++) {
      const admin = arrayOfAdmins[i]
      var curr = {
        name: admin.name,
        id: admin.id,
        birthDate: admin.birthDate,
        gender: admin.gender,
        joinDate: admin.joinDate,
        email: admin.email,
        phone: admin.phone
      }
      info.push(curr)
    }
    res.send(info)
  } catch (error) {
    res.status(404).send({ msg: "Admin doesn't exist" })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const adminId = req.params.id
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
    })
    const admin = await Admin.findById(adminId)
    curr = {
      name: admin.name,
      id: admin.id,
      birthDate: admin.birthDate,
      gender: admin.gender,
      joinDate: admin.joinDate,
      email: admin.email,
      phone: admin.phone
    }
    res.send(curr)
  } catch (error) {
    res.status(404).send({ msg: "Admin doesn't exist" })
  }
})

router.put('/', async (req, res) => {
  try {
    var stat = 0
    var token = req.headers['x-access-token']
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: 'Please login first' })
    }
    jwt.verify(token, config.secret, async function (err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' })
      }
      stat = decoded.id
    })
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(stat, req.body)
    // res.send(admin);
    res.json({ msg: 'Information updated successfully' })
  } catch (error) {
    res.status(404).send({ msg: "Admin doesn't exist" })
  }
})


// Register admin by another admin
router.post('/register', async (req, res) => {
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
    const admin2 = await Admin.findById(stat)
    if (!admin2) {
      return res.status(400).json({ error: 'You are not an admin' })
    }
    const {
      name,
      email,
      password,
      phone,
      gender,
      birthDate,
      joinDate
    } = req.body
    const isValidated = validator.createValidation(req.body)
    const admin = await Admin.findOne({ email })
    if (admin) return res.status(400).json({ error: 'Email already exists' })
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      birthDate,
      joinDate
    })
    token = jwt.sign({ id: newAdmin._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    })
    res.status(200).send({
      auth: true,
      token: token,
      msg: 'Admin was created successfully',
      data: newAdmin
    })
    res.json({ msg: 'Admin was created successfully', data: newAdmin })
    res.json({ msg: 'Admin created successfully', data: newAdmin })
  } catch (error) {
    console.log(error)
  }
})

// Sprint Two
router.post('/login', function (req, res) {
  Admin.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.')
    if (!user) return res.status(404).send('No user found.')
    const loginPassword = req.body.password
    const userPassword = user.password
    const match = bcrypt.compareSync(loginPassword, userPassword)
    if (!match) return res.status(401).send({ auth: false, token: null })
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    })
    res.status(200).send({ auth: true, token: token })
  })
  res.status(200).send({ auth: true, token: token })
})

router.delete('/', async (req, res) => {
  try {
    var stat = 0
    var token = req.headers['x-access-token']
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: 'Please login first' })
    }
    jwt.verify(token, config.secret, async function (err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' })
      }
      stat = decoded.id
    })
    const currUser = await Admin.find({ _id: stat })
    if (currUser) {
      const admin = await Admin.findByIdAndRemove(stat)
      res.json({ msg: 'Admin deleted successfully' })
    } else { return res.json({ msg: "You don't have the authorization" }) }
  } catch (error) {
    res.status(404).send({ msg: "Admin doesn't exist" })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    var stat = 0
    var token = req.headers['x-access-token']
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: 'Please login first' })
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
    const currUser = await Admin.find({ _id: stat })
    if (currUser) {
      const admin = await Admin.findByIdAndRemove(id)
      res.json({ msg: 'Admin deleted successfully' })
    } else { return res.json({ msg: "You don't have the authorization" }) }
  } catch (error) {
    res.status(404).send({ msg: "Admin doesn't exist" })
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
