const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");
const Admin = require("../../models/Admin");
const validator = require("../../validations/LawyerValidation");
var config = require("../../config/jwt");
const Lawyer = require("../../models/Lawyer");

router.get("/", async (req, res) => {
  var stat = 0;
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
  });
  const lawyers = await Lawyer.find();
  res.json({ data: lawyers });
});

//Atef methods

//returns specific tasks of a certain lawyer by his id
router.get("/:id/getTasks", async (req, res) => {
  const id = req.params.id;
  const lawyerss = await Lawyer.findById(id);
  const lawyerssn=await lawyerss.Social_Security_Number;

  var query = { lawyer: lawyerssn}
const comps= await Company.find(query);

  res.json({data:comps});
});

//Gets all the tasks that are free for any lawyer to choose from
router.get("/getAllTasks/view", async(req,res)=>{
var query= {lawyer:null,status:"PendingLawyer"}
const availableCompanies= await Company.find(query);
if(!availableCompanies){
  return res.status(404).send({ error: "There are no free tasks" });

}else{
res.json({data:availableCompanies});
}

})

//Lawyer Chooses one task at a time and assigns it to himself/herself
router.put("/:id/assignFreeTask/:id2",async (req,res)=>{
let id=req.params.id;
let lawyerID= await Lawyer.findById(id);
let lawyerSSN= await lawyerID.Social_Security_Number;
let companyID=req.params.id2;
var query={_id:companyID,"lawyer":null,status:"PendingLawyer"}
let currentCompany = await Company.findOne(query);
if(!currentCompany){
  return res.status(404).send({ error: "There are no free tasks to be assigned" });
}else{
  const comps= await Company.findOneAndUpdate(query,{"lawyer":lawyerSSN})
//const isValidated=await companyvalidator.updateValidationSSC
res.json({msg: "Task assigned Successfully"});

}

})


//Approves the task and updates the company status 
router.put("/:id/getTasks/approve/:id2", async (req, res) => {
    try{
  const id = req.params.id;
  const compid = req.params.id2;
  const lawyerss = await Lawyer.findById(id);
  const lawyerssn=await lawyerss.Social_Security_Number;
  var query = {"lawyer":lawyerssn, _id:compid, $or:[{status:"PendingLawyer"},{status:"RejectedLawyer"}]}
  const company = await Company.find(query);
  if(!company)
  {
    return res.status(404).send({ error: "You have no due tasks" });
  }
  else{
     const comps= await Company.findByIdAndUpdate(compid,{status:"PendingReviewer"});
      const isValidated =  await companyvalidator.updateValidationSSC({status:"PendingReviewer"});
      if (isValidated.error)
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      res.json({ msg: "Task approved successfully"});
  }
}
catch(error){
    console.log(error);
}

});

//Disapproves the task and updates company status
router.put("/:id/getTasks/disapprove/:id2", async (req,res)=>{
try{
  const lawyerID= req.params.id;
const currentLawyer= await Lawyer.findById(lawyerID);
const lawyerSSN= await currentLawyer.Social_Security_Number;
const companyID= req.params.id2;

var query={lawyer:lawyerSSN,status:"PendingLawyer",_id:companyID}
const currentCompany= await Company.find(query);
if(!currentCompany)
{
  return res.status(404).send({ error: "You have no due tasks" });
}
else{
   const comps= await Company.findByIdAndUpdate(companyID,{status:"RejectedLawyer"});
    const isValidated = await companyvalidator.updateValidationSSC({status:"RejectedLawyer"});
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    res.json({ msg: "Task disapproved successfully"});
}
}
catch(error){
  console.log(error);
}




//creating a lawyer by Admin only
router.post('/register', async (req,res) => {
    var stat=0;
    var token = req.headers["x-access-token"];
    if (!token)
      return res.status(401).send({ auth: false, message: "Please login first." });
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err)
        return res.status(500).send({ auth: false, message: "Failed to authenticate token."})
       stat=decoded.id
    });
    const admin=await Admin.findById(stat);
    if(!admin){
    return res.status(400).send({error: 'You are not an admin'})
    } 
    const { firstName,middleName,lastName,email, password,mobile_number, Social_Security_Number, salary,birth_Date,yearsOfExperience }  = req.body
    const lawyer = await Lawyer.findOne({email})
    if(lawyer) return res.status(400).json({error: 'Email already exists'})
    const ssn = await Lawyer.findOne({ Social_Security_Number });
    if (ssn) return res.status(400).json({ error: "SSN already exists" });

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const newLawyer = new Lawyer({
            firstName,
            middleName,
            lastName,
            password: hashedPassword ,
            email,
            mobile_number,
            Social_Security_Number,
            salary,
            birth_Date,
            yearsOfExperience
        })
        const newLawyers =  await Lawyer.create(newLawyer)
        var token = jwt.sign({ id: newLawyers._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res
          .status(200)
          .send({
            auth: true,
            token: token,
            msg: "Lawyer was created successfully",
            data: newLawyers
          });
        res.json({ msg: "Lawyer was created successfully", data: newLawyers });
})



router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const lawyer = await Lawyer.findOne({}, { _id: id })
        if (!lawyer) return res.status(404).send({ error: 'lawyer does not exist' })
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedLawyer = await Lawyer.updateOne(req.body)
        res.json({ msg: 'Lawyer updated successfully' })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedLawyer = await Lawyer.findByIdAndRemove(id)
        res.json({ msg: 'Lawyer was deleted successfully', data: deletedLawyer })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})
//s2
router.post('/login', function(req, res) {
    Lawyer.findOne({ email: req.body.email}, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      //const admin = Admin.findOne({ email: req.body.email});
      const loginPassword = req.body.password;
      const userPassword = user.password;
      const match = bcrypt.compareSync(loginPassword,userPassword);
      //var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!(match)) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    });
  });

  router.get('/editForm/:id', async function(req,res){
    var lawyerId = req.params.id
    const query = {
        $and: [{status: 'RejectedReviewer'}, {lawyer: lawyerId}]
    };
    const editableCompanies = await Company.find(query,{_id: 0});
    var token = req.headers["x-access-token"];
    if (!token)
      return res.status(401).send({ auth: false, message: "No token provided." });
  
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
  
          res.json({data: editableCompanies});
    });
    
    
    });      

router.put('/editForm/:id/:companyId', async function(req,res){
    var lawyerId = req.params.id
    var companyId = req.params.companyId;
    const query = {
        $and: [{status: 'RejectedReviewer'}, {lawyer: lawyerId}, {_id: companyId}]
    };
    const editableCompanies = await Company.find(query);

    var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

  });

    if(!editableCompanies){
        return res.status(404).send({error: "There are no Fourms to be edited"})
    }
    else{
        const isValidated = companyvalidator.updateValidationSSC(req.body);
        if(isValidated.error){
            return res.status(400).send({error: isValidated.error.details[0].message});
        }
        const updatedCompany = await Company.findByIdAndUpdate(companyId,req.body);
        res.json({msg: "fourm updated successfully"});
    }
});

router.post('/lawyerinvestor/createcompany', async (req, res) => {
        try {
            const { regulationLaw, legalCompanyForm, nameInArabic, nameInEnglish, governerateHQ, cityHQ, addressHQ, telephoneHQ, faxHQ, capitalCurrency, capital, investorName,
                investorType, investorSex, investorNationality, investorIdentificationType, investorIdentificationNumber, investorBD, investorAddress, investorTelephone, investorFax,
                investorEmail } = req.body
            const newCompany = new Companys({
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
            });
            const company = await Companys.create(newCompany)
            res.json({ msg: 'Company was created successfully', data: company })
        }
        catch (error) {
            console.log(error)
        }
})

router.get('/getall/cases', async (req, res) => {
    try {
        const company = await Companys.find()
        console.log(company)
        res.json({ data: company })
    }
    catch (error) {
        console.log(error)
    }
  })

module.exports =router})




//ends here



router.get("/:id", async (req, res) => {
  var stat = 0;
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
  });
  const id = req.params.id;
  const lawyer = await Lawyer.findById(id);
  res.send(lawyer);
});

//creating a lawyer by Admin only
router.post("/register", async (req, res) => {
  var stat = 0;
  var token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(401)
      .send({ auth: false, message: "Please login first." });
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    stat = decoded.id;
  });
  const admin = await Admin.findById(stat);
  if (!admin) {
    return res.status(400).send({ error: "You are not an admin" });
  }

  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    mobile_number,
    Social_Security_Number,
    salary,
    birth_Date,
    yearsOfExperience
  } = req.body;
  const lawyer = await Lawyer.findOne({ email });
  if (lawyer) return res.status(400).json({ error: "Email already exists" });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newLawyer = new Lawyer({
    firstName,
    middleName,
    lastName,
    password: hashedPassword,
    email,
    mobile_number,
    Social_Security_Number,
    salary,
    birth_Date,
    yearsOfExperience
  });
  const newLawyers = await Lawyer.create(newLawyer);
  var token = jwt.sign({ id: newLawyers._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  res.status(200).send({
    auth: true,
    token: token,
    msg: "Lawyer was created successfully",
    data: newLawyers
  });
  res.json({ msg: "Lawyer was created successfully", data: newLawyers });
});

router.put("/", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      stat = decoded.id;
    });
    const lawyer = await Lawyer.findOne({}, { _id: stat });
    if (!lawyer)
      return res.status(404).send({ error: "lawyer does not exist" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const updatedLawyer = await Lawyer.findByIdAndUpdate(stat, req.body);
    res.json({ msg: "Lawyer updated successfully" });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});
router.delete("/", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      stat = decoded.id;
    });
    const deletedLawyer = await Lawyer.findByIdAndRemove(stat);
    res.json({ msg: "Lawyer was deleted successfully", data: deletedLawyer });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "Please login first." });
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      stat = decoded.id;
    });
    const admin = await Admin.find({_id : stat});
    console.log(admin);
    if (admin) {
      const id = req.params.id;
      const deletedreviewer = await Lawyer.findByIdAndRemove(id);
      res.json({
        msg: "Lawyer deleted successfully",
      });
    }
    else
      return res.json({message: "You do not have the authorization."});
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

router.post('/login', function (req, res) {
  Lawyer.findOne({ email: req.body.email }, function (err, user) {
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
})

router.get('/editForm/:id', async function (req, res) {
  var lawyerId = req.params.id
  const query = {
    $and: [{ status: 'RejectedReviewer' }, { lawyer: lawyerId }]
  }
  const editableCompanies = await Company.find(query, { _id: 0 })
  var token = req.headers['x-access-token']
  if (!token) { return res.status(401).send({ auth: false, message: 'No token provided.' }) }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }

    res.json({ data: editableCompanies })
  })
})

router.put('/editForm/:id/:companyId', async function (req, res) {
  var lawyerId = req.params.id
  var companyId = req.params.companyId
  const query = {
    $and: [{ status: 'RejectedReviewer' }, { lawyer: lawyerId }, { _id: companyId }]
  }
  const editableCompanies = await Company.find(query)

  var token = req.headers['x-access-token']
  if (!token) { return res.status(401).send({ auth: false, message: 'No token provided.' }) }

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
      return res.status(400).send({ error: isValidated.error.details[0].message })
    }
    await Company.findByIdAndUpdate(companyId, req.body)
    res.json({ msg: 'fourm updated successfully' })
  }
})

router.post('/lawyerinvestor/createcompany', async (req, res) => {
  try {
    const { regulationLaw, legalCompanyForm, nameInArabic, nameInEnglish, governerateHQ, cityHQ, addressHQ, telephoneHQ, faxHQ, capitalCurrency, capital, investorName,
      investorType, investorSex, investorNationality, investorIdentificationType, investorIdentificationNumber, investorBD, investorAddress, investorTelephone, investorFax,
      investorEmail } = req.body
    const newCompany = new Companys({
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
    const company = await Companys.create(newCompany)
    res.json({ msg: 'Company was created successfully', data: company })
  } catch (error) {
    console.log(error)
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


router.put('/addcomment/:id/:companyId',async function(req,res){
  var lawyerId= req.params.id
  var companyId= req.params.companyId
  const query={
    $and:[{status:'RejectedLawyer'},{lawyer:lawyerId},{_id:companyId}]
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
    const updatedCompany= await Company.findByIdAndUpdate(companyId, {lawyerComment : req.body});
    res.json({ msg: 'Comment added Successfully' })
    }
  

});



router.put('/resubmit/:id/:companyId', async function(req,res){
  var lawyerId = req.params.id
  var companyId = req.params.companyId;
  const query = {
      $and: [ {lawyer: lawyerId}, {_id: companyId} ]
  };
  const pendingCompanies = await Company.find(query);

  
  if(!pendingCompanies){
      return res.status(404).send({error: "There are no Fourms to be resubmitted"})
  }
  else{
     const updatedCompany = await Company.findByIdAndUpdate(companyId,{"status":"PendingReviewer"});
      res.json({msg: "fourm resubmitted successfully"});
  }
});
module.exports = router;
