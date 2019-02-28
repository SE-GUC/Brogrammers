const express = require('express')
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router()
const Lawyer = require('../../models/Lawyer')
const lawyers = [
    new Lawyer('Omar',  'elfatairyomar@gmail.com', 'Summer', 1065152559, 11231234123,23400,'5/12/1998',5),
    new Lawyer('Raed',  'raed@gmail.com', '123',1065152539,2432342,6600,'5/12/1998',12),
    new Lawyer('Mossad',  'mossad@gmail.com', '321',1063152559,123523,2300,'5/12/1958',2),
    new Lawyer('Ahmed',  'ahmed@yahoo.com', '1234',1065142559,2342524,3400,'5/12/1968',5),
    new Lawyer('Khaled',  'khaled@gmail.com', '4321',1062152559,678657,6400,'5/12/1978',4),
    new Lawyer('Atef',  'atef@gmail.com', '12345',1065150559,6578576,3400,'5/12/1948',8),
    new Lawyer('Alaa',  'alaa@gmail.com', '54321',1065158559,45674567,400,'5/12/1988',3),
    new Lawyer('Waly',  'waly@gmail.com', '123456',1065142559,34567564,7000,'5/12/1938',11),
  

];

router.put('/:id', (req, res) => {
    const lawyerID = req.params.id 
    
    const updatedname = req.body.name
    const updatedemail = req.body.email
    const updatedpassword = req.body.password
    const updatedmobile_number = req.body.mobile_number
    const updatedSocial_Security_Number = req.body.Social_Security_Number
    const updatedsalary = req.body.salary
    const updatedbirth_Date = req.body.birth_Date
    const updatedyearsOfExperience = req.body.yearsOfExperience

    const updatedlawyer = lawyers.find(updatedlawyers => updatedlawyers.uuid == lawyerID)
    console.log(updatedlawyer)
	const schema = {
        name: Joi.string().min(3),
        email: Joi.string().email(),
        password: Joi.string(),
        mobile_number: Joi.number().min(10),
        Social_Security_Number: Joi.number().min(5),
        salary: Joi.number(),
        birth_Date: Joi.date(),
        yearsOfExperience: Joi.number()
    }
    
    const result= Joi.validate(req.body, schema);
    if(result.error) return res.status(400).send({ error: result.error.details[0].message });
    

    if(updatedname)
    {updatedlawyer.name = updatedname;}
    
if(updatedemail)
   {updatedlawyer.email = updatedemail;}

if(updatedpassword)
    {  updatedlawyer.password = updatedpassword}

if(updatedmobile_number)
    {  updatedlawyer.mobile_number = updatedmobile_number}

 if(updatedSocial_Security_Number)
    {  updatedlawyer.Social_Security_Number = updatedSocial_Security_Number}

if(updatedsalary)
    {  updatedlawyer.salary = updatedsalary}

if(updatedbirth_Date)
    {  updatedlawyer.birth_Date = updatedbirth_Date}

if(updatedyearsOfExperience)
    {  updatedlawyer.yearsOfExperience = updatedyearsOfExperience}
    
    res.send(lawyers);

    

})
router.delete('/:id', (req, res) => {
    const lawyerID = req.params.id
    
    const lawyer = lawyers.find(lawyer => lawyer.uuid === lawyerID)
    const index = lawyers.indexOf(lawyer)
    lawyers.splice(index,1)
    res.send(lawyers)
})

module.exports = router;


router.get('/', (req, res) => res.json({ data: lawyers }));

router.get('/:id', (req, res) => {
    const lawyerID = req.params.id
    const lawyer = lawyers.find(lawyer => lawyer.uuid === lawyerID)
    res.send(lawyer)
})



router.post('/insertLawyer', (req, res) => {
	const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const mobile_number = req.body.mobile_number
    const Social_Security_Number = req.body.Social_Security_Number
    const salary = req.body.salary
    const birth_Date = req.body.birth_Date
    const yearsOfExperience = req.body.yearsOfExperience

    

	const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        mobile_number: Joi.number().min(10).required(),
        Social_Security_Number: Joi.number().min(5).required(),
        salary: Joi.number().required(),
        birth_Date: Joi.date().required(),
        yearsOfExperience: Joi.number().required()
    }

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const newUser = {
		name,
        email,
        password,
        mobile_number,
        Social_Security_Number,
        salary,
        birth_Date,
        yearsOfExperience,
		id: uuid.v4(),
    };
    lawyers.push(newUser)
    
	return res.json({ data: newUser });
});

module.exports = router;

