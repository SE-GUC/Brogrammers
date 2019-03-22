const express = require("express");
const Joi = require("joi");
const uuid = require("uuid");
const router = express.Router();
const Admin = require("../../models/Admin.js");
const mongoose = require("mongoose");
var config = require("../../config/jwt");
const validator = require("../../validations/adminValidations");
const bcrypt = require("bcryptjs");
const Companys = require("../../models/Company");
var jwt = require("jsonwebtoken");
router.get("/", async (req, res) => {
  try {
    const info = [];
    const arrayOfAdmins = await Admin.find();
    for (var i = 0; i < arrayOfAdmins.length; i++) {
      const admin = arrayOfAdmins[i];
      curr = {
        name: admin.name,
        id: admin.id,
        birthDate: admin.birthDate,
        gender: admin.gender,
        joinDate: admin.joinDate,
        email: admin.email,
        phone: admin.phone
      };
      info.push(curr);
    }
    res.send(info);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId);
    curr = {
      name: admin.name,
      id: admin.id,
      birthDate: admin.birthDate,
      gender: admin.gender,
      joinDate: admin.joinDate,
      email: admin.email,
      phone: admin.phone
    };
    res.send(curr);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }
    const id = req.params.id;
    const updatedAdmin = await Admin.FindByIdAndUpdate(id, req.body);
    // res.send(admin);
    res.json({ msg: "Information updated successfully" });
  } catch (error) {
    console.log(error);
  }
});

//Register admin by another admin
router.post("/register", async (req, res) => {
  var stat = 0;
  try {
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
    const admin2 = await Admin.findById(stat);
    if (!admin2) {
      return res.status(400).json({ error: "You are not an admin" });
    }
    const email = req.body.email;
    const isValidated = validator.createValidation(req.body);
    const admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ error: "Email already exists" });
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }

    const newAdmin = await Admin.create(req.body);

    var token = jwt.sign({ id: newAdmin._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({
      auth: true,
      token: token,
      msg: "Admin was created successfully",
      data: newAdmin
    });
    res.json({ msg: "Admin was created successfully", data: newAdmin });
    res.json({ msg: "Admin created successfully", data: newAdmin });
  } catch (error) {
    console.log(error);
  }
});

//Sprint Two
router.post("/login", function(req, res) {
  Admin.findOne({ email: req.body.email }, function(err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");
    const loginPassword = req.body.password;
    const userPassword = user.password;
    if (!(loginPassword == userPassword))
      return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findByIdAndRemove(id);
    res.json({ msg: "Admin deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/getall/cases", async (req, res) => {
  try {
    const company = await Companys.find();
    console.log(company);
    res.json({ data: company });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
