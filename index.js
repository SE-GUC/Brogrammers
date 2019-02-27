const express = require('express')
const uuid = require('uuid');
const reviewer = require('./routes/api/reviewer.js');

const app = express()

app.use(express.json())

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