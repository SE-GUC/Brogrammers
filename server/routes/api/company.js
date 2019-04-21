// Dependencies
const express = require('express')
const router = express.Router()

// Models
const Company = require('../../models/Company')

const validator = require('../../validations/companyValidations')

// Create SSC Company
router.post('/ssc', async (req, res) => {
  try {
    const isValidated = validator.createValidationSSC(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newCompany = await Company.create(req.body)
    var d = new Date();
    d.setTime(d.getTime());
    newCompany.creationDate=d
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
    var d = new Date();
    d.setTime(d.getTime());
    newCompany.creationDate=d
    res.json({ msg: 'Company was created successfully', data: newCompany })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})
router.post('/create', async (req, res) => {
  try {
    
    const newCompany = await Company.create({"legalCompanyForm":"SLC","year":14})
    res.json({ msg: 'Company was created successfully!!!', data: newCompany })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

router.get('/', async (req, res) => {
  const companys = await Company.find()
  res.json({ data: companys })
})

// Sprint 2: viewing approved Companies
router.get('/approved', async (req, res) => {
  const acceptedCompanys = await Company.find({ status: 'Accepted' })// Because no Accepted companys... used 'PendingLawyer' as a test case
  res.json({ data: acceptedCompanys })
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
/* router.post('/CompanyType', async (req,res)=>{
  var token = req.headers["x-access-token"];

  if (!token)
    return res.status(401).send({ auth: false, message: "Please login first." });
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: "Failed to authenticate token."})
     stat=decoded.id
  });

  const lawyer=await Lawyer.findById(stat);
  const investor=await Investor.findById(stat);
  if( lawyer || investor ){
  return res.redirect('localhost:3000/api/company/create/'+req.body.type)

  }
  else
  {
      return res.status(400).send({error: 'You are not authorized'})
  }
}) */

module.exports = router
