const express = require("express");
const Joi = require("joi");
const uuid = require("uuid");
const router = express.Router();
const Admin = require("../../models/Admin.js");
const mongoose = require("mongoose");
var config = require("../../config/jwt");
const validator = require("../../validations/adminValidations");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
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
    });
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
    res.status(404).send({ msg: "Admin doesn't exist" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
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
    res.status(404).send({ msg: "Admin doesn't exist" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "Please login first" });
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      stat = decoded.id;
    });
    if (id === stat) {
      const isValidated = validator.updateValidation(req.body);
      if (isValidated.error) {
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      }
      const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body);
      // res.send(admin);
      res.json({ msg: "Information updated successfully" });
    } else {
      res.status(401).send({
        auth: false,
        message: "You don't have the authorization for this."
      });
    }
  } catch (error) {
    res.status(404).send({ msg: "Admin doesn't exist" });
  }
});

//Register admin by another admin
router.post("/", async (req, res) => {
  var stat = 0;
  try {
    var token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "Please login first." });
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err) stat = decoded.id;
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
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

router.delete("/:id", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "Please login first" });
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      stat = decoded.id;
    });
    const id = req.params.id;
    if (stat === id) {
      const admin = await Admin.findByIdAndRemove(id);
      res.json({ msg: "Admin deleted successfully" });
    } else {
      res
        .status(401)
        .send({ auth: false, message: "You don't have the authorization" });
    }
  } catch (error) {
    res.status(404).send({ msg: "Admin doesn't exist" });
  }
});

module.exports = router;
