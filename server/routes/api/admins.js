const express = require("express");
const mongoose = require("mongoose");
const router = express();
const Admin = require("../../models/Admin.js");
var config = require("../../config/jwt");
const validator = require("../../validations/adminValidations");
const bcrypt = require("bcryptjs");
const Company = require("../../models/Company");
const FormSchema = require("../../models/FormSchema");
var jwt = require("jsonwebtoken");
const formidable = require("formidable");
var generator = require("mongoose-gen");
var multer = require("multer");
var cors = require("cors");

router.use(cors());
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

router.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  console.log(file);
  const fs = require("fs");
  // let filename=req.file.originalname
  let rawdata = fs.readFileSync(req.file.path);
  let jsonData = JSON.parse(rawdata);
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send({ file, data: jsonData });
});

// Logout Sprin2
router.get("/logout", function(req, res) {
  res.status(200).send({ auth: false, token: null });
});
//changed by manga, IF YOU'RE NOT GOING TO CHANGE THIS ADMIN FILE PLEASE TAKE THIS FILE
router.get("/", async (req, res) => {
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
    });
    const info = [];
    const arrayOfAdmins = await Admin.find();
    for (var i = 0; i < arrayOfAdmins.length; i++) {
      const admin = arrayOfAdmins[i];
      var curr = {
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
    res.send({ data: info });
  } catch (error) {
    res.status(404).send({ msg: "Admin doesn't exist" });
  }
});

//upload json files to be converted to a form

router.post("/submit-form", upload.single("myFile"), async (req, res, next) => {
  const fs = require("fs");
  try {
    let filename = req.file.originalname;
    let rawdata = fs.readFileSync(req.file.path);
    let jsonData = JSON.parse(rawdata);
    console.log(jsonData);
    if (!rawdata) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    } else {
      let uploadedSchema = jsonData;
      let formName = filename.substring(0, filename.length - 5);
      console.log("Uploaded file", formName);
      const found = await FormSchema.findOne({ legalCompanyForm: formName });
      if (!found) {
        await FormSchema.create({
          legalCompanyForm: formName,
          formSchema: uploadedSchema
        });
      }
      var newCompanySchema = new mongoose.Schema(
        generator.convert(uploadedSchema.properties)
      );
      console.log(formName);
      Company.discriminator(formName, newCompanySchema);
      console.log("successfully created");
      console.log(Object.keys(Company.discriminators));
      res.send({ msg: "successfully created" });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

router.get("/company/types", async (req, res) => {
  try {
    const companytypes = await FormSchema.find({},{legalCompanyForm:1,_id:0})
    console.log(companytypes);
    if (companytypes) 
    res.send({ data: companytypes });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get("/schema/:companytype", async (req, res) => {
  const companytype = req.params.companytype;
  try {
    const companyschema = await FormSchema.findOne({
      legalCompanyForm: companytype
    });
    console.log(companyschema);
    if (companyschema) res.send({ data: companyschema.formSchema });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
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
    });
    const admin = await Admin.findById(adminId);
    var curr = {
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
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "Please login first" });
    }
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      stat = decoded.id;
    });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }
    const admin = await Admin.findById(stat);
    if (req.params.id === stat) {
      if (admin) {
        await Admin.findByIdAndUpdate(stat, req.body);
      }
      res.json({ msg: "Information updated successfully" });
    } else {
      return res.json({ msg: "You don't have the authorization" });
    }
  } catch (error) {
    res.status(404).send({ msg: "Admin doesn't exist" });
  }
});

// Register admin by another admin
router.post("/register", async (req, res) => {
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
    const admin2 = await Admin.findById(stat);
    if (!admin2) {
      return res.status(400).json({ error: "You are not an admin" });
    }
    const {
      name,
      email,
      password,
      phone,
      gender,
      birthDate,
      joinDate
    } = req.body;
    const isValidated = validator.createValidation(req.body);
    const admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ error: "Email already exists" });
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      birthDate,
      joinDate
    });
    var newAd = await Admin.create(newAdmin);
    token = jwt.sign({ id: newAd._id }, config.secret, {
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

// Sprint Two
router.post("/login", function(req, res) {
  Admin.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      return res.status(401).send({ auth: false, message: "Server error." });
    }
    if (!user) {
      return res.status(401).send({ auth: false, message: "No user found." });
    }
    const loginPassword = req.body.password;
    const userPassword = user.password;
    const match = bcrypt.compareSync(loginPassword, userPassword);
    if (!match) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token, id: user._id });
  });
});

router.delete("/", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "Please login first" });
    }
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      stat = decoded.id;
    });
    const currUser = await Admin.findById(stat);
    if (currUser) {
      await Admin.findByIdAndRemove(stat);
      res.json({ msg: "Admin deleted successfully" });
    } else {
      return res.json({ msg: "You don't have the authorization" });
    }
  } catch (error) {
    res.status(404).send({ msg: "Admin doesn't exist" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "Please login first" });
    }
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      stat = decoded.id;
    });
    const id = req.params.id;
    const currUser = await Admin.findById(stat);
    const delUser = await Admin.findById(id);
    if (currUser) {
      if (delUser) {
        await Admin.findByIdAndRemove(id);
        res.json({ msg: "Admin deleted successfully" });
      } else {
        return res.json({ msg: "Admin does not exist" });
      }
    } else {
      return res.json({ msg: "You don't have the authorization" });
    }
  } catch (error) {
    res.status(404).send({ msg: "Admin doesn't exist" });
  }
});
// alaa
router.get("/getall/cases", async (req, res) => {
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
    const admin = await Admin.findById(stat);
    if (!admin) {
      return res.status(400).send({ error: "You are not an admin" });
    }
    const company = await Company.find();
    console.log(company);
    res.json({ data: company });
  } catch (error) {
    console.log(error);
  }
});

// Register admin by another admin
router.post("/registerNo", async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    gender,
    birthDate,
    joinDate
  } = req.body;
  const isValidated = validator.createValidation(req.body);
  const admin = await Admin.findOne({ email });
  if (admin) return res.status(400).json({ error: "Email already exists" });
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newAdmin = new Admin({
    name,
    email,
    password: hashedPassword,
    phone,
    gender,
    birthDate,
    joinDate
  });
  var newAd = await Admin.create(newAdmin);
  token = jwt.sign({ id: newAd._id }, config.secret, {
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
});
//manga's shit
router.put("/", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "Please login first" });
    }
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      stat = decoded.id;
    });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }
    const admin = await Admin.findById(stat);
    if (admin) {
      await Admin.findByIdAndUpdate(stat, req.body);
      res.json({ msg: "Information updated successfully" });
    }
  } catch (error) {
    res.status(404).send({ msg: "Admin doesn't exist" });
  }
});

module.exports = router;
