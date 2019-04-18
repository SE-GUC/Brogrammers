const express = require('express')
const router = express.Router()
const Investor = require('../../models/Investor')
const validator = require('../../validations/investorValidations')
const companyvalidator = require('../../validations/companyValidations')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var config = require('../../config/jwt')
const Admin = require('../../models/Admin')
const Company = require('../../models/Company')
const nodemailer = require("nodemailer");
var stripe = require("stripe")("sk_test_Vv7YbqIhi1pfFmwt4dKAFUvb000Duiu0d8");
var PDFDocument = require('pdfkit');

// Logout Sprint2
router.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null })
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

// View All Investors
router.get('/', async (req, res) => {
  var token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token provided.' })
  }
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
  })
  const investors = await Investor.find()
  res.json({ data: investors })

})

// View an Investor
router.get('/:id', async (req, res) => {
  var token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token provided.' })
  }
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
  })
  const id = req.params.id
  const investor = await Investor.findById(id)
  res.json({ data: investor })
})

 
// Update Company after being rejected by lawyer
router.put('/MyRequests/:companyid/', async (req, res) => {
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
   
    
    const companyid = req.params.companyid
    console.log(companyid)
    const investor = await Investor.findById(stat)
    const inid = investor.idNumber
    const query = {
      $and: [
        { investorIdentificationNumber: inid },
        { _id: companyid },
        { status: 'RejectedLawyer' }
      ]
    }
    const company = await Company.findOne(query)
    if (!company) {
      return res.status(404).send({ error: 'Company does not exist' })
    } else {
      const isValidated = companyvalidator.updateValidationSSC(req.body)
      if (isValidated.error) {
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message })
      }
      await Company.findByIdAndUpdate(companyid, req.body)
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
router.get('/MyRequests/all', async (req, res) => {
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

  
  const investor = await Investor.findById(stat)
  if (!investor) {
    return res
      .status(500)
      .send({ auth: false, message: 'Failed to authenticate' })
  }
  const inid = investor.idNumber
  const query = {
    investorIdentificationNumber: inid,
    status: { $ne: 'Accepted' }
  }
  const company = await Company.find(query)
  res.json({ data: company })
})

// registring an Investor while not logged in
router.post('/register', async (req, res) => {
  var token = req.headers['x-access-token']
  if (token) {
    return res.status(401).send({ message: 'You are already logged in' })
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
  const isValidated = validator.createValidation(req.body)
  const investor = await Investor.findOne({ mail })
  if (investor) return res.status(400).json({ error: 'Email already exists' })
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
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
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'gafiegcc@gmail.com', // generated ethereal user
      pass: 'Gafi221263' // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let info ={
    from: '"GAFI"', // sender address
    to: newInvestor.mail, // list of receivers
    subject: "Your account was created succefully ✔", // Subject line
    text: "Thank you for registering in GAFIs online portal", // plain text body
    html: "<b>Thank you for registering in GAFIs online portal</b>" // html body
  };
transporter.sendMail(info,(error,info)=>{
  if(error){
    console.log(error)
  }
  console.log(info)
})
  res.json({ msg: 'Investor was created successfully', data: newInvestor })
 
})


router.put('/:id', async (req, res) => {
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
    const investor = await Investor.findById(stat)
    if (!investor) {
      return res.status(404).send({ error: 'Investor does not exist' })
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
    if(stat === req.params.id)
    {
      await Investor.findByIdAndUpdate(stat, req.body)
      res.json({ msg: 'Investor updated successfully' })
    }
    else
    {
      res.json({msg: "You do not have the authorization"});
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

router.get('/View/ViewCompanies', async (req, res) => {
  var stat = 0
  try {
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
    const investor = await Investor.findById(stat)
    const investorNatID = investor.idNumber
    const arrayOfCompanies = await Company.find({
      investorIdentificationNumber: investorNatID
    })
    res.json({ msg: 'Your Companies ', data: arrayOfCompanies })
  } catch (error) {
    res.status(404).send({ msg: "Investor doesn't exist" })
  }
})
// manga
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
    const currInv = await Investor.findById(stat)
    if (!currInv) {
      return res.json({ msg: 'Investor not found' })
    }
    const deletedInvestor = await Investor.findByIdAndRemove(stat)
    res.json({
      msg: 'Investor was successfully deleted',
      data: deletedInvestor
    })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})
// manga
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
    const currInv = await Investor.findByIdAndDelete(id)
    console.log(admin)
    if (admin) {
      if (currInv) {
        await Investor.findByIdAndRemove(id)
        res.json({
          msg: 'Investor deleted successfully'
        })
      } else {
        res.json({ msg: "Investor doesn't exist" })
      }
    } else {
      return res.json({ message: 'You do not have the authorization.' })
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

router.post('/createspccompany', async (req, res) => {
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
    if (!currInvestor) {
      return res.status(404).send({ error: 'Investor does not exist' })
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
      capital
    } = req.body
    const investorName = currInvestor.name
    const investorSex = currInvestor.gender
    const investorNationality = currInvestor.nationality
    const investorIdentificationType = currInvestor.idType
    const investorIdentificationNumber = currInvestor.idNumber
    const investorBD = currInvestor.dob
    const investorAddress = currInvestor.address
    const investorTelephone = currInvestor.telephone
    const investorFax = currInvestor.fax
    const investorEmail = currInvestor.mail
    const isValidated = companyvalidator.createValidationSPC({
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



  





    res.json({ msg: 'SPC Company was created successfully', data: company })
  } catch (error) {
    console.log(error)
  }
})
router.post('/create/company', async (req, res) => {
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
    if (!currInvestor) {
      return res.status(404).send({ error: 'Investor does not exist' })
    }
    const info=req.body
    const investorName = currInvestor.name
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
     info,
     status:"PendingLawyer"
    })
    const company = await Company.create(newCompany)



  





    res.json({ msg: 'SPC Company was created successfully', data: company })
  } catch (error) {
    console.log(error)
  }
})
// alaa
router.post('/createssccompany', async (req, res) => {
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
    if (!currInvestor) {
      return res.status(404).send({ error: 'Investor does not exist' })
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
      managers
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
    const isValidated = companyvalidator.createValidationSSC({
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
      managers,
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
      managers,
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


    const doc = new PDFDocument;
  
    // pipe the document to a blob
    const stream = doc.pipe(res);
    doc.registerFont('Arabic1', 'arabtype.ttf');
    doc.font('Arabic1').fontSize(24).text('الأساسي النظام ', {
      width: 410,
      align:'center'
    });
    doc.font('Arabic1').fontSize(24).text(newCompany.nameInArabic+" "+newCompany.nameInEnglish, {
      width: 410,
      align: 'center'
    });
    
    doc.font('Arabic1').fontSize(24).text("واحد شخص شركة  ", {
      width: 410,
      align: 'center'
    });
    doc.font('Arabic1').fontSize(22).text("ذات والشركات بالأسھم التوصیة وشركات المساھمة شركات قانون لأحكام خاضع", {
      width: 410,
      align: 'right'
    });
    doc.font('Arabic1').fontSize(22).text("١٩٨١ لسنة ١٥٩ رقم بالقانون الصادر الواحد الشخص وشركات المحدودة المسئولیة ", {
      width: 410,
      align: 'right'
    });
  
    

  
    doc.font('Arabic1').fontSize(24).text(newCompany._id+" العقد رقم ", {
      width: 410,
      align: 'center'
    });

    doc.end();
    res.setHeader('access-control-allow-origin', '*');
    res.status(200);




    res.json({ msg: 'SSC Company was created successfully', data: company })

  } catch (error) {
    console.log(error)
  }
})

// s2
router.post('/login', function (req, res) {
  Investor.findOne({ mail: req.body.email }, function (err, user) {
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
    
    const loginPassword = req.body.password
    const userPassword = user.password
    const match = bcrypt.compareSync(loginPassword, userPassword)
    // var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!match) return res.status(401).send({ auth: false, token: null })
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    })
    res.status(200).send({ auth: true, token: token, id: user._id  })
  })
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
  const investor = await Investor.findById(stat)
  if (!investor) {
    return res.status(400).send({ error: 'You are not an investor' })
  }
  const investorIdentification = investor.idNumber
  const companyId = req.params.companyID
  const query = {
    $and: [{ investorIdentificationNumber: investorIdentification }, { _id: companyId }]
  }

  const c = await Company.findOne(query)
  var fees = 'Unchanged'

  if (c.regulationLaw === 'Law 159') {
    // x = (c.capital * (1/1000)) + (c.capital * (0.25/100)) + 56;
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

  res.json({ EstimatedFees: fees , Currency: c.capitalCurrency })
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
    const investor = await Investor.findById(stat)
    if (!investor) {
      return res.status(404).send({ error: 'Investor does not exist' })
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
    console.log(stat);
      await Investor.findByIdAndUpdate(stat, req.body)
      res.json({ msg: 'Investor updated successfully' })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

router.post('/stripe', function (req, res) {

  const token = req.body.stripeToken; // Using Express

stripe.charges.create({
    amount: req.body.amount,
    currency: 'egp',
    description: 'Example charge',
    source: token,
  },function(err,charge){
    console.log(charge);
    if(err){
      res.send({
        sucess:false,
        message:err
      })
    } else{
      res.send({
        sucess:true,
        message:'nice'
      })
    }
  });


})


module.exports = router