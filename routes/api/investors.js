const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const Company = require("../../models/Company");
const Investor = require("../../models/Investor");
const index = require("../../index");
const validator = require("../../validations/investorValidations");
const companyvalidator = require("../../validations/companyValidations");
const bcrypt = require("bcryptjs");

//View All Investors
//router.get('/investors', (req, res) => res.send(investors));
router.get("/", async (req, res) => {
  const investors = await Investor.find();
  res.json({ data: investors });
});

//View an Investor
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const investor = await Investor.findById(id);
  res.json({ data: investor });
});

router.put("/:id/Requests/:companyid/", async (req, res) => {
  try {
    const id = req.params.id;
    const companyid = req.params.companyid;
    console.log(companyid);
    const investor = await Investor.findById(id);
    const inid = investor.idNumber;
    const query = {
      $and: [{ investorIdentificationNumber: inid }, { _id: companyid }]
    };
    const company = await Company.findOne(query,{_id:1});
    console.log(company)
    if (!company)
      return res.status(404).send({ error: "Company does not exist" });
    else {
      const isValidated = companyvalidator.updateValidationSSC(req.body);
      if (isValidated.error)
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      const updatedCompany = await Company.findByIdAndUpdate(
        companyid,
        req.body
      );
      res.json({ msg: "Form Updated Successfully" });
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

router.get("/:id/Requests", async (req, res) => {
  const id = req.params.id;
  const investor = await Investor.findById(id);
  const inid = investor.idNumber;
  const query = { $and: [{ investorIdentificationNumber: inid }, {}] };
  const company = await Company.find(query, {
    status: 1,
    lawyer: 1,
    lawyerComment: 1,
    _id: 0
  });
  console.log(inid);
  console.log(company);
  res.json({ data: company });
});

router.post("/create", async (req, res) => {
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
  } = req.body;
  const investor = await Investor.findOne({ mail });
  if (investor) return res.status(400).json({ error: "Email already exists" });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
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
  res.json({ msg: "Investor was created successfully", data: newInvestor });
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const investor = await Investor.findOne( { _id: id },{});
    console.log(investor);
    if (!investor)
      return res.status(404).send({ error: "Investor does not exist" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const updatedInvestor = await Investor.findByIdAndUpdate(id,req.body);
    res.json({ msg: "Investor updated successfully" });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedInvestor = await Investor.findByIdAndRemove(id);
    res.json({
      msg: "Investor was successfully deleted",
      data: deletedInvestor
    });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

module.exports = router;
