const express = require('express')
const app = express()
const mongoose = require('mongoose')
const reviewer = require('./routes/api/reviewer')
const lawyers = require('./routes/api/lawyer')
const companies = require('./routes/api/company')
const admins = require('./routes/api/admins')
const investors = require('./routes/api/investors')

// DB Config
const db = require('./config/keys').mongoURI

// Connect to mongo
mongoose
  .connect(db)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to GAFI</h1>
    <a href="/api/company">Companies</a> </br>
    <a href ="/api/reviewer">Reviewers</a> </br>
    <a href="/api/lawyer">Lawyers</a> </br>
    <a href="/routes/api/admins">Admins</a> </br>
    <a href="/api/investors">Investors</a>
    `)
})

// Direct routes to appropriate files
app.use('/api/company', companies)
app.use('/api/reviewer', reviewer)
app.use('/api/lawyer', lawyers)
app.use('/routes/api/admins', admins)
app.use('/api/investors', investors)

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: 'We can not find what you are looking for' })
})
// S2

// S2
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))
