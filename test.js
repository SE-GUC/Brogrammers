const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI

const AdminsTest = require('./tests/admins')
const InvestorsTest = require('./tests/investors')

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
const investorTests = new InvestorsTest(3000, 'admins')
describe('Let me first run the independent tests', () => {
  Promise.all([
    adminsTests.runTests(),
    investorTests.runTests()
  ]).then(result => {
  })
})
