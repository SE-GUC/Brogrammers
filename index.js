const express = require('express')
const app = express()
const mongoose = require('mongoose')
const reviewer = require('./routes/api/reviewer')
const lawyers = require('./routes/api/lawyer')
const companies = require('./routes/api/company')
const admins = require('./routes/api/admins')
const investors = require('./routes/api/investors')
const cors = require('cors')

app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});
// DB Config
const db = require('./config/keys').mongoURI
const dotenv=require('dotenv')
dotenv.config()

// Connect to mongo
//as
mongoose
  .connect(db)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to GAFI (Jest saying we added tests)</h1>
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

app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, x-access-token');
  res.send(200);
});

// S2
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))
