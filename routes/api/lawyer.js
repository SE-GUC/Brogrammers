const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const companyvalidator = require('../../validations/companyValidations');
const router = express.Router();
const mongoose = require("mongoose");
const validator = require("../../validations/LawyerValidation");
var passport = require("passport");
const Lawyer = require("../../models/Lawyer");
const Company = require("../../models/Company");


router.get("/", async (req, res) => {
  const lawyers = await Lawyer.find();
  res.send({ data: lawyers });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const lawyer = await Lawyer.findById(id);
  res.json(lawyer);
});

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




})




router.post("/register", async (req, res) => {
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
  const ssn = await Lawyer.findOne({ Social_Security_Number });
  if (ssn) return res.status(400).json({ error: "SSN already exists" });

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
  res.json({ msg: "Lawyer was created successfully", data: newLawyers });
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const lawyer = await Lawyer.findOne({}, { _id: id });
    if (!lawyer)
      return res.status(404).send({ error: "lawyer does not exist" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const updatedLawyer = await Lawyer.updateOne(req.body);

    res.json({ msg: "Lawyer updated successfully" });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedLawyer = await Lawyer.findByIdAndRemove(id);
    res.json({ msg: "Lawyer was deleted successfully", data: deletedLawyer });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});
module.exports = router;
