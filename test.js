const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI

const AdminsTest = require('./tests/admins')
const InvestorsTest = require('./tests/investors')
const LawyersTest = require('./tests/lawyers')
const ReviewersTest = require('./tests/reviewers')

mongoose.connect(db, {
  useNewUrlParser: true
})
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== Setup before & after all tests run
//= =---------------------------------------------------= =//
beforeAll(async () => {
  await mongoose.connection.dropDatabase()
})

afterAll(async () => {
  //await mongoose.connection.dropDatabase()
})
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== Core tests
//= =---------------------------------------------------= =//
const adminsTests = new AdminsTest(3000, 'admins')
const investorTests = new InvestorsTest(3000, 'investor')
const lawyerTests = new LawyersTest(3000,'lawyer')
const reviewerTests = new ReviewersTest(3000,'reviewer')

describe('Let me first run the independent tests', () => {
  Promise.all([
    adminsTests.runTests(),
    investorTests.runTests(),
    lawyerTests.runTests(),
    reviewerTests.runTests()
  ]).then(result => {
  })
})
