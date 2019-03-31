const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI
const InvestorsTest = require('./tests/investors');
const AdminsTest = require('./tests/admins')
const ReviewersTest = require('./tests/reviewers')
const CompanyTest=require('./tests/companys')
const LawyerTest=require('./tests/lawyers')

const {
  PORT = 3000
} = process.env



mongoose.connect(db, {
  useNewUrlParser: true
});


beforeAll(async () => {
  await mongoose.connection.dropDatabase()
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
})


const reviewerTests = new ReviewersTest(3000,'reviewer')
const adminsTests = new AdminsTest(PORT, 'admins')
const investorTests = new InvestorsTest(3000, "investors");
const companyTests = new CompanyTest(3000, 'company');
const lawyerTests = new LawyerTest(3000, 'lawyer');

describe("Let me first run the independent tests", () => {
  Promise.all([
    reviewerTests.runTests(),
    investorTests.runTests(),
    adminsTests.runTests(),
    companyTests.runTests(),
    lawyerTests.runTests1(),
    lawyerTests.runTests2()
  ]).then(result => {
    describe("Now running the dependent tests", () => {
      Promise.all([

      ]).then(_ => {});
    });
  });
});
