// Dependencies
const express = require('express')
const router = express.Router()

// Models
const Company = require('../../models/Company');

const validator = require('../../validations/companyValidations')

const validator = require('../../validations/companyValidations')

// Create SSC Company
router.post('/ssc', async (req, res) => {
  try {
    const isValidated = validator.createValidationSSC(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newCompany = await Company.create(req.body)
    res.json({ msg: 'Company was created successfully', data: newCompany })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

router.post('/spc', async (req, res) => {
  try {
    const isValidated = validator.createValidationSPC(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newCompany = await Company.create(req.body)
    res.json({ msg: 'Company was created successfully', data: newCompany })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

router.get('/', async (req, res) => {
  const companys = await Company.find()
  res.json({ data: companys })
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const company = await Company.findById(id)
    res.json({ data: company })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

router.put('/ssc/:id', async (req, res) => {
  try {
    const id = req.params.id
    const company = await Company.findOne({}, { _id: id })
    if (!company) return res.status(404).send({ error: 'Company does not exist' })
    const isValidated = validator.updateValidationSSC(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    await Company.findByIdAndUpdate(id, req.body)
    res.json({ msg: 'Company updated successfully' })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

router.put('/spc/:id', async (req, res) => {
  try {
    const id = req.params.id
    const company = await Company.findOne({}, { _id: id })
    if (!company) return res.status(404).send({ error: 'Company does not exist' })
    const isValidated = validator.updateValidationSPC(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    await Company.findByIdAndUpdate(id, req.body)
    res.json({ msg: 'Company updated successfully' })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deletedCompany = await Company.findByIdAndRemove(id)
    res.json({ msg: 'Company was deleted successfully', data: deletedCompany })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})
module.exports = router
