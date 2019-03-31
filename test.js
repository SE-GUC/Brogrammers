const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI

const LawyerTest = require('./tests/lawyers')
//const InvestorsTest = require('./tests/investors')
//const AdminsTest = require('./tests/admins')

mongoose.connect(db, {
  useNewUrlParser: true
})

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
const lawyerTests = new LawyerTest(3000, 'lawyer')
//const adminsTests = new AdminsTest(3000, 'admins')
//const investorTests = new InvestorsTest(3000, 'investors')

describe('Let me first run the independent tests', () => {
  Promise.all([
    //adminsTests.runTests(),
    //investorTests.runTests(),
    lawyerTests.runTests1(),
    lawyerTests.runTests2()
  ]).then(result => {
  })
})
