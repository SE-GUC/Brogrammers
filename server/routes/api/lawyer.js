

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
const nodemailer = require("nodemailer");
const SearchTag = require('../../models/SearchTag')

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
router.get('/getTasks', async (req, res) => {
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
    const id = stat
    

    const lawyerss = await Lawyer.findById(id)
    const lawyerssn = await lawyerss.socialSecurityNumber

    var query = { 
      lawyer: lawyerssn , 
      $or:[{status:"PendingLawyer"},{status:"RejectedLawyer"}]
    }

    const comps = await Company.find(query)

    res.json({ data:comps})
  } catch(error) {
    console.log(error)
  }
})

// Gets all the tasks that are free for any lawyer to choose from
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
router.put('/assignFreeTask/:id2', async (req, res) => {
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
    const id =stat
 

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
    var com = await Company.findById(companyID)
    var SSN = await SearchTag.findOne({tag:lawyerSSN})
   
    if(SSN)
    {
   SSN.location.push(com._id)
    await SearchTag.findByIdAndUpdate(SSN._id,SSN)
    console.log("tag lawyerSSN updated  successfully")
    }
    else
    {
      const newSearchTag = new SearchTag({ tag:lawyerSSN,
        location :[com._id]})
        var tag = await SearchTag.create(newSearchTag)
        console.log("tag lawyerSSN  successfully")
    }
  } catch (error) {
    console.log(error)
  }
})

// Approves the task and updates the company status
router.put('/getTasks/approve/:id2', async (req, res) => {
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
    const id = stat
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

      var deleteIdinArrayinSearch = await SearchTag.findOne({tag:"PendingLawyer"})
    
    
    if(deleteIdinArrayinSearch){
    for (var i =0; i < deleteIdinArrayinSearch.location.length; i++)
    {
       if (deleteIdinArrayinSearch.location[i] == compid) {
          deleteIdinArrayinSearch.location.splice(i,1);
          await SearchTag.findByIdAndUpdate(deleteIdinArrayinSearch._id,deleteIdinArrayinSearch)
          console.log("tag state  delteted  successfully")
          break;
        }
   }
  }
  var statusss = await SearchTag.findOne({tag:"PendingReviewer"})
  var com = await Company.findById(compid)
  if(statusss)
  {
 statusss.location.push(com._id)
  await SearchTag.findByIdAndUpdate(statusss._id,statusss)
  console.log("tag statusss switched  successfully")
  }
  else
  {
    const newSearchTag = new SearchTag({ tag:"PendingReviewer",
      location :[com._id]})
      var tag = await SearchTag.create(newSearchTag)
      console.log("tag statuss  successfully")
  }

      res.json({ msg: 'Task approved successfully' })
    }
  } catch (error) {
    console.log(error)
  }
})

// Disapproves the task and updates company status
router.put('/getTasks/disapprove/:id2', async (req, res) => {
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
    const id = stat
  
    const lawyerID = id
    const currentLawyer = await Lawyer.findById(lawyerID)
    const lawyerSSN = await currentLawyer.socialSecurityNumber
    const companyID = req.params.id2

    var query = { lawyer: lawyerSSN, status: 'PendingLawyer', _id: companyID }
    const currentCompany = await Company.find(query)
    if (!currentCompany) {
      return res.status(404).send({ error: 'You have no due tasks' })
    } else {
     var com = await Company.findByIdAndUpdate(companyID, { status: 'RejectedLawyer' })
      const isValidated = await companyvalidator.updateValidationSSC({
        status: 'RejectedLawyer'
      })
      if (isValidated.error) {
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message })
      }
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
 

    var deleteIdinArrayinSearch = await SearchTag.findOne({tag:"PendingLawyer"})
    
    
    if(deleteIdinArrayinSearch){
    for (var i =0; i < deleteIdinArrayinSearch.location.length; i++)
    {
       if (deleteIdinArrayinSearch.location[i].equals( com._id)) {
          deleteIdinArrayinSearch.location.splice(i,1);
          await SearchTag.findByIdAndUpdate(deleteIdinArrayinSearch._id,deleteIdinArrayinSearch)
          console.log("tag regulation law delteted  successfully")
          break;
        }
   }
  }

  var statusss = await SearchTag.findOne({tag:"RejectedLawyer"})
  if(statusss)
  {
 statusss.location.push(com._id)
  await SearchTag.findByIdAndUpdate(statusss._id,statusss)
  console.log("tag statusss switched  successfully")
  }
  else
  {
    const newSearchTag = new SearchTag({ tag:"RejectedLawyer",
      location :[com._id]})
      var tag = await SearchTag.create(newSearchTag)
      console.log("tag statuss  successfully")
  }

    
      // send mail with defined transport object
      let info ={
        from: '"GAFI"', // sender address
        to: currentCompany.investorEmail, // list of receivers
        subject: "Company rejection", // Subject line
        text: "Dear "+currentCompany.investorName + "\n The company you ware creating was rejected by the lawyer please check GAFIs online portal to view the comments left by the lawyer and update the form. \n Thank you", // plain text body
        html: "<b>Dear "+currentCompany.investorName + "\n The company you ware creating was rejected by the lawyer please check GAFIs online portal to view the comments left by the lawyer and update the form. \n Thank you</b>" // html body
      };
    transporter.sendMail(info,(error,info)=>{
      if(error){
        console.log(error)
      }
      console.log(info)
    })

      res.json({ msg: 'Task disapproved successfully' })
    }
  } catch (error) {
    console.log(error)
  }
})
// ends here atef

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
  const isValidated = validator.createValidation(req.body)
  const lawyer = await Lawyer.findOne({ email })	 
  if (lawyer) return res.status(400).json({ error: 'Email already exists' })	 
  const ssn = await Lawyer.findOne({ socialSecurityNumber })	 
  if (ssn) return res.status(400).json({ error: 'SSN already exists' })	

   if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message })
  }
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
    const admin = await Admin.findById(stat)
    console.log(admin)
    if (admin) {
      const id = req.params.id
      const lawyer = await Lawyer.findById(id)
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
    res.status(200).send({ auth: true, token: token, id: user._id, ssn: user.socialSecurityNumber  })
  })
})

// Logout Sprint2
router.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null })
})

router.put('/editForm/:id/:companyId', async function (req, res) {
  var stat = 0
  var lawyerId = req.params.id
  var companyId = req.params.companyId
  const query = {
    $and: [
      { status: 'RejectedReviewer' },
      { lawyer: lawyerId },
      { _id: companyId }
    ]
  }
  const editableCompanies = await Company.findOne(query)
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
    stat = decoded.id
  })
  if(!stat){
      return res
      .status(500)
      .send({ auth: false, message: 'Failed to authenticate token.' })
    }
    const id = stat
    const lawyer = await Lawyer.findOne({socialSecurityNumber: lawyerId}, { _id: 1 })
    const companybeforeupdate = await Company.findById(companyId)
    if(!lawyer){
      return res
      .status(500)
      .send({ auth: false, message: 'Failed to authenticate token.' })
    }
    if(lawyer._id==id){
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
        await Company.findOneAndUpdate(query, { status: 'PendingReviewer' })
        const updatedcompstatus = await Company.findById(companyId) 

              
// delete the the ids in the search tag Array before we update the company

  if(req.body.regulationLaw)
  {
    var deleteIdinArrayinSearch = await SearchTag.findOne({tag:companybeforeupdate.regulationLaw})
    
    console.log(deleteIdinArrayinSearch)
    if(deleteIdinArrayinSearch){
    for (var i =0; i < deleteIdinArrayinSearch.location.length; i++)
    {
       if (deleteIdinArrayinSearch.location[i] == companybeforeupdate._id) {
          deleteIdinArrayinSearch.location.splice(i,1);
          await SearchTag.findByIdAndUpdate(deleteIdinArrayinSearch._id,deleteIdinArrayinSearch)
          console.log("tag regulation law delteted  successfully")
          break;
        }
   }
  }
}
  if(req.body.legalCompanyForm)
  {
    var deleteIdinArrayinSearch = await SearchTag.findOne({tag:companybeforeupdate.legalCompanyForm})
    if(deleteIdinArrayinSearch){
    for (var i =0; i < deleteIdinArrayinSearch.location.length; i++)
       if (deleteIdinArrayinSearch.location[i] == companybeforeupdate._id) {
          deleteIdinArrayinSearch.location.splice(i,1);
          await SearchTag.findByIdAndUpdate(deleteIdinArrayinSearch._id,deleteIdinArrayinSearch)
          console.log("tag CompantForm delteted  successfully") 
          break;
   }
  }}
  if(req.body.governerateHQ)
  {
    var deleteIdinArrayinSearch = await SearchTag.findOne({tag:companybeforeupdate.governerateHQ})
    if(deleteIdinArrayinSearch){
    for (var i =0; i < deleteIdinArrayinSearch.location.length; i++)
       if (deleteIdinArrayinSearch.location[i] == companybeforeupdate._id) {
          deleteIdinArrayinSearch.location.splice(i,1);
          await SearchTag.findByIdAndUpdate(deleteIdinArrayinSearch._id,deleteIdinArrayinSearch)
          console.log("tag governarerate delteted  successfully")
          break;
   }
  }
}
  if(req.body.capitalCurrency)
  {
    var deleteIdinArrayinSearch = await SearchTag.findOne({tag:companybeforeupdate.capitalCurrency})
   if(deleteIdinArrayinSearch){
    for (var i =0; i < deleteIdinArrayinSearch.location.length; i++)
       if (deleteIdinArrayinSearch.location[i] == companybeforeupdate._id) {
          deleteIdinArrayinSearch.location.splice(i,1);
          await SearchTag.findByIdAndUpdate(deleteIdinArrayinSearch._id,deleteIdinArrayinSearch)
          console.log("tag Currecy delteted  successfully") 
          break;
   }}
  }
  if(req.body.investorEmail)
  {
    var deleteIdinArrayinSearch = await SearchTag.findOne({tag:companybeforeupdate.investorEmail})
    if(deleteIdinArrayinSearch){
    for (var i =0; i < deleteIdinArrayinSearch.location.length; i++)
       if (deleteIdinArrayinSearch.location[i] == companybeforeupdate._id) {
          deleteIdinArrayinSearch.location.splice(i,1);
          await SearchTag.findByIdAndUpdate(deleteIdinArrayinSearch._id,deleteIdinArrayinSearch)
          console.log("tag email delteted  successfully") 
          break;
   }
  }}
  if(req.body.investorName)
  {
    var resq = companybeforeupdate.investorName.split(" ")
    for(var k = 0 ; k<resq.length ; k++)
    {
   

    var deleteIdinArrayinSearch = await SearchTag.findOne({tag:resq[k]})
    if(deleteIdinArrayinSearch){
    for (var i =0; i < deleteIdinArrayinSearch.location.length; i++)
       if (deleteIdinArrayinSearch.location[i] == companybeforeupdate._id) {
          deleteIdinArrayinSearch.location.splice(i,1);
          await SearchTag.findByIdAndUpdate(deleteIdinArrayinSearch._id,deleteIdinArrayinSearch)
          console.log("tag investName delteted  successfully") 
          break;
   }
  }}
  }
  if(req.body.nameInArabic)
  {
    var resq = companybeforeupdate.nameInArabic.split(" ")
    for(var k = 0 ; k<resq.length ; k++)
    {
    

    var deleteIdinArrayinSearch = await SearchTag.findOne({tag:resq[k]})
    if(deleteIdinArrayinSearch){
    for (var i =0; i < deleteIdinArrayinSearch.location.length; i++)
       if (deleteIdinArrayinSearch.location[i] == companybeforeupdate._id) {
          deleteIdinArrayinSearch.location.splice(i,1);
          await SearchTag.findByIdAndUpdate(deleteIdinArrayinSearch._id,deleteIdinArrayinSearch)
          console.log("tag Name IN Arabic delteted  successfully") 
          break;
   }
  }}
  }
  if(req.body.nameInEnglish)
  {
    var resq = companybeforeupdate.nameInEnglish.split(" ")
    for(var k = 0 ; k<resq.length ; k++)
    {


    var deleteIdinArrayinSearch = await SearchTag.findOne({tag:resq[k]})
    if(deleteIdinArrayinSearch){

    for (var i =0; i < deleteIdinArrayinSearch.location.length; i++)
       if (deleteIdinArrayinSearch.location[i] == companybeforeupdate._id) {
          deleteIdinArrayinSearch.location.splice(i,1);
          await SearchTag.findByIdAndUpdate(deleteIdinArrayinSearch._id,deleteIdinArrayinSearch)
          console.log("tag NameInEnglish delteted  successfully") 
          break;
   }
  }}
  }



console.log(companybeforeupdate.status )
const statuss = await SearchTag.findOne({tag:companybeforeupdate.status})
if(statuss){
for (var i =0; i < statuss.location.length; i++){
if (statuss.location[i] == companybeforeupdate._id) {
   statuss.location.splice(i,1);
   await SearchTag.findByIdAndUpdate(statuss._id,statuss)
   console.log("tag status delteted  successfully")
    break;
}
}
}

if(req.body.regulationLaw)
        {
          const regulationlaw = await SearchTag.findOne({tag:updatedcompstatus.regulationLaw})
          if(regulationlaw){
          regulationlaw.location.push(companyid)
        await SearchTag.findByIdAndUpdate(regulationlaw._id,regulationlaw)
        console.log("tag regulation switched  successfully")
          }
          else{
            const newSearchTag = new SearchTag({ tag: updatedcompstatus.regulationLaw,
              location :[updatedcompstatus._id]})
              var tag = await SearchTag.create(newSearchTag)
              console.log("tag regulationLaw updated when updating company  successfully")
          }
    
        }
        if(req.body.legalCompanyForm)
        {
          const legalForm = await SearchTag.findOne({tag:updatedcompstatus.legalCompanyForm})
          if(legalForm){
          legalForm.location.push(companyid)
        await SearchTag.findByIdAndUpdate(legalForm._id,legalForm)
        console.log("tag legalForm switched  successfully")
          }
          else{
            const newSearchTag = new SearchTag({ tag: updatedcompstatus.legalCompanyForm,
              location :[updatedcompstatus._id]})
              var tag = await SearchTag.create(newSearchTag)
              console.log("tag legalCompanyForm updated when updating company  successfully")
          }
        }
        if(req.body.governerateHQ)
        {
          const governerate = await SearchTag.findOne({tag:updatedcompstatus.governerateHQ})
          if(governerate){
          governerate.location.push(companyid)
        await SearchTag.findByIdAndUpdate(governerate._id,governerate)
        console.log("tag governerate switched  successfully")
        }
        else{
          const newSearchTag = new SearchTag({ tag: updatedcompstatus.governerateHQ,
            location :[updatedcompstatus._id]})
            var tag = await SearchTag.create(newSearchTag)
            console.log("tag governerateHQ updated when updating company  successfully")
        }
      }

        if(req.body.capitalCurrency)
        {
          const currency = await SearchTag.findOne({tag:updatedcompstatus.capitalCurrency})
          if(currency){
          currency.location.push(companyid)
        await SearchTag.findByIdAndUpdate(currency._id,currency)
        console.log("tag capitalCurrency switched  successfully")
          }
          else
          {
            const newSearchTag = new SearchTag({ tag: updatedcompstatus.capitalCurrency,
              location :[updatedcompstatus._id]})
              var tag = await SearchTag.create(newSearchTag)
              console.log("tag capitalCurenncy updated when updating company  successfully")
          }
        }
        if(req.body.investorEmail)
        {
          const investEmail = await SearchTag.findOne({tag:updatedcompstatus.investorEmail})
          if(investEmail){
          investEmail.location.push(companyid)
        await SearchTag.findByIdAndUpdate(investEmail._id,investEmail)
        console.log("tag investorEmail switched  successfully")
        }else{
          const newSearchTag = new SearchTag({ tag: updatedcompstatus.investorEmail,
            location :[updatedcompstatus._id]})
            var tag = await SearchTag.create(newSearchTag)
            console.log("tag investorEmail updated when updating company  successfully")
        }}
        if(req.body.investorName)
        {
          var resq = updatedcompstatus.investorName.split(" ")
          console.log(resq)
          for(var k = 0 ; k < resq.length ; k++)
          {
          
          
            var investName = await SearchTag.findOne({tag:resq[k]})
          console.log(investName)
          if(investName)
          {
          investName.location.push(companyid)
          await SearchTag.findByIdAndUpdate(investName._id,investName)
          console.log("tag investorName switched  successfully")
        }else{
          const newSearchTag = new SearchTag({ tag: resq[k],
            location :[updatedcompstatus._id]})
            var tag = await SearchTag.create(newSearchTag)
            console.log("tag investorName updated when updating company  successfully")
        }
      }
        }
        if(req.body.nameInArabic)
        {
          
          var resq = updatedcompstatus.nameInArabic.split(" ")
          for(var k = 0 ; k<resq.length ; k++)
          {
          
          
          var arabicName = await SearchTag.findOne({tag:resq[k]})
          if(arabicName){
          arabicName.location.push(companyid)
          await SearchTag.findByIdAndUpdate(arabicName._id,arabicName)
          console.log("tag nameInArabic switched  successfully")
        }else{
          const newSearchTag = new SearchTag({ tag: resq[k],
            location :[updatedcompstatus._id]})
            var tag = await SearchTag.create(newSearchTag)
            console.log("tag nameInArabic updated when updating company  successfully")
        }}
        }
        if(req.body.nameInEnglish)
        {
          
          var resq = updatedcompstatus.nameInEnglish.split(" ")
          for(var k = 0 ; k<resq.length ; k++)
          {
          
            console.log(resq[k])
          var englishName = await SearchTag.findOne({tag:resq[k]})
          if(englishName){
            englishName.location.push(companyid)
            await SearchTag.findByIdAndUpdate(englishName._id,englishName)
            console.log("tag nameInEnglish switched  successfully")
          }
         else
         {
          const newSearchTag = new SearchTag({ tag: resq[k],
            location :[updatedcompstatus._id]})
            var tag = await SearchTag.create(newSearchTag)
            console.log("tag nameInEnglish updated when updating company  successfully")
         }
        }
        
      
      }
    const statusss = await SearchTag.findOne({tag:updatedcompstatus.status})
    if(statusss)
    {
   statusss.location.push(updatedcompstatus._id)
    await SearchTag.findByIdAndUpdate(statusss._id,statusss)
    console.log("tag statusss switched  successfully")
    }
    else
    {
      const newSearchTag = new SearchTag({ tag: updatedcompstatus.status,
        location :[updatedcompstatus._id]})
        var tag = await SearchTag.create(newSearchTag)
        console.log("tag statuss  successfully")
    }





        res.json({ msg: 'fourm updated successfully' })
      }




      
     





    }
    else{
      res.json({ auth: false, message: 'Failed to authenticate token.' })
    }

})
// alaa
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

    //governerate tag
    const government = await SearchTag.findOne({tag:company.governerateHQ})
    if(!government)
    {
      const newSearchTag = new SearchTag({ tag: company.governerateHQ,
        location :[company._id]})
        var tag = await SearchTag.create(newSearchTag)
        console.log("tag government  successfully")
    }
    else{
      government.location.push(company._id)
      await SearchTag.findByIdAndUpdate(government._id,government)
      console.log("tag government updated successfully")

    }




    // investor Name tag
          var resq = company.investorName.split(" ")
          for(var i = 0 ; i< resq.length ; i++)
      {
      var investname = await SearchTag.findOne({tag:resq[i]})
      if(!investname)
      { const newSearchTag = new SearchTag({ tag:resq[i],
        location :[company._id]

      })
      var tag = await SearchTag.create(newSearchTag)
      console.log("tag investorName successfully")

      }
      else{
      investname.location.push(company._id)
      await SearchTag.findByIdAndUpdate(investname._id,investname)
      console.log("tag investorName updated successfully")
      }
      }


        // nameInArabic tag

        var resq = company.nameInArabic.split(" ")
        for(var i = 0 ; i< resq.length ; i++)
   {
   var arabicName = await SearchTag.findOne({tag:resq[i]})
   if(!arabicName)
   { const newSearchTag = new SearchTag({ tag:resq[i],
           location :[company._id]
 
   })
   var tag = await SearchTag.create(newSearchTag)
   console.log("tag arabicName successfully")
    
   }
   else{
    arabicName.location.push(company._id)
    await SearchTag.findByIdAndUpdate(arabicName._id,arabicName)
     console.log("tag arabicName updated successfully")
   }
   }



    // investorEmail tag
   
    const investmail = await SearchTag.findOne({tag:company.investorEmail})
    if(!investmail)
    {
      const newSearchTag = new SearchTag({ tag: company.investorEmail,
        location :[company._id]})
        var tag = await SearchTag.create(newSearchTag)
        console.log("tag investorEmail  successfully")
    }
    else{
      investmail.location.push(company._id)
      await SearchTag.findByIdAndUpdate(investmail._id,investmail)
      console.log("tag investorEmail updated successfully")

    }

      // currency tag
      const currency = await SearchTag.findOne({tag:company.capitalCurrency})
      if(!currency)
      {
        const newSearchTag = new SearchTag({ tag: company.capitalCurrency,
          location :[company._id]})
          var tag = await SearchTag.create(newSearchTag)
          console.log("tag capitalCurrency  successfully")
      }
      else{
        currency.location.push(company._id)
        await SearchTag.findByIdAndUpdate(currency._id,currency)
        console.log("tag capitalCurrency updated successfully")
  
      }

    //regulation law tag
    const regulationlaw = await SearchTag.findOne({tag:company.regulationLaw})
    if(!regulationlaw)
    {
      const newSearchTag = new SearchTag({ tag: company.regulationLaw,
        location :[company._id]})
        var tag = await SearchTag.create(newSearchTag)
        console.log("tag regulationLaw updated successfully")
    }
    else
    {
      regulationlaw.location.push(company._id)
      await SearchTag.findByIdAndUpdate(regulationlaw._id,regulationlaw)
      console.log("tag regulationLaw updated successfully")
    }

    // status tag
    const statusTag =  await SearchTag.findOne({tag:company.status})
    if(!statusTag)
   { const newSearchTag = new SearchTag({ tag: company.status,
           location :[company._id]
 
   })
   var tag = await SearchTag.create(newSearchTag)
   console.log("tag status successfully")
    
   }
   else{
     statusTag.location.push(company._id)
     await SearchTag.findByIdAndUpdate(statusTag._id,statusTag)
     console.log("tag status update successfully")
   }
   
   const legalCompany = await SearchTag.findOne({tag:company.legalCompanyForm})
    resq = company.nameInEnglish.split(" ")
   // nameIn English Tag
   for(var i = 0 ; i< resq.length ; i++)
   {
   var englishName = await SearchTag.findOne({tag:resq[i]})
   if(!englishName)
   { const newSearchTag = new SearchTag({ tag:resq[i],
           location :[company._id]
 
   })
   var tag = await SearchTag.create(newSearchTag)
   console.log("tag englishName successfully")
    
   }
   else{
    englishName.location.push(company._id)
    await SearchTag.findByIdAndUpdate(englishName._id,englishName)
     console.log("tag englishName updated successfully")
   }
   }
   // type tag
   if(!legalCompany)
   { const newSearchTag = new SearchTag({ tag: company.legalCompanyForm,
           location :[company._id]
 
   })
   var tag = await SearchTag.create(newSearchTag)

   console.log("tag legalCompany successfully")
    
   }
   else{
     legalCompany.location.push(company._id)
     await SearchTag.findByIdAndUpdate(legalCompany._id,legalCompany)
     console.log("tag legalCompany  updated successfully")
   }





    res.json({ msg: 'Company was created successfully', data: company })
  } catch (error) {
    console.log(error)
  }
})
// alaa
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


    //governerate tag
    const government = await SearchTag.findOne({tag:company.governerateHQ})
    if(!government)
    {
      const newSearchTag = new SearchTag({ tag: company.governerateHQ,
        location :[company._id]})
        var tag = await SearchTag.create(newSearchTag)
        console.log("tag government  successfully")
    }
    else{
      government.location.push(company._id)
      await SearchTag.findByIdAndUpdate(government._id,government)
      console.log("tag government updated successfully")

    }




    // investor Name tag
          var resq = company.investorName.split(" ")
          for(var i = 0 ; i< resq.length ; i++)
      {
      var investname = await SearchTag.findOne({tag:resq[i]})
      if(!investname)
      { const newSearchTag = new SearchTag({ tag:resq[i],
        location :[company._id]

      })
      var tag = await SearchTag.create(newSearchTag)
      console.log("tag investorName successfully")

      }
      else{
      investname.location.push(company._id)
      await SearchTag.findByIdAndUpdate(investname._id,investname)
      console.log("tag investorName updated successfully")
      }
      }


        // nameInArabic tag

        var resq = company.nameInArabic.split(" ")
        for(var i = 0 ; i< resq.length ; i++)
   {
   var arabicName = await SearchTag.findOne({tag:resq[i]})
   if(!arabicName)
   { const newSearchTag = new SearchTag({ tag:resq[i],
           location :[company._id]
 
   })
   var tag = await SearchTag.create(newSearchTag)
   console.log("tag arabicName successfully")
    
   }
   else{
    arabicName.location.push(company._id)
    await SearchTag.findByIdAndUpdate(arabicName._id,arabicName)
     console.log("tag arabicName updated successfully")
   }
   }



    // investorEmail tag
    const investmail = await SearchTag.findOne({tag:company.investorEmail})
    if(!investmail)
    {
      const newSearchTag = new SearchTag({ tag: company.investorEmail,
        location :[company._id]})
        var tag = await SearchTag.create(newSearchTag)
        console.log("tag investorEmail  successfully")
    }
    else{
      investmail.location.push(company._id)
      await SearchTag.findByIdAndUpdate(investmail._id,investmail)
      console.log("tag investorEmail updated successfully")

    }

      // currency tag
      const currency = await SearchTag.findOne({tag:company.capitalCurrency})
      if(!currency)
      {
        const newSearchTag = new SearchTag({ tag: company.capitalCurrency,
          location :[company._id]})
          var tag = await SearchTag.create(newSearchTag)
          console.log("tag capitalCurrency  successfully")
      }
      else{
        currency.location.push(company._id)
        await SearchTag.findByIdAndUpdate(currency._id,currency)
        console.log("tag capitalCurrency updated successfully")
  
      }

    //regulation law tag
    const regulationlaw = await SearchTag.findOne({tag:company.regulationLaw})
    if(!regulationlaw)
    {
      const newSearchTag = new SearchTag({ tag: company.regulationLaw,
        location :[company._id]})
        var tag = await SearchTag.create(newSearchTag)
        console.log("tag regulationLaw updated successfully")
    }
    else
    {
      regulationlaw.location.push(company._id)
      await SearchTag.findByIdAndUpdate(regulationlaw._id,regulationlaw)
      console.log("tag regulationLaw updated successfully")
    }

    // status tag
    const statusTag =  await SearchTag.findOne({tag:company.status})
    if(!statusTag)
   { const newSearchTag = new SearchTag({ tag: company.status,
           location :[company._id]
 
   })
   var tag = await SearchTag.create(newSearchTag)
   console.log("tag status successfully")
    
   }
   else{
     statusTag.location.push(company._id)
     await SearchTag.findByIdAndUpdate(statusTag._id,statusTag)
     console.log("tag status update successfully")
   }
   
   const legalCompany = await SearchTag.findOne({tag:company.legalCompanyForm})
    resq = company.nameInEnglish.split(" ")
   // nameIn English Tag
   for(var i = 0 ; i< resq.length ; i++)
   {
   var englishName = await SearchTag.findOne({tag:resq[i]})
   if(!englishName)
   { const newSearchTag = new SearchTag({ tag:resq[i],
           location :[company._id]
 
   })
   var tag = await SearchTag.create(newSearchTag)
   console.log("tag englishName successfully")
    
   }
   else{
    englishName.location.push(company._id)
    await SearchTag.findByIdAndUpdate(englishName._id,englishName)
     console.log("tag englishName updated successfully")
   }
   }
   // type tag
   if(!legalCompany)
   { const newSearchTag = new SearchTag({ tag: company.legalCompanyForm,
           location :[company._id]
 
   })
   var tag = await SearchTag.create(newSearchTag)

   console.log("tag legalCompany successfully")
    
   }
   else{
     legalCompany.location.push(company._id)
     await SearchTag.findByIdAndUpdate(legalCompany._id,legalCompany)
     console.log("tag legalCompany  updated successfully")
   }




    res.json({ msg: 'Company was created successfully', data: company })
  } catch (error) {
    console.log(error)
  }
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
    const lawyer = await Lawyer.findById(stat)
    if (!lawyer) {
      return res.status(404).send({ error: 'lawyer does not exist' })
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
    if(stat === req.params.id)
    {
      await Lawyer.findByIdAndUpdate(stat, req.body)
      res.json({ msg: 'Lawyer updated successfully' })
    }
    else
    {
      return res.json({msg: 'You do not have the authorization'});
    }
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
    const dellawyer = await Lawyer.findById(stat)
    if (dellawyer) {
      const deletedLawyer = await Lawyer.findByIdAndRemove(stat)
      res.json({ msg: 'Lawyer was deleted successfully', data: deletedLawyer })
    } else {
      return res.json({ msg: 'You have no authorization' })
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})

router.get('/editForm/:id', async function (req, res) {
  var stat = 0
  var lawyerId = req.params.id
  const query = {
    $and: [{ status: 'RejectedReviewer' }, { lawyer: lawyerId }]
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
    stat = decoded.id
  })
    const id = stat
    const lawyer = await Lawyer.findOne({socialSecurityNumber: lawyerId}, { _id: 1 })
    const lawyerid=lawyer.id;
    if(lawyerid==id){
      if(!editableCompanies){
        res.json({ message: 'No companies to edit.'})
      }
      else{
        res.json({ data: editableCompanies })
      }

    }
    else{
      res.json({ aushoth: false, message: 'Failed to authenticate token.' })
    }

})

router.get('/getRejectedTasks/Lawyer', async (req, res) => {
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
    const id = stat
    

    const lawyerss = await Lawyer.findById(id)
    const lawyerssn = await lawyerss.socialSecurityNumber

   
  var query = {
    $and: [
      { status: 'RejectedLawyer' },
      { lawyer: lawyerssn },
      {lawyerComment : null},
    ]
  }
    const comps = await Company.find(query)

    res.json({ data:comps})
  } catch(error) {
    console.log(error)
  }
})




router.put('/addcomment/:id2',async(req,res)=>{
  var companyId = req.params.id2
  
    
 try{ 
  var stat = 0
  var token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }
  jwt.verify(token, config.secret, function (err, decoded) {
    stat = decoded.id
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
  })
 
  const currentLawyer = await Lawyer.findById(stat)
   const lawyerSSN = await currentLawyer.socialSecurityNumber
  
  var query = {
    $and: [
      { status: 'RejectedLawyer' },
      { lawyer: lawyerSSN },
      { _id: companyId }
    ]
  }

  const editableCompanies = await Company.find(query)
 
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
    
    var com =await Company.findById(companyId)

    var resq = req.body.lawyerComment.split(" ");
    for(var i = 0 ; i < resq.length ; i++ )
    {
      if(resq[i].length() >=3)
      {
  var comment = await SearchTag.findOne({tag:resq[i]})
  if(comment)
  {
 comment.location.push(com._id)
  await SearchTag.findByIdAndUpdate(comment._id,comment)
  console.log("tagLawyer comment added  successfully")
  }
  else
  {
    const newSearchTag = new SearchTag({ tag:resq[i],
      location :[companyId]})
      var tag = await SearchTag.create(newSearchTag)
      console.log("tag Lawyer comment created  successfully")
  }
}
}
console.log("done")
    res.json({ msg: 'Comment added Successfully' })
  }
}catch(error){
  res.json({ err:'error occured' })
}
})

router.put('/addcomment/:id/:companyId', async function (req, res) {
  var lawyerId = req.params.id
  var companyId = req.params.companyId
  const currentLawyer = await Lawyer.findById(lawyerID)
   const lawyerSSN = await currentLawyer.socialSecurityNumber
    
 try{ const query = {
    $and: [
      { status: 'RejectedLawyer' },
      { lawyer: lawyerSSN },
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
    stat = decoded.id
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
  })
  if (lawyerId !== stat) { return res.status(401).send({ message: 'Token does not match lawyer' }) }
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

    const com = await Company.findById(companyId)
    var resq = req.body.lawyerComment.split(" ");
    for(var i = 0 ; i < resq.length ; i++ )
    {
      if(resq[i].length() >=3)
      {
  var comment = await SearchTag.findOne({tag:resq[i]})
  if(comment)
  {
 comment.location.push(com._id)
  await SearchTag.findByIdAndUpdate(comment._id,comment)
  console.log("tag comment added  successfully")
  }
  else
  {
    const newSearchTag = new SearchTag({ tag:resq[i],
      location :[com._id]})
      var tag = await SearchTag.create(newSearchTag)
      console.log("tag comment created  successfully")
  }
}
}
  
    res.json({ msg: 'Comment added Successfully' })
  }
}catch(error){
  res.json({ err:'error occured' })
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
  const lawyer = await Lawyer.findById(stat)
  if (!lawyer) {
    return res.status(400).send({ error: 'You are not an lawyer' })
  }
  const ssn = lawyer.socialSecurityNumber
  const companyId = req.params.companyID
  const query = {
    $and: [{ lawyer: ssn }, { _id: companyId }]
  }
  const c = await Company.findOne(query)
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

  res.json({ EstimatedFees: fees , Currency: c.capitalCurrency })
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
  const id = req.params.id
  if (id !== stat) {
    return res
      .status(500)
      .send({ auth: false, message: 'Failed to authenticate' })
  }
  const lawyer = await Lawyer.findById(id)
  if (!lawyer) {
    return res.status(400).send({ error: 'You are not an lawyer' })
  }
  const ssn = lawyer.socialSecurityNumber
  const companyId = req.params.companyId
  const query = {
    $and: [{ lawyer: ssn }, { _id: companyId }, { status: { $ne: 'Accepted' } }]
  }
  const pendingCompanies = await Company.find(query)

  if (!pendingCompanies) {
    return res
      .status(404)
      .send({ error: 'There are no Fourms to be resubmitted' })
  } else {
    const x = await Company.findOneAndUpdate(query, { status: 'PendingReviewer' })

    // I will put tag here


    if(x)
      res.json({ msg: 'fourm resubmitted successfully' })
    else
      res.json({ msg: 'fourm not resubmitted' })
  }
})
router.get('/mycases', async (req, res) => {
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

    // let lawyers = await Lawyer.findById(stat)
    // if (!lawyers) {
    //   return res.status(400).send({ error: 'You are not a Lawyer' })
    // }
   
     let id = stat

      let lawyer = await Lawyer.findById(id)
      let ssn = lawyer.socialSecurityNumber
      var query = {
        $and: [$or[{ status: "PendingLawyer" },{ status: "RejectedLawyer" }], { reviewer: ssn }]
      };
      let company = await Company.find(query) // Because no Accepted companys... used 'PendingLawyer' as a test case

      res.json({ data: company })
    
  } catch (error) {
    console.log(error)
  }
  
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
    const lawyer = await Lawyer.findById(stat)
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
module.exports = router
