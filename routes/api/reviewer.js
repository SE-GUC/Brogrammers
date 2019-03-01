const express = require('express')

const Joi = require('joi')

const uuid = require('uuid')

const router = express.Router()

//models
const reviewer = require('../../models/reviewer')


const reviewers = [
    new reviewer(28, "Omar Sherif", "male", "korba", 55, "omarr@whatever.com", "haha", 20, 20, "2 / 2 / 1999", 2),
    new reviewer(21, "Mathew White", "male", "korba", 99, "matheww@whatever.com", "haha", 6, 25, "2 / 2 / 1999", 5),
    new reviewer(15, "Dom Sundle", "male", "korba", 54, "domss.whatever.com", "haha", 1, 26, "2 / 2 / 1999", 6),
    new reviewer(7223, "Gehad Ismail", "male", "korba", 9874, "gehad.ismail@guc.edu.eg", "haha", 6, 29, "2 / 2 / 1999", 1)
]

//get all reviewers
// router.get('/',(req,res)=>res.json({data:reviewers}));


router.get('/', (req, res) => {
    const info = [];
    for (var i = 0; i < reviewers.length; i++) {
        const reviewer = reviewers[i];
        curr = {
            ssn: reviewer.ssn,
            id: reviewer.id,
            name: reviewer.name,
            gender: reviewer.gender,
            address: reviewer.address,
            phone: reviewer.phone,
            email: reviewer.email,
            yearsOfExperience: reviewer.yearsOfExperience,
            age: reviewer.age,
            birth: reviewer.birth,
            task: reviewer.task
        }
        info.push(curr);
    }
    res.json({ "reviewers": info });
})

router.get('/:id', (req, res) => {
    const reviewerid = req.params.id;
    const reviewer = reviewers.find(curr => curr.id == reviewerid);
    console.log(reviewer);
    curr = {
        ssn: reviewer.ssn,
        id: reviewer.id,
        name: reviewer.name,
        gender: reviewer.gender,
        address: reviewer.address,
        phone: reviewer.phone,
        email: reviewer.email,
        yearsOfExperience: reviewer.yearsOfExperience,
        age: reviewer.age,
        birth: reviewer.birth,
        task: reviewer.task
    }
    res.send(curr);
})

router.put('/:id', (req, res) => {
    const reviewerid = req.params.id
    const reviewer = reviewers.find(curr => curr.id == reviewerid)
    const Reviewerssn = req.body.ssn
    const ReviewerName = req.body.name
    const ReviewerGender = req.body.gender
    const ReviewerAddress = req.body.address
    const ReviewerPhone = req.body.phone
    const revieweremail = req.body.email
    const ReviewerPass = req.body.password
    const ReviewerYearsOfExp = req.body.yearsOfExperience
    const ReviewerAge = req.body.age
    const ReviewerBirthDate = req.body.birth
    const ReviewerTask = req.body.task


    const schema = {
        snn: Joi.number(),
        name: Joi.string(),
        gender: Joi.string(),
        address: Joi.string(),
        password: Joi.string().min(8),
        age: Joi.number(),
        task: Joi.number(),
        birth: Joi.string(),
        yearsOfExperience: Joi.number(),
        email: Joi.string(),
        phone: Joi.number(),
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });

    }
    if (Reviewerssn) {
        reviewer.ssn = Reviewerssn
    }
    if (ReviewerName) {
        reviewer.name = ReviewerName
    }
    if (ReviewerGender) {
        reviewer.gender = ReviewerGender
    }
    if (ReviewerAddress) {
        reviewer.address = ReviewerAddress
    }
    if (ReviewerPhone) {
        reviewer.phone = ReviewerPhone
    }
    if (revieweremail) {
        reviewer.email = revieweremail
    }
    if (ReviewerPass) {
        reviewer.password = ReviewerPass
    }
    if (ReviewerYearsOfExp) {
        reviewer.yearsOfExperience = ReviewerYearsOfExp
    }
    if (ReviewerAge) {
        reviewer.age = ReviewerAge
    }
    if (ReviewerBirthDate) {
        reviewer.birth = ReviewerBirthDate
    }
    if (ReviewerTask) {
        reviewer.task = ReviewerTask
    }
    res.send(reviewer)

});


router.post('/reviewer', (req, res) => {
    const ssn = req.body.ssn;
    const name = req.body.name;
    const gender = req.body.gender;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const yearsOfExperience = req.body.yearsOfExperience;
    const age = req.body.age;
    const birth = req.body.birth;
    const task = req.body.task;

    if (!ssn) return res.status(400).send({ err: 'ssn field is required' });
    if (typeof ssn !== 'number') return res.status(400).send({ err: 'Invalid value for ssn' });
    if (!name) return res.status(400).send({ err: 'Name field is required' });
    if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
    if (!gender) return res.status(400).send({ err: 'gender field is required' });
    if (typeof gender !== 'string') return res.status(400).send({ err: 'Invalid value for gender' });
    if (!address) return res.status(400).send({ err: 'address field is required' });
    if (typeof address !== 'string') return res.status(400).send({ err: 'Invalid value for address' });
    if (!phone) return res.status(400).send({ err: 'phone field is required' });
    if (typeof phone !== 'number') return res.status(400).send({ err: 'Invalid value for phone' });
    if (!email) return res.status(400).send({ err: 'email field is required' });
    if (typeof email !== 'string') return res.status(400).send({ err: 'Invalid value for email' });
    if (!password) return res.status(400).send({ err: 'password field is required' });
    if (typeof password !== 'string') return res.status(400).send({ err: 'Invalid value for password' });
    if (!yearsOfExperience) return res.status(400).send({ err: 'yearsOfExperience field is required' });
    if (typeof yearsOfExperience !== 'number') return res.status(400).send({ err: 'Invalid value for yearsOfExperience' });
    if (!age) return res.status(400).send({ err: 'age field is required' });
    if (typeof age !== 'number') return res.status(400).send({ err: 'Invalid value for age' });
    if (!birth) return res.status(400).send({ err: 'birth field is required' });
    if (typeof birth !== 'string') return res.status(400).send({ err: 'Invalid value for birth' });
    if (!task) return res.status(400).send({ err: 'task field is required' });
    if (typeof task !== 'number') return res.status(400).send({ err: 'Invalid value for task' });

    const a = new reviewer(
        ssn,
        name,
        gender,
        address,
        phone,
        email,
        password,
        yearsOfExperience,
        age,
        birth,
        task

    );
    reviewers.push(a);
    return res.json({ data: a });
});

router.delete('/reviewer/:id', (req, res) => {
    const reviewerid = req.params.id
    const rev = reviewers.find(reviewer => reviewer.id == reviewerid)
    const index = reviewers.indexOf(rev)
    reviewers.splice(index, 1)
    res.send(reviewers)
})


console.log("hai");
module.exports = router;

