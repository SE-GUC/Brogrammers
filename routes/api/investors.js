const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const flash = require("connect-flash");
const Investor = require("../../models/Investor");
const validator = require("../../validations/investorValidations");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var config = require("../../config/jwt");
const Admin = require("../../models/Admin");

//View All Investors
router.get("/", async (req, res) => {
  const investors = await Investor.find();
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    res.json({ id: decoded, data: investors });
  });
});

//View an Investor
router.get("/:id", async (req, res) => {
  var stat = 0;
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No Token provided." });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
  });
  const id = req.params.id;
  const investor = await Investor.findById(id);
  res.json({ data: investor });
});

router.post("/register", async (req, res) => {
  var token = req.headers["x-access-token"];
  if (token)
    return res
      .status(401)
      .send({ auth: false, message: "You are already logged in" });
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
  const hashedPassword = bcrypt.hashSync(password, 10);
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
  var token = jwt.sign({ id: newInvestor._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  res.status(200).send({
    auth: true,
    token: token,
    msg: "Investor was created successfully",
    data: newInvestor
  });
  res.json({ msg: "Investor was created successfully", data: newInvestor });
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
    const id = req.params.id;
    const investor = await Investor.findOne({}, { _id: stat });
    if (!investor)
      return res.status(404).send({ error: "Investor does not exist" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const updatedInvestor = await Investor.updateOne(req.body);
    res.json({ msg: "Investor updated successfully" });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

router.get("/View/ViewCompanies", async (req, res) => {
  var stat = 0;
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    stat = decoded.id;
  });
  const investor = await Investor.findById(stat);
  const investorNatID = investor.idNumber;
  const arrayOfCompanies = await Company.find({
    investorIdentificationNumber: investorNatID
  });
  res.json({ msg: "Your Companies ", data: arrayOfCompanies });
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
      const deletedreviewer = await Investor.findByIdAndRemove(id);
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

module.exports = router;
