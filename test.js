const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI

const LawyerTest = require('./tests/lawyers')
const InvestorTest = require('./tests/investors')

//= =---------------------------------------------------= =//
mongoose.connect(db, {
  useNewUrlParser: true
})
//= =---------------------------------------------------= =//
// ---== Setup before & after all tests run
//= =---------------------------------------------------= =//
// beforeAll(async () => {
//   await mongoose.connection.dropDatabase()
// })

// afterAll(async () => {
//   await mongoose.connection.dropDatabase()
// })
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== Core tests
//= =---------------------------------------------------= =//
const lawyerTests = new LawyerTest(3000, 'lawyer')
const investTests = new InvestorTest(3000, 'investors')

describe('Let me run the depentent tests', () => {
  Promise.all([
    lawyerTests.runTests(),
    investTests.runTests()
  ]).then(result => {
  })
})
