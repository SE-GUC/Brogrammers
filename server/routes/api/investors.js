const express = require("express");
const router = express.Router();
const Investor = require("../../models/Investor");
const validator = require("../../validations/investorValidations");
const companyvalidator = require("../../validations/companyValidations");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var config = require("../../config/jwt");
const Admin = require("../../models/Admin");
const Company = require("../../models/Company");
const nodemailer = require("nodemailer");
var stripe = require("stripe")("sk_test_Vv7YbqIhi1pfFmwt4dKAFUvb000Duiu0d8");
var PDFDocument = require("pdfkit");
var SearchTag = require("../../models/SearchTag")
// Logout Sprint2
router.get("/logout", function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.get("/getall/cases", async (req, res) => {
  try {
    const company = await Company.find();
    console.log(company);
    res.json({ data: company });
  } catch (error) {
    console.log(error);
  }
});

// View All Investors
router.get("/", async (req, res) => {
  var token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ auth: false, message: "No Token provided." });
  }
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
  });
  const investors = await Investor.find();
  res.json({ data: investors });
});

// View an Investor
router.get("/:id", async (req, res) => {
  var token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ auth: false, message: "No Token provided." });
  }
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
  });
  const id = req.params.id;
  const investor = await Investor.findById(id);
  res.json({ data: investor });
});

// Update Company after being rejected by lawyer
router.put("/MyRequests/:companyid/", async (req, res) => {
  var stat = 0;
  var token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .send({ auth: false, message: "Please login first." });
  }
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    stat = decoded.id;
  });

  try {
    const companyid = req.params.companyid;
    console.log(companyid);
    const investor = await Investor.findById(stat);
    const inid = investor.idNumber;
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

      const companybeforeupdate = await Company.findById(companyid)
     
      
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


      await Company.findByIdAndUpdate(companyid, req.body)

      const updatedcompstatus = await Company.findByIdAndUpdate(companyid, {
        status: 'PendingLawyer'
      })


      // insert the ids of the updated tags in the search tag Array 
      
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
    const statusss = await SearchTag.findOne({tag:"PendingLawyer"})
    if(statusss)
    {
   statusss.location.push(companyid)
    await SearchTag.findByIdAndUpdate(statusss._id,statusss)
    console.log("tag statusss switched  successfully")
    }
    else
    {
      const newSearchTag = new SearchTag({ tag: "PendingLawyer",
        location :[updatedcompstatus._id]})
        var tag = await SearchTag.create(newSearchTag)
        console.log("tag statuss  successfully")
    }

 //     regulationLaw, // tag finished
 //     legalCompanyForm, // tag finished
 //     nameInArabic, // tag finished
 //     nameInEnglish,// tag finished
 //     governerateHQ,/
 //     capitalCurrency
 // investorName,
 // investorEmail

  
      res.json({ msg: 'Form Updated Successfully', data: updatedcompstatus })
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
}
)
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
  });
  const newInvestor = await Investor.create(newInv);
  token = jwt.sign({ id: newInvestor._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  res.status(200).send({
    auth: true,
    token: token,
    msg: "Investor was created successfully",
    data: newInvestor
  });
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "gafiegcc@gmail.com", // generated ethereal user
      pass: "Gafi221263" // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = {
    from: '"GAFI"', // sender address
    to: newInvestor.mail, // list of receivers
    subject: "Your account was created succefully ✔", // Subject line
    text: "Thank you for registering in GAFIs online portal", // plain text body
    html: "<b>Thank you for registering in GAFIs online portal</b>" // html body
  };
  transporter.sendMail(info, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log(info);
  });
  res.json({ msg: "Investor was created successfully", data: newInvestor });
});

router.put("/:id", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      stat = decoded.id;
    });
    const investor = await Investor.findById(stat);
    if (!investor) {
      return res.status(404).send({ error: "Investor does not exist" });
    }
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }
    if (stat === req.params.id) {
      await Investor.findByIdAndUpdate(stat, req.body);
      res.json({ msg: "Investor updated successfully" });
    } else {
      res.json({ msg: "You do not have the authorization" });
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

router.get("/View/ViewCompanies", async (req, res) => {
  var stat = 0;
  try {
    var token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      stat = decoded.id;
    });
    const investor = await Investor.findById(stat);
    const investorNatID = investor.idNumber;
    const arrayOfCompanies = await Company.find({
      investorIdentificationNumber: investorNatID
    });
    res.json({ msg: "Your Companies ", data: arrayOfCompanies });
  } catch (error) {
    res.status(404).send({ msg: "Investor doesn't exist" });
  }
});
// manga
router.delete("/", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      stat = decoded.id;
    });
    const currInv = await Investor.findById(stat);
    if (!currInv) {
      return res.json({ msg: "Investor not found" });
    }
    const deletedInvestor = await Investor.findByIdAndRemove(stat);
    res.json({
      msg: "Investor was successfully deleted",
      data: deletedInvestor
    });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});
// manga
router.delete("/:id", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "Please login first." });
    }
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      stat = decoded.id;
    });
    const admin = await Admin.findById(stat);
    const id = req.params.id;
    const currInv = await Investor.findByIdAndDelete(id);
    console.log(admin);
    if (admin) {
      if (currInv) {
        await Investor.findByIdAndRemove(id);
        res.json({
          msg: "Investor deleted successfully"
        });
      } else {
        res.json({ msg: "Investor doesn't exist" });
      }
    } else {
      return res.json({ message: "You do not have the authorization." });
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

router.post("/createspccompany", async (req, res) => {
  var stat = 0;
  try {
    var token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "Please login first." });
    }
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      stat = decoded.id;
    });
    const currInvestor = await Investor.findById(stat);
    if (!currInvestor) {
      return res.status(404).send({ error: "Investor does not exist" });
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
      regulationLaw, // tag finished
      legalCompanyForm, // tag finished
      nameInArabic, // tag finished
      nameInEnglish,// tag finished
      governerateHQ,// tag finished
      cityHQ,
      addressHQ,
      telephoneHQ,
      faxHQ,
      capitalCurrency, // tag finished
      capital,
      investorName, // tag finished 
      investorSex,
      investorNationality,
      investorIdentificationType,
      investorIdentificationNumber,
      investorBD,
      investorAddress,
      investorTelephone,
      investorFax,
      investorEmail // tag finished 
    })
    const company = await Company.create(newCompany)
    // Insert Tags into the searchTag code in creating the company from code line 479 till 635
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

router.get('/:id/:companyID/viewFees', async (req, res) => {
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

  res.json({ EstimatedFees: fees })
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



router.post("/searchCases",async function(req , res) {

var search = req.body.tag
//var collection = await SearchTag.find({ tag: ("/^" + search +"/") })
var index = req.body.index
var breakFlag = 0
var counter = 0
var collection = await SearchTag.find({tag: new RegExp(search)})

var data = []
for(var i = 0 ; i<collection.length ; i++)
{ console.log("I am in")
  for(var k = 0 ; k<collection[i].location.length ; k++ )
  { if(counter>=index*4  )
    {
    var company = await Company.findById({_id :collection[i].location[k]})
    data.push(company)
    console.log("Fetching counter: "+counter )
    }
    console.log(counter)
    counter++
    
    console.log(index*4+4)
    if(counter>=(index*4+4))
    {
      breakFlag = 1;
      break;
    }
  }
  if(breakFlag ==1)
    break;

}

res.json({Search : data})

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
