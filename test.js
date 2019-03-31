const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI


const CompanyTest=require('./tests/companys')

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
const companyTests = new CompanyTest(3000, 'company')

describe('Let me first run the independent tests', () => {
  Promise.all([
    companyTests.runTests()
  ]).then(result => {
  })
})
