const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var config = require("../../config/jwt");
const reviewer = require("../../models/reviewer");
/*
const uuid = require('uuid')
*/
const Admin = require("../../models/Admin");
const router = express.Router();
const validator = require("../../validations/reviewerValidations");

router.get("/", async (req, res) => {
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
  });
  const reviewers = await reviewer.find();
  res.json({ data: reviewers });
});

router.get("/:id", async (req, res) => {
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
  });
  const id = req.params.id;
  const reviewers = await reviewer.findById(id);
  res.send(reviewer);
});

//Atef Methods

//Gets all the tasks that are free for any reviewer to choose from
router.get("/getAllTasks/view", async(req,res)=>{
  var query= {reviewer:null,status:"PendingReviewer"}
  const availableCompanies= await Company.find(query);
  if(!availableCompanies){
    return res.status(404).send({ error: "There are no free tasks" });
  
  }else{
  res.json({data:availableCompanies});
  }
  
  })

//returns specific tasks of a certain reviewer by his id
  router.get("/:id/getTasks", async (req, res) => {
      const id = req.params.id;
      let rev  = await reviewer.findById(id);
      let reviewerSSN=await rev.ssn;
    
      var query = { "reviewer": reviewerSSN}
    const comps= await Company.find(query);
    
      res.json({data:comps});
    });

//Reviewer Chooses one task at a time and assigns it to himself/herself
router.put("/:id/assignFreeTask/:id2",async (req,res)=>{
  let id=req.params.id;
  let reviewerID= await reviewer.findById(id);
  let reviewerSSN= await reviewerID.ssn;
  let companyID=req.params.id2;
  var query={_id:companyID,"reviewer":null,status:"PendingReviewer"}
  let currentCompany = await Company.findOne(query);
  if(!currentCompany){
    return res.status(404).send({ error: "There are no free tasks to be assigned" });
  }else{
    const comps= await Company.findOneAndUpdate(query,{"reviewer":reviewerSSN})
  //const isValidated=await companyvalidator.updateValidationSSC
  res.json({msg: "Task assigned Successfully"});
  
  }
  
  })


//Approves the task and updates the company status 
router.put("/:id/getTasks/approve/:id2", async (req, res) => {
  try{
let id = req.params.id;
let compid = req.params.id2;
let rev = await reviewer.findById(id);
let reviewerSSN=await rev.ssn;
var query = {"reviewer":reviewerSSN, _id:compid, $or:[{status:"PendingReviewer"},{status:"RejectedReviewer"}]}
const company = await Company.find(query);
if(!company)
{
  return res.status(404).send({ error: "You have no due tasks" });
}
else{
   const comps= await Company.findByIdAndUpdate(compid,{status:"Accepted"});
    const isValidated =  await companyvalidator.updateValidationSSC({status:"Accepted"});
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
    let id= req.params.id;
  let currentReviewer = await reviewer.findById(id);
  let reviwerSSN= await currentReviewer.ssn;
  let companyID= req.params.id2;
  
  var query={"reviewer":reviwerSSN,status:"PendingReviewer",_id:companyID}
  const currentCompany= await Company.find(query);
  if(!currentCompany)
  {
    return res.status(404).send({ error: "You have no due tasks" });
  }
  else{
     const comps= await Company.findByIdAndUpdate(companyID,{status:"RejectedReviewer"});
      const isValidated = await companyvalidator.updateValidationSSC({status:"RejectedReviewer"});
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
  
  
  
  
  })




//ends here



router.put("/", async (req, res) => {
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
    const reviewers = await reviewer.findById(stat);
    if (!reviewers)
      return res.status(404).send({ error: "reviewer does not exist" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const updatedreviewer = await reviewer.findByIdAndUpdate(stat, req.body);
    res.json({ msg: "Reviewer updated successfully" });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

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
  } = req.body;
  const reviewers = await reviewer.findOne({ email });
  if (reviewers) return res.status(400).json({ error: "Email already exists" });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newReviewer = await reviewer.create(req.body);
  var token = jwt.sign({ id: newReviewer._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  res.status(200).send({
    auth: true,
    token: token,
    msg: "Reviewer was created successfully",
    data: newReviewer
  });
  res.json({ msg: "Reviewer was created successfully", data: newReviewer });
});

router.delete("/", async (req, res) => {
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
    const deletedreviewer = await reviewer.findByIdAndRemove(stat);
    res.json({
      msg: "reviewer was deleted successfully",
      data: deletedreviewer
    });
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
      const deletedreviewer = await reviewer.findByIdAndRemove(id);
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
module.exports = router;
