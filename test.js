require('dotenv').config()
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI
//const AdminsTest = require('./tests/admins')
//const InvestorsTest = require('./tests/investors');
//const LawyerTests = require('./tests/lawyers');

const {
  PORT = 3000
} = process.env

const ReviewersTest = require('./tests/reviewers')

mongoose.connect(db, {
  useNewUrlParser: true
})

//= =---------------------------------------------------= =//
// ---== Setup before & after all tests run
//= =---------------------------------------------------= =//
beforeAll(async () => {
 await mongoose.connection.dropDatabase()
})

afterAll(async () => {
await mongoose.connection.dropDatabase()
})
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== Core tests
//= =---------------------------------------------------= =//

const reviewerTests = new ReviewersTest(3000,'reviewer')


describe('Let me first run the independent tests', () => {
  Promise.all([
    
    reviewerTests.runTests()
  ]).then(result => {
  })
})
