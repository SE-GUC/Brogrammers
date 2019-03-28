const nfetch = require('node-fetch')
const Lawyer = require('../models/Lawyer')
const AdminsTest = require('./admins')
const Admin = require('../models/Admin')
const adminsTests = new AdminsTest(3000, 'admins')

class LawyersTest{
    constructor (PORT, ROUTE) {
        this.base_url = `http://localhost:${PORT}/routes/api/${ROUTE}`
     this.sharedState = {
        id: null,
        adminToken:null,
        token:null
      }
    }

 
    runTests() {
        try {
          return new Promise((resolve, reject) => {
            describe('Checking company Sprint 1 tests', () => {
              this.creatingAnAdminAsCrud(),
              this.creatingLawyerWithoutLoggingIn(),
              this.creatingLawyerByAdmin(),
              this.creatingLawyerByLawyer(),
              this.creatingLawyerCorruptedToken()
            })
            resolve()
          })
        } catch (err) {}
      }
    
    
      creatingLawyerWithoutLoggingIn() {
        const requestBody = {
          
                firstName: "please no2",
                middleName: "reyaaaad",
                lastName: "mohamed",
                password: "abcakakaka",
                email: "tes11q121t.com",
                mobileNumber: "01060187952",
                socialSecurityNumber: "29821114524525",
                salary: 105151,
                birthDate: "1998-04-03T22:00:00.000Z",
                yearsOfExperience: 4
        }
    
        test(`Creeating A Lawyer without logging in,\t\t[=> POST ${this.base_url}\register`, async () => {
          const response = await nfetch("http://localhost:3000/api/lawyer/register", {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: { 'Content-Type': 'application/json' }
          })
          const jsonResponse = await response.json()
    
          console.log(`${this.base_url}\register`);
          // check if the json response has data not error
          expect(jsonResponse).toEqual({"auth": false, "message": "Please login first."})
    
        })
      }
    
    
      creatingLawyerByAdmin(){
        const requestBody = {
            firstName: "please no2",
            middleName: "reyaaaad",
            lastName: "mohamed",
            password: "abcakakaka",
            email: "tes11q12t.com",
            mobileNumber: "01060187952",
            socialSecurityNumber: "29821114524525",
            salary: "105151",
            birthDate: "1998-04-03T22:00:00.000Z",
            yearsOfExperience: "4"
      }
    
      test(`Creating A Lawyer as using authentication by another admin,\t\t[=> POST ${this.base_url}\register`, async () => {
        const response = await nfetch("http://localhost:3000/api/lawyer/register", {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: { 'Content-Type': 'application/json' ,
           'x-access-token': this.sharedState.adminToken}
        })
        const jsonResponse = await response.json()
    
             // check if the json response has data not error
             expect(Object.keys(jsonResponse)).toEqual(['auth','token','msg','data'])
        
             // go check in the mongo database
             const lawyer = await Lawyer.findById(jsonResponse.data._id).exec()
             expect(lawyer.name).toEqual(requestBody.name)
             expect(lawyer.phone).toEqual(requestBody.phone)
             expect(lawyer.email).toEqual(requestBody.email)
             this.sharedState.id = lawyer.id
             this.sharedState.token=jsonResponse.token
          
    
      })
    
      }
    

      creatingLawyerByLawyer(){
        const requestBody = {
            firstName: "please no2",
            middleName: "reyaaaad",
            lastName: "mohamed",
            password: "abcakakaka",
            email: "tes11q12t.com",
            mobileNumber: "01060187952",
            socialSecurityNumber: "29821114524525",
            salary: "105151",
            birthDate: "1998-04-03T22:00:00.000Z",
            yearsOfExperience: "4"
      }
    
      test(`Creating A Lawyer as using authentication by another lawyer,\t\t[=> POST ${this.base_url}\register`, async () => {
        const response = await nfetch("http://localhost:3000/api/lawyer/register", {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: { 'Content-Type': 'application/json' ,
           'x-access-token': this.sharedState.token}
        })
        const jsonResponse = await response.json()
    
             // check if the json response has data not error
             expect(jsonResponse).toEqual({"error": "You are not an admin"}             )
        

    
      })
    
      }


      creatingLawyerCorruptedToken(){
        const requestBody = {
            firstName: "please no2",
            middleName: "reyaaaad",
            lastName: "mohamed",
            password: "abcakakaka",
            email: "tes11q12t.com",
            mobileNumber: "01060187952",
            socialSecurityNumber: "29821114524525",
            salary: "105151",
            birthDate: "1998-04-03T22:00:00.000Z",
            yearsOfExperience: "4"
      }
    
      test(`Creating A Lawyer as using authentication by corrupted token,\t\t[=> POST ${this.base_url}\register`, async () => {
        const response = await nfetch("http://localhost:3000/api/lawyer/register", {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: { 'Content-Type': 'application/json' ,
           'x-access-token': "abcc"}
        })
        const jsonResponse = await response.json()
    
             // check if the json response has data not error
             expect(jsonResponse).toEqual({"auth": false, "message": "Failed to authenticate token."})
        

    
      })
    
      }




      creatingAnAdminAsCrud(){
        const requestBody = {
          name: "manga",
          password:"momonjvjf",
          birthDate: "2018-05-01",
          gender: "Female",
          joinDate:"5/5/2017",
          email: "kancom",
          phone: "01111088333"
      }
    
      test(`Creating An Admin as CRUD without authentication,\t\t[=> POST ${this.base_url}\register`, async () => {
        const response = await nfetch("http://localhost:3000/routes/api/admins/registerNo", {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: { 'Content-Type': 'application/json' }
        })
        const jsonResponse = await response.json()
    
             // check if the json response has data not error
        expect(Object.keys(jsonResponse)).toEqual(['auth','token','msg','data'])
        
             // go check in the mongo database
             const admin = await Admin.findById(jsonResponse.data._id).exec()
             expect(admin.name).toEqual(requestBody.name)
             expect(admin.phone).toEqual(requestBody.phone)
             expect(admin.email).toEqual(requestBody.email)
             this.sharedState.id = admin.id
             this.sharedState.adminToken=jsonResponse.token
          
    
      })
    
      }
    
    }
    
module.exports = LawyersTest