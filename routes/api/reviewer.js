const express = require('express')

const Joi=require('joi')

const uuid=require('uuid')

const router=express.Router()

//models
const reviewer = require ('../../models/reviewer')


const reviewers = [
    new reviewer( "28", "Omar Sherif",  "male",  "korba",  "55", "omarr@whatever.com", "haha","20", "20", "2 / 2 / 1999","2" ),
    new reviewer( "21","Mathew White",  "male","korba",  "99","matheww@whatever.com","haha", "6","25", "2 / 2 / 1999", "5" ),
    new reviewer( "15" ,"Dom Sundle",  "male", "korba", "54", "domss.whatever.com", "haha","1", "26", "2 / 2 / 1999", "6" ),
    new reviewer ( "7223", "Gehad Ismail", "male","korba", "9874", "gehad.ismail@guc.edu.eg","haha", "6", "29", "2 / 2 / 1999","1" )
    ]

//get all reviewers
// router.get('/',(req,res)=>res.json({data:reviewers}));


router.get('/',(req,res)=>{
    const info=[];
    for (var i=0;i<reviewers.length;i++)
    {
        const reviewer=reviewers[i];
        curr={
            ssn:reviewer.ssn,
            id:reviewer.id,
            age:reviewer.age,
            gender:reviewer.gender,
            email:reviewer.email,
            phone:reviewer.phone,
            yearsOfExperience:reviewer.yearsOfExperience,
            birth:reviewer.birth,
            task:reviewer.task
        }
        info.push(curr);
    }
    res.json({"reviewers":info});
})

router.get('/:id',(req,res)=>{
    const reviewerid=req.params.id;
    const reviewer=reviewers.find(curr=>curr.id==reviewerid);
    console.log(reviewer);
    curr={
        name:reviewer.name,
        id:reviewer.id,
        age:reviewer.age,
        gender:reviewer.gender,
        email:reviewer.email,
        phone:reviewer.phone,
        yearsOfExperience:reviewer.yearsOfExperience,
        birth:reviewer.birth
    }
    res.send(curr);
})

router.put('/:id',(req,res)=>{
    const reviewerid =req.params.id
    const reviewer=reviewers.find(curr=>curr.id==reviewerid)
    const ReviewerName=req.body.name
    const ReviewerGender=req.body.gender
    const ReviewerPhone=req.body.phone
    const ReviewerAddress=req.body.address

    const ReviewerPass=req.body.password
    const ReviewerYearsOfExp=req.body.yearsOfExperience
    const ReviewerAge=req.body.age

    
    const ReviewerBirthDate=req.body.birth
    const ReviewerTask=req.body.task
    const revieweremail=req.body.email

    const schema={
        name:Joi.string(),
        gender:Joi.string(),
        address:Joi.string(),
        password:Joi.string().min(8),
        age:Joi.number(),
        task:Joi.number(),

        email:Joi.string(),
        phone:Joi.number(),
    }
    const result=Joi.validate(req.body,schema);
    if (result.error){
        return res.status(400).send({error:result.error.details[0].message});

    }
    reviewer.name=ReviewerName
    reviewer.email=revieweremail
    reviewer.gender=ReviewerGender
    reviewer.address=ReviewerAddress
    reviewer.password=ReviewerPass
    reviewer.age=ReviewerAge
    reviewer.task=ReviewerTask
    reviewer.phone=ReviewerPhone
    reviewer.yearsOfExperience=ReviewerYearsOfExp
    res.send(reviewer)

});
console.log("hai");
module.exports=router;

