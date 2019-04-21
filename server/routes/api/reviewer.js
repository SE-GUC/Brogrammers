const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
var config = require("../../config/jwt");
const Reviewer = require("../../models/Reviewer");
const Company = require("../../models/Company");
const Admin = require("../../models/Admin");
const validator = require("../../validations/reviewerValidations");
const companyvalidator = require("../../validations/companyValidations");
const nodemailer = require("nodemailer");
const SearchTag = require('../../models/SearchTag')

router.get("/", async (req, res) => {
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
  const reviewers = await Reviewer.find();
  res.json({ data: reviewers });
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
    const reviewer = await Reviewer.findById(stat);
    if (!reviewer) {
      return res.status(400).send({ error: "Reviewer does not exist." });
    }
    const company = await Company.find();
    console.log(company);
    res.json({ data: company });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
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
  const id = req.params.id;
  const reviewers = await Reviewer.findById(id);
  console.log("reviwer in get is " + reviewers);
  res.send(reviewers);
});

// Atef Methods

// Gets all the tasks that are free for any reviewer to choose from
router.get("/getAllTasks/view", async (req, res) => {
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

    var query = { reviewer: null, status: "PendingReviewer" };
    const availableCompanies = await Company.find(query);
    if (!availableCompanies) {
      return res.status(404).send({ error: "There are no free tasks" });
    } else {
      res.json({ data: availableCompanies });
    }
  } catch (error) {
    console.log(error);
  }
});

// returns specific tasks of a certain reviewer by his id
router.get('/getTasks/Reviewer', async (req, res) => {
  try {
    var stat = 0
    var token = req.headers['x-access-token'];
   
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: 'Please login first.'});
    }
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.'});
      }

      stat=decoded.id;
    })

    let id = stat;
  
    const rev = await Reviewer.findById(id);
    const reviewerSSN = await rev.ssn;

    var query = { 
      reviewer: reviewerSSN , 
      $or:[{status:"PendingReviewer"},{status:"RejectedReviewer"}]
    }

    const comps = await Company.find(query);

    res.json({data:comps})

  } catch(error) {
    console.log(error);
  }

})

// Reviewer Chooses one task at a time and assigns it to himself/herself
router.put("/assignFreeTask/:id2", async (req, res) => {
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

    const id = stat;
  
    let reviewerID = await Reviewer.findById(id);
    let reviewerSSN = await reviewerID.ssn;
    let companyID = req.params.id2;
    var query = { _id: companyID, reviewer: null, status: "PendingReviewer" };
    let currentCompany = await Company.findOne(query);
    if (!currentCompany) {
      return res
        .status(404)
        .send({ error: "There are no free tasks to be assigned" });
    } else {
      await Company.findOneAndUpdate(query, { reviewer: reviewerSSN });
      // const isValidated=await companyvalidator.updateValidationSSC
      var SSN = await SearchTag.findOne({tag:reviewerSSN})
   
      if(SSN)
      {
     SSN.location.push(companyID)
      await SearchTag.findByIdAndUpdate(SSN._id,SSN)
      console.log("tag reviewerSSN updated  successfully")
      }
      else
      {
        const newSearchTag = new SearchTag({ tag:reviewerSSN,
          location :[companyID]})
          var tag = await SearchTag.create(newSearchTag)
          console.log("tag reviewerSSN  successfully")
      }




      res.json({ msg: "Task assigned Successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Approves the task and updates the company status
router.put("/getTasks/approve/:id2", async (req, res) => {
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
    const id = stat;
  
    let compid = req.params.id2;
    let rev = await Reviewer.findById(id);
    let reviewerSSN = await rev.ssn;
    var query = {
      reviewer: reviewerSSN,
      _id: compid,
      $or: [{ status: "PendingReviewer" }, { status: "RejectedReviewer" }]
    };
    const company = await Company.find(query);
    if (!company) {
      return res.status(404).send({ error: "You have no due tasks" });
    } else {
      await Company.findByIdAndUpdate(compid, { status: "Accepted" });
      const isValidated = await companyvalidator.updateValidationSSC({
        status: "Accepted"
      });
     

      if (isValidated.error) {
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      }
      let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'gafiegcc@gmail.com', // generated ethereal user
          pass: 'Gafi221263' // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
      });




      var deleteIdinArrayinSearch = await SearchTag.findOne({tag:"PendingReviewer"})
    
    
    if(deleteIdinArrayinSearch){
    for (var i =0; i < deleteIdinArrayinSearch.location.length; i++)
    {
       if (deleteIdinArrayinSearch.location[i] == compid) {
          deleteIdinArrayinSearch.location.splice(i,1);
          await SearchTag.findByIdAndUpdate(deleteIdinArrayinSearch._id,deleteIdinArrayinSearch)
          console.log("tag state  delteted  successfully")
          break;
        }
   }
  }
  var statusss = await SearchTag.findOne({tag:"AcceptedReviewer"})
  if(statusss)
  {
 statusss.location.push(compid)
  await SearchTag.findByIdAndUpdate(statusss._id,statusss)
  console.log("tag statusss switched  successfully")
  }
  else
  {
    const newSearchTag = new SearchTag({ tag:"AcceptedReviewer",
      location :[compid]})
      var tag = await SearchTag.create(newSearchTag)
      console.log("tag statuss  successfully")
  }
    
      // send mail with defined transport object
      let info ={
        from: '"GAFI"', // sender address
        to: company.investorEmail, // list of receivers
        subject: "Company acceptance", // Subject line
        text: "Dear "+company.investorName + "\n The company you ware creating was accepted please check GAFIs online portal to view the fees and pay. \n Thank you", // plain text body
        html: "<b>Dear "+company.investorName + "\n The company you ware creating was accepted by the lawyer please check GAFIs online portal to view the fees and pay. \n Thank you</b>" // html body
      };
    transporter.sendMail(info,(error,info)=>{
      if(error){
        console.log(error)
      }
      console.log(info)
    })
    res.json({ msg: "Task approved successfully" });
      //hereeeee
    }
  } catch (error) {
    console.log(error);
  }
});

// Disapproves the task and updates company status
router.put("/getTasks/disapprove/:id2", async (req, res) => {
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
    const id = stat;
   
    let currentReviewer = await Reviewer.findById(id);
    let reviwerSSN = await currentReviewer.ssn;
    let companyID = req.params.id2;

    var query = {
      reviewer: reviwerSSN,
      status: { $ne: "Accepted" },
      status: "PendingReviewer",
      _id: companyID
    };
    const currentCompany = await Company.findOne(query);
    if (!currentCompany) {
      return res.status(404).send({ error: "You have no due tasks" });
    } else {
      await Company.findByIdAndUpdate(companyID, {
        status: "RejectedReviewer"
      });
      const isValidated = await companyvalidator.updateValidationSSC({
        status: "RejectedReviewer"
      });
      if (isValidated.error) {
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      }


      var deleteIdinArrayinSearch = await SearchTag.findOne({tag:"PendingReviewer"})
    
    
      if(deleteIdinArrayinSearch){
      for (var i =0; i < deleteIdinArrayinSearch.location.length; i++)
      {
         if (deleteIdinArrayinSearch.location[i] == companyID) {
            deleteIdinArrayinSearch.location.splice(i,1);
            await SearchTag.findByIdAndUpdate(deleteIdinArrayinSearch._id,deleteIdinArrayinSearch)
            console.log("tag regulation law delteted  successfully")
            break;
          }
     }
    }
  
    var statusss = await SearchTag.findOne({tag:"RejectedReviewer"})
    if(statusss)
    {
   statusss.location.push(companyID)
    await SearchTag.findByIdAndUpdate(statusss._id,statusss)
    console.log("tag statusss switched  successfully")
    }
    else
    {
      const newSearchTag = new SearchTag({ tag:"RejectedReviewer",
        location :[companyID]})
        var tag = await SearchTag.create(newSearchTag)
        console.log("tag statuss  successfully")
    }
  


      res.json({ msg: "Task disapproved successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// ends here

router.put("/:id", async (req, res) => {
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
    const reviewers = await Reviewer.findById(stat);
    if (!reviewers) {
      return res.status(404).send({ error: "reviewer does not exist" });
    }
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }
    const reviewer = Reviewer.findById(stat);
    if (reviewer) {
      if (stat === req.params.id) {
        await Reviewer.findByIdAndUpdate(stat, req.body);
        res.json({ msg: "Reviewer updated successfully" });
      } else {
        return res.json({ msg: "You do not have the authorization" });
      }
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

router.post('/register', async (req, res) => {
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
  const isValidated = validator.createValidation(req.body)
  const admin = await Admin.findById(stat)
  if (!admin) {
    return res.status(400).send({ error: 'You are not an admin' })
  }
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message })
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
    birth
  } = req.body
  const reviewers = await Reviewer.findOne({ email })
  if (reviewers) return res.status(400).json({ error: 'Email already exists' })
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
  var newReviewer = new Reviewer({
    ssn,
    name,
    gender,
    address,
    phone,
    email,
    password: hashedPassword,
    yearsOfExperience,
    age,
    birth
  })

  var newRev = await Reviewer.create(newReviewer)
  token = jwt.sign({ id: newRev._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  })
  res.status(200).send({
    auth: true,
    token: token,
    msg: 'Reviewer was created successfully',
    data: newReviewer
  })
  res.json({ msg: 'Reviewer was created successfully', data: newReviewer })
})

router.delete("/", async (req, res) => {
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
    const reviewer = await Reviewer.findById(stat);
    if (reviewer) {
      const deletedreviewer = await Reviewer.findByIdAndRemove(stat);
      res.json({
        msg: "reviewer was deleted successfully",
        data: deletedreviewer
      });
    } else {
      return res.json({ msg: 'Reviewer does not exists' })
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

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
    const reviewer = await Reviewer.findById(id);
    console.log("reviewer is " + reviewer);
    console.log(admin);
    if (admin) {
      if (reviewer) {
        await Reviewer.findByIdAndRemove(id);
        res.json({
          msg: "Reviewer deleted successfully"
        });
      } else {
        return res.json({ msg: "Reviewer does not exist" });
      }
    } else {
      return res.json({ message: "You do not have the authorization." });
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

router.get('/getRejectedTasks/Reviewer', async (req, res) => {
    try {
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
      const id = stat
      
  
      const reviewerss = await Reviewer.findById(id)
      const reviewerssn = await reviewerss.socialSecurityNumber
  
     
    var query = {
      $and: [
        { status: 'RejectedReviewer' },
        { reviewer: reviewerssn },
      ]
    }
      const comps = await Company.find(query)
  
      res.json({ data:comps})
    } catch(error) {
      console.log(error)
    }
  })
  


router.put('addcomment/id2',async(req,res)=>{
  var companyId = req.params.id2
    
 try{ 
  var stat = 0
  var token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }
  jwt.verify(token, config.secret, function (err, decoded) {
    stat = decoded.id
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
  })
  const id = stat
  const reviewerID = id
  const currentReviewer = await Reviewer.findById(reviewerID)
   const reviewerSSN = await currentReviewer.socialSecurityNumber
  
  var query = {
    $and: [
      { status: 'RejectedReviewer' },
      { reviewer: reviewerSSN },
      { _id: companyId }
    ]
  }
  const editableCompanies = await Company.find(query)
 
  if (!editableCompanies) {
    return res.status(404).send({ error: 'There are no Fourms to be edited' })
  } else {
    const isValidated = companyvalidator.updateValidationSSC(req.body)
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
    await Company.findByIdAndUpdate(companyId, {
      reviewerComment: req.body.reviewerComment
    })


    var resq = req.body.reviewerComment.split(" ");
    for(var i = 0 ; i < resq.length ; i++ )
    {
      if(resq[i].length() >=3)
      {
  var comment = await SearchTag.findOne({tag:resq[i]})
  if(comment)
  {
 comment.location.push(companyId)
  await SearchTag.findByIdAndUpdate(comment._id,comment)
  console.log("tag comment added  successfully")
  }
  else
  {
    const newSearchTag = new SearchTag({ tag:resq[i],
      location :[companyId]})
      var tag = await SearchTag.create(newSearchTag)
      console.log("tag comment created  successfully")
  }
}
}



    res.json({ msg: 'Comment added Successfully' })
  }
}catch(error){
  res.json({ err:'error occured' })
}
})



router.put('/addcomment/:id/:companyId', async function (req, res) {
  var reviewerId = req.params.id
  var companyId = req.params.companyId
  const currentReviewer = await Reviewer.findById(reviewerID)
   const reviewerSSN = await currentReviewer.socialSecurityNumber
    
 try{ const query = {
    $and: [
      { status: 'RejectedReviewer' },
      { reviewer: reviewerSSN },
      { _id: companyId }
    ]
  }
  const editableCompanies = await Company.find(query)
  var stat = 0
  var token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }
  jwt.verify(token, config.secret, function (err, decoded) {
    stat = decoded.id
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
  })
  if (reviewerId !== stat) { return res.status(401).send({ message: 'Token does not match reviewer' }) }
  if (!editableCompanies) {
    return res.status(404).send({ error: 'There are no Fourms to be edited' })
  } else {
    const isValidated = companyvalidator.updateValidationSSC(req.body)
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    }
    await Company.findByIdAndUpdate(companyId, {
      reviewerComment: req.body.reviewerComment
    })
    res.json({ msg: 'Comment added Successfully' })
  }
}catch(error){
  res.json({ err:'error occured' })
}
})

// s2
router.post("/login", function(req, res) {
  Reviewer.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      return res.status(401).send({ auth: false, message: "Server error." });
    }
    if (!user) {
      return res.status(401).send({ auth: false, message: "No user found." });
    }
    // const admin = Admin.findOne({ email: req.body.email});
    const loginPassword = req.body.password;
    const userPassword = user.password;
    const match = bcrypt.compareSync(loginPassword, userPassword);
    // var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!match) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token, id: user._id  });
  });
});

// Logout Sprint2
router.get("/logout", function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.get("/mycases/:id", async (req, res) => {
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
    const reviewers = await Reviewer.findById(stat);
    if (!reviewers) {
      return res.status(400).send({ error: "You are not a reviewer" });
    }
    if (stat === req.params.id) {
      const id = req.params.id;

      const reviewer = await Reviewer.findById(id);
      const ssn = reviewer.ssn;
      var query = {
        $and: [{ status: "PendingReviewer" }, { reviewer: ssn }]
      };
      const company = await Company.find(query);
      res.json({ data: company });
    } else {
      return res.status(400).send({ error: "wrong ID" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/", async (req, res) => {
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
    const reviewers = await Reviewer.findById(stat);
    if (!reviewers) {
      return res.status(404).send({ error: "reviewer does not exist" });
    }
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }
    const reviewer = Reviewer.findById(stat);
    if (reviewer) {
        await Reviewer.findByIdAndUpdate(stat, req.body);
        res.json({ msg: "Reviewer updated successfully" });
    }
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

module.exports = router;
