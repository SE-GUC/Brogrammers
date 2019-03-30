const nfetch = require("node-fetch");
const Admin = require("../models/Admin");
const Lawyer = require('../models/Lawyer')

class AdminsTest {
  constructor(PORT, ROUTE) {
    this.base_url = `http://localhost:${PORT}/routes/api/${ROUTE}`;
    this.sharedState = {
      id: null,
      token: null,
      name: null,
      email: null,
      password: null,
      birthDate: null,
      gender: null,
      joinDate: null,
      phone: null,
      lawyerToken:null
    };
  }

  runTests() {
    try {
      return new Promise((resolve, reject) => {
        describe("Checking company Sprint 1 tests", () => {
            this.creatingAdminWithoutLoggingIn(),
            this.creatingAnAdminAsCrud(),
            this.creatingAnAdminByAdmin(),
            this.creatingAnAdminAlreadyExsistent(),
            this.creatingAnAdminWithCorruptedToken(),
            this.logInWithUserNotFound(),
            this.logInWithWrongPassword(),
            this.logInWithRightPassword(),
            this.updateAdminWithCorrectIdAndToken(),
            this.updateAdminWithWrongId(),
            this.updateAdminWithWrongToken(),
            this.updateAdminWithNullToken(),
            this.adminGetOneCrudWithCorrectTokenAndId(),
            this.adminGetOneCrudWithWrongId(),
            this.adminGetOneCrudWithNullToken(),
            this.adminGetOneCrudWithWrongToken(),
            this.adminGetAllAdminsCrudWithCorrectToken(),
            this.adminGetAllAdminsCrudWithNullToken(),
            this.adminGetAllAdminsCrudWithWrongToken(),
            this.creatingLawyerByAdmin(),
            this.creatingAnAdminByLawyer(),
            this.creatingAnAdminTestingJoi()
        });
        resolve();
      });
    } catch (err) {}
  }

  creatingAdminWithoutLoggingIn() {
    const requestBody = {
      name: "manga",
      password: "momonjvjf",
      birthDate: "2018-05-01",
      gender: "Female",
      joinDate: "5/5/2017",
      email: "kh.a392b2com",
      phone: "01111088333"
    };

    test(`Creeating An Admin without logging in,\t\t[=> POST ${
      this.base_url
    }\register`, async () => {
      const response = await nfetch(
        "http://localhost:3000/routes/api/admins/register",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      console.log(`${this.base_url}\register`);
      // check if the json response has data not error
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Please login first."
      });
    });
  }

  creatingAnAdminAsCrud() {
    const requestBody = {
      name: "manga",
      password: "momonjvjf",
      birthDate: "2018-05-01",
      gender: "Female",
      joinDate: "5/5/2017",
      email: "kh.a392b2com",
      phone: "01111088333"
    };

    test(`Creating An Admin as CRUD without authentication,\t\t[=> POST ${
      this.base_url
    }\register`, async () => {
      const response = await nfetch(
        "http://localhost:3000/routes/api/admins/registerNo",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      // check if the json response has data not error
      expect(Object.keys(jsonResponse)).toEqual([
        "auth",
        "token",
        "msg",
        "data"
      ]);

      // go check in the mongo database
      const admin = await Admin.findById(jsonResponse.data._id).exec();
      expect(admin.name).toEqual(requestBody.name);
      expect(admin.phone).toEqual(requestBody.phone);
      expect(admin.email).toEqual(requestBody.email);
      this.sharedState.id = admin.id;
      this.sharedState.token = jsonResponse.token;
    });
  }

  creatingAnAdminByAdmin() {
    const requestBody = {
      name: "manga",
      password: "momonjvjf",
      birthDate: "2018-05-01",
      gender: "Female",
      joinDate: "5/5/2017",
      email: "khaled.com",
      phone: "01111088333"
    };

    test(`Creating An Admin as using authentication by another admin,\t\t[=> POST ${
      this.base_url
    }\register`, async () => {
      const response = await nfetch(
        "http://localhost:3000/routes/api/admins/register",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();

      // check if the json response has data not error
      expect(Object.keys(jsonResponse)).toEqual([
        "auth",
        "token",
        "msg",
        "data"
      ]);

      // go check in the mongo database
      const admin = await Admin.findById(jsonResponse.data._id).exec();
      expect(admin.name).toEqual(requestBody.name);
      expect(admin.phone).toEqual(requestBody.phone);
      expect(admin.email).toEqual(requestBody.email);
      this.sharedState.id = admin.id;
      this.sharedState.token = jsonResponse.token;
    });
  }

  creatingAnAdminAlreadyExsistent() {
    const requestBody = {
      name: "manga",
      password: "momonjvjf",
      birthDate: "2018-05-01",
      gender: "Female",
      joinDate: "5/5/2017",
      email: "khaled.com",
      phone: "01111088333"
    };

    test(`Creating An Admin using an already existent email,\t\t[=> POST ${
      this.base_url
    }\register`, async () => {
      const response = await nfetch(
        "http://localhost:3000/routes/api/admins/register",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();

      // check if the json response has data not error
      expect(jsonResponse).toEqual({ error: "Email already exists" });
    });
  }

  creatingAnAdminWithCorruptedToken() {
    const requestBody = {
      name: "manga",
      password: "momonjvjf",
      birthDate: "2018-05-01",
      gender: "Female",
      joinDate: "5/5/2017",
      email: "khaled.com",
      phone: "01111088333"
    };

    test(`Creating An Admin using Corrupted token,\t\t[=> POST ${
      this.base_url
    }\register`, async () => {
      const response = await nfetch(
        "http://localhost:3000/routes/api/admins/register",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "abcd"
          }
        }
      );
      const jsonResponse = await response.json();

      // check if the json response has data not error
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Failed to authenticate token."
      });
    });
  }

  updateAdminWithCorrectIdAndToken() {
    const requestBody = {
      phone: "01142830041"
    };
    test(`Updating information of specified admin`, async () => {
      const response = await nfetch(
        "http://localhost:3000/routes/api/admins/" + this.sharedState.id,
        {
          method: "PUT",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ msg: "Information updated successfully" });
      const admin = await Admin.findById(this.sharedState.id);
      this.sharedState.name = admin.name;
      this.sharedState.birthDate = admin.birthDate;
      this.sharedState.email = admin.email;
      this.sharedState.gender = admin.gender;
      this.sharedState.password = admin.password;
      this.sharedState.phone = admin.phone;
    });
  }

  updateAdminWithWrongId() {
    const requestBody = {
      email: "1234gmailgmail@yahoo.com"
    };
    test(`Updating information of specified admin with wrong ID`, async () => {
      const response = await nfetch(
        "http://localhost:3000/routes/api/admins/2abcd",
        {
          method: "PUT",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ msg: "You don't have the authorization" });
    });
  }

  updateAdminWithWrongToken() {
    const requestBody = {
      email: "1234gmailgmail@yahoo.com"
    };
    test(`Updating information of specified admin with wrong Token`, async () => {
      const response = await nfetch(
        "http://localhost:3000/routes/api/admins/" + this.sharedState.id,
        {
          method: "PUT",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "1q2w3e4r5t6y7u"
          }
        }
      );
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Failed to authenticate token."
      });
    });
  }

  updateAdminWithNullToken() {
    const requestBody = {
      email: "1234gmail@yahoo.com"
    };
    test(`Updating information of specified admin with a null token`, async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/' + this.sharedState.id,
      {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({
        auth: false,
        message: 'Please login first'
      });
    })
  }

  logInWithUserNotFound() {
    const requestBody = {
      email: "notreg@sumerge.com",
      password: "123456789"
    };

    test(`logInWithUserNotFound,\t\t[=> POST ${
      this.base_url
    }\/login`, async () => {
      const response = await nfetch(
        "http://localhost:3000/routes/api/admins/login",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      console.log(`${this.base_url}\/login`);

      expect(jsonResponse).toEqual({ auth: false, message: "No user found." });
    });
  }

  logInWithWrongPassword() {
    const requestBody = {
      email: "khaled.com",
      password: "12345678"
    };

    test(`logInWithWrongPassword,\t\t[=> POST ${
      this.base_url
    }\/login`, async () => {
      const response = await nfetch(
        "http://localhost:3000/routes/api/admins/login",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      console.log(`${this.base_url}\/login`);

      expect(jsonResponse).toEqual({ auth: false, token: null });
    });
  }

  logInWithRightPassword() {
    const requestBody = {
      email: "khaled.com",
      password: "momonjvjf"
    };

    test(`logInWithRightPassword,\t\t[=> POST ${
      this.base_url
    }\/login`, async () => {
      const response = await nfetch(
        "http://localhost:3000/routes/api/admins/login",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      const token = this.sharedState.token;

      console.log(`${this.base_url}\/login`);
      expect(jsonResponse).toEqual({ auth: true, token: token });
    });
  }

  adminGetOneCrudWithCorrectTokenAndId() {
    test('Get the information of a specific admin', async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/' + this.sharedState.id, {
        method: "GET",
        headers: {'Content-Type': 'application/json', 'x-access-token': this.sharedState.token}
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["name", "id", "birthDate", "gender", "joinDate", "email", "phone"]);
    })
  }

  adminGetOneCrudWithWrongId(){
        test('Get the information of a specific admin', async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/gluglu', {
        method: "GET",
        headers: {'Content-Type': 'application/json', 'x-access-token': this.sharedState.token}
      });
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ msg: "Admin doesn't exist" });
    })
  }

  adminGetOneCrudWithWrongToken() {
    test('Get the information of a specific admin', async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/' + this.sharedState.id, {
        method: "GET",
        headers: {'Content-Type': 'application/json', 'x-access-token': 'abcdefg'}
      });
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ auth: false, message: 'Failed to authenticate token.' });
    });
  }

  adminGetOneCrudWithNullToken() {
    test('Get the information of a specific admin', async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/' + this.sharedState.id, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      });
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ auth: false, message: 'Please login first.' });
    });
  }

  adminGetAllAdminsCrudWithCorrectToken() {
    test('Get the information of all the admins', async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins' , {
        method: 'GET',
        headers: {'Content-Type' : 'application/json', 'x-access-token': this.sharedState.token}
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["data"]);
    })
  }

  adminGetAllAdminsCrudWithWrongToken() {
    test('Get the information of all the admins providing the wrong token', async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins' , {
        method: 'GET',
        headers: {'Content-Type' : 'application/json', 'x-access-token': 'glublugb'}
      });
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ auth: false, message: 'Failed to authenticate token.' });
    })
  }

  adminGetAllAdminsCrudWithNullToken() {
    test('Get the information of all the admins providing the wrong token', async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins' , {
        method: 'GET',
        headers: {'Content-Type' : 'application/json'}
      });
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ auth: false, message: 'Please login first.' });
    })
  }

  creatingLawyerByAdmin(){
    const requestBody = {
        firstName: "please no2",
        middleName: "reyaaaad",
        lastName: "mohamed",
        password: "abcakakaka",
        email: "tes11qt@b.com",
        mobileNumber: "01060187952",
        socialSecurityNumber: "29891114524525",
        salary: "105151",
        birthDate: "1998-04-03T22:00:00.000Z",
        yearsOfExperience: "4"
  }

  test(`Creating A Lawyer as using authentication by another admin,\t\t[=> POST ${this.base_url}\register`, async () => {
    const response = await nfetch("http://localhost:3000/api/lawyer/register", {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' ,
       'x-access-token': this.sharedState.token}
    })
    const jsonResponse = await response.json()

         // check if the json response has data not error
         expect(Object.keys(jsonResponse)).toEqual(['auth','token','msg','data'])
    
         // go check in the mongo database
         const lawyer = await Lawyer.findById(jsonResponse.data._id).exec()
         expect(lawyer.firstName).toEqual(requestBody.firstName)
         expect(lawyer.phone).toEqual(requestBody.phone)
         expect(lawyer.email).toEqual(requestBody.email)
         expect(lawyer.socialSecurityNumber).toEqual(requestBody.socialSecurityNumber)
        // this.sharedState.id = lawyer.id
         this.sharedState.lawyerToken=jsonResponse.token
  })

  }


  creatingAnAdminByLawyer(){
    const requestBody = {
      name: "manga",
      password:"momonjvjf",
      birthDate: "2018-05-01",
      gender: "Female",
      joinDate:"5/5/2017",
      email: "khaled3.com",
      phone: "01111088333"
  }

  test(`Creating An Admin as using authentication of lawyer,\t\t[=> POST ${this.base_url}\register`, async () => {
    const response = await nfetch("http://localhost:3000/routes/api/admins/register", {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' ,
       'x-access-token': this.sharedState.lawyerToken}
    })
    const jsonResponse = await response.json()
         // check if the json response has data not error
         expect(jsonResponse).toEqual({"error": "You are not an admin"}
         ) 

  })

  }

  
  creatingAnAdminTestingJoi(){
    const requestBody = {
      name: "manga",
      password:"momonjvjf",
      birthDate: "2018-05-01",
      gender: "Female",
      joinDate:"5/5/2017",
      phone: "01111088333"
  }

  test(`Creating An Admin as using authentication by another admin but with wrong input,\t\t[=> POST ${this.base_url}\register`, async () => {
    const response = await nfetch("http://localhost:3000/routes/api/admins/register", {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' ,
       'x-access-token': this.sharedState.token}
    })
    const jsonResponse = await response.json()

         // check if the json response has data not error
         expect(jsonResponse).toEqual({"error": "\"email\" is required"})

  })

  }
}

module.exports = AdminsTest;
