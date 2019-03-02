const express = require('express')
const reviewer = require('../S1 complete  integrated with mangodb/routes/api/reviewer');
const mongoose = require('mongoose')
const app = express()
const db = require('../S1 complete  integrated with mangodb/config/keys').mongoURI
app.use(express.json())

mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send(`<h1> Welcome To Reviewers Page</h1>
    <a href ="/api/reviewer">reviewer</a>`);
})

app.use('/api/reviewer', reviewer)

app.use((req, res) => {
    res.status(404).send({ err: 'we can not find what you are looking for ' })
})

const port = 3000
app.listen(port, () => console.log(`server up and running on port ${port}`))