require('dotenv').config()
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI
//const AdminsTest = require('./tests/admins')
//const InvestorsTest = require('./tests/investors');
const LawyerTests = require('./tests/lawyers');

const {
  PORT = 3000
} = process.env
mongoose.connect(db, {
  useNewUrlParser: true
})
// this is fasdlfha;lskdjfl
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

const lawyerTests = new LawyerTests(3000, 'lawyer')
describe('Let me first run the independent tests', () => {
  Promise.all([
    
    lawyerTests.runTests()
  ]).then(result => {
  })
})
