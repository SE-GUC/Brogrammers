const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI
const InvestorsTest = require('./tests/investors');
const AdminsTest = require('./tests/admins')

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

const adminsTests = new AdminsTest(PORT, 'admins')
const investorTests = new InvestorsTest(3000, "investors");
describe("Let me first run the independent tests", () => {
  Promise.all([
    investorTests.runTests(),
    adminsTests.runTests()
  ]).then(result => {
    describe("Now running the dependent tests", () => {
      Promise.all([
        //run dependent tests
       // investorTests.runTestsDependently()

      ]).then(_ => {});
    });
  });
});
