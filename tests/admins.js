const nfetch = require("node-fetch");
const Admin = require("../models/Admin");

class AdminsTest {
  constructor(PORT, ROUTE) {
    this.sharedState = {
      _id: '5c9d2f635b8e0d58de3d5a4e',
      token: null,
      name: null,
      email: null,
      password: null,
      birthDate: null,
      gender: null,
      joinDate: null,
      phone: null
    };
  }

  runIndependently() {
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure independent admin routes works", () => {
          this.updateAdminWithCorrectIdAndToken();
          this.updateAdminWithWrongId();
          this.updateAdminWithWrongToken();
        });
        resolve();
      });
    } catch (err) {}
  }

  runDependently() {
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure dependent admin routes work", () => {
          // this.postRequestDependently();
          // this.getRequestDependently();
          // this.putRequestDependently();
          // this.deleteRequestDependently();
        });
        resolve();
      });
    } catch (err) {}
  }

  updateAdminWithCorrectIdAndToken() {
    const requestBody = {
      phone: "01142830041"
    };
    test(`Updating information of specified admin`, async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/5c9d2f635b8e0d58de3d5a4e', {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json", "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOWQyZjYzNWI4ZTBkNThkZTNkNWE0ZSIsImlhdCI6MTU1MzgwNTE1NSwiZXhwIjoxNTUzODkxNTU1fQ.M16SoTzlmTczwurymL1ZVSo6k9DJOY_hda45v4feSdY"}
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["msg"]);
      console.log('shared state is is ' + this.sharedState._id);
      const admin = await Admin.findById(this.sharedState._id);
      console.log(admin)
      this.sharedState.name = admin.name;
      this.sharedState.birthDate = admin.birthDate;
      this.sharedState.email = admin.email;
      this.sharedState.gender = admin.gender;
      this.sharedState.password = admin.password;
      this.sharedState.phone = admin.phone;
      //ask about updating the sharedState updating
    });
  }

  updateAdminWithWrongId(){
    const requestBody = {
      email: "1234gmailgmail@yahoo.com"
    };
    test(`Updating information of specified admin with wrong ID`, async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/2abcd', {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json", "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOWQyZjYzNWI4ZTBkNThkZTNkNWE0ZSIsImlhdCI6MTU1MzgwNTE1NSwiZXhwIjoxNTUzODkxNTU1fQ.M16SoTzlmTczwurymL1ZVSo6k9DJOY_hda45v4feSdY"}
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["msg"]);
    });
  }

  updateAdminWithWrongToken(){
    const requestBody = {
      email: "1234gmailgmail@yahoo.com"
    };
    test(`Updating information of specified admin with wrong Token`, async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/5c9d2f635b8e0d58de3d5a4e', {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json", "x-access-token": "1q2w3e4r5t6y7u"}
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["auth", "message"]);
    });
  }
}
module.exports = AdminsTest