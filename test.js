// require("dotenv").config();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const AdminsTest = require("./tests/admins");
// mongoose.connect(db, { useNewUrlParser: true });
// beforeAll(async () => {
//   await mongoose.connection.dropDatabase();
// });

// afterAll(async () => {
//   await mongoose.connection.dropDatabase();
//});
mongoose.connect(db, {
  useNewUrlParser: true
})

const adminsTest = new AdminsTest(3000, "admins");

describe("Let me first run the independent tests", () => {
  Promise.all([adminsTest.runIndependently()])
});
