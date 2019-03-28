require('dotenv').config()
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI
const AdminsTest = require('./tests/admins')

const {
  PORT = 3000
} = process.env

mongoose.connect(db, {
  useNewUrlParser: true
})
beforeAll(async () => {
  await mongoose.connection.dropDatabase()
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
})

const adminsTests = new AdminsTest(PORT, 'admins')

describe('Let me first run the independent tests', () => {
  Promise.all([
    adminsTests.runTests()
  ]).then(result => {
  })
})
