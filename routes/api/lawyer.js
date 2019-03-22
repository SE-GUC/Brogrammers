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
module.exports = router;
