const express = require('express')
const bcrypt = require('bcryptjs')
const reviewer = require('../../models/reviewer')
var jwt = require("jsonwebtoken");
var config = require("../../config/jwt");
const router = express.Router()
const validator = require('../../validations/reviewerValidations')


//router.get('/', (req, res) => res.json({ data: 'Reviewers working' }))





router.get('/', async (req, res) => {
    const reviewers = await reviewer.find()
    res.json({ data: reviewers })
})




router.get('/:id', async (req, res) => {
    const id = req.params.id
    const reviewers = await reviewer.findById(id)
    res.send(reviewer)
})



router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const reviewers = await reviewer.findOne({ id })
        if (!reviewers) return res.status(404).send({ error: 'reviewer does not exist' })
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedreviewer = await reviewer.updateOne(req.body)
        res.json({ msg: 'reviewer updated successfully' })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})


router.post('/reviewers', async (req, res) => {
    const { ssn, name, gender, address, phone, email, password, yearsOfExperience, age, birth, task } = req.body
    const reviewers = await reviewer.findOne({ email })
    if (reviewers) return res.status(400).json({ error: 'Email already exists' })

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const newReviewer = new reviewer({
        ssn,
        name,
        gender,
        address,
        phone,
        email,
        password: hashedPassword,
        yearsOfExperience,
        age,
        birth,
        task
    })
    newReviewer
        .save()
        .then(reviewer => res.json({ data: reviewer }))
        .catch(err => res.json({ error: 'Can not create reviewer' }))
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedreviewer = await reviewer.findByIdAndRemove(id)
        res.json({ msg: 'reviewer was deleted successfully', data: deletedreviewer })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})


//s2
router.post('/login', function(req, res) {
    reviewer.findOne({ email: req.body.email}, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      //const admin = Admin.findOne({ email: req.body.email});
      const loginPassword = req.body.password;
      const userPassword = user.password;
      //var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!(loginPassword == userPassword)) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    });
  });


console.log("hai");
module.exports = router;

