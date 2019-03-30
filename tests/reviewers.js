const nfetch = require('node-fetch')
const Lawyer = require('../models/Lawyer')

const Admin = require('../models/Admin')
const Reviewer = require('../models/Reviewer')
const Company = require('../models/Company')

class ReviewersTest{
    constructor (PORT, ROUTE) {
        this.base_url = `http://localhost:${PORT}/routes/api/${ROUTE}`
       this.sharedState = {
        id: null,
        adminToken:null,
        token:null,
        ssn:null
      }
    }

 
    runTests() {
        try {
          return new Promise((resolve, reject) => {
            describe('Checking company Sprint 1 tests', () => {
              this.creatingReviewerWithoutLoggingIn(),
              this.creatingAnAdminAsCrud(),
              this.creatingReviewerByAdmin(),
              this.creatingReviewerByReviewer(),
              this.creatingReviewerCorruptedToken(),
              this.showwithoutloggingin(),
              this.wrongAuthShowMyCase(),
              this.showMyCases(),
              this.logInWithUserNotFound(),
              this.logInWithWrongPassword(),
              this.logInWithRightPassword()
            })
            resolve()
          })
        } catch (err) {}
      }
    
    
      creatingReviewerWithoutLoggingIn() {
        const requestBody = {
            "ssn": 1212,
            "name": "Omar Sherif",
            "gender": "male",
            "address": "korba",
            "phone": 55,
            "email": "alo21112.com",
            "password": "abc",
            "yearsOfExperience": 20,
            "age": 20,
            "birth": "2 / 2 / 1999",
            "task": 2
        }
    
        test(`Creeating A Reviewer without logging in,\t\t[=> POST ${this.base_url}\register`, async () => {
          const response = await nfetch("http://localhost:3000/api/reviewer/register", {
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
    
    
      creatingReviewerByAdmin(){
        const requestBody = {
          "ssn": 696969696969,
          "name": "Omar Sherif",
          "gender": "male",
          "address": "korba",
          "phone": 55,
          "email": "alo21112.com",
          "password": "abc",
          "yearsOfExperience": 20,
          "age": 20,
          "birth": "2 / 2 / 1999",
          "task": 2
      }
    
      test(`Creating A Reviewer as using authentication by another admin,\t\t[=> POST ${this.base_url}\register`, async () => {
        const response = await nfetch("http://localhost:3000/api/reviewer/register", {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: { 'Content-Type': 'application/json' ,
           'x-access-token': this.sharedState.adminToken}
        })
        const jsonResponse = await response.json()
    
             // check if the json response has data not error
             expect(Object.keys(jsonResponse)).toEqual(['auth','token','msg','data'])
        
             // go check in the mongo database
             const reviewer = await Reviewer.findById(jsonResponse.data._id).exec()
             expect(reviewer.name).toEqual(requestBody.name)
             expect(reviewer.phone).toEqual(requestBody.phone)
             expect(reviewer.email).toEqual(requestBody.email)
             this.sharedState.id = reviewer.id
             this.sharedState.token=jsonResponse.token
             this.sharedState.ssn = reviewer.ssn
          
    
      })
    
      }
    

      creatingReviewerByReviewer(){
        const requestBody = {
          "ssn": 696969696969,
          "name": "Omar Sherif",
          "gender": "male",
          "address": "korba",
          "phone": 55,
          "email": "alo21112.com",
          "password": "abc",
          "yearsOfExperience": 20,
          "age": 20,
          "birth": "2 / 2 / 1999",
          "task": 2
      }
    
      test(`Creating A Reviewer as using authentication by another lawyer,\t\t[=> POST ${this.base_url}\register`, async () => {
        const response = await nfetch("http://localhost:3000/api/reviewer/register", {
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


      creatingReviewerCorruptedToken(){
        const requestBody = {
          "ssn": 696969696969,
          "name": "Omar Sherif",
          "gender": "male",
          "address": "korba",
          "phone": 55,
          "email": "alo21112.com",
          "password": "abc",
          "yearsOfExperience": 20,
          "age": 20,
          "birth": "2 / 2 / 1999",
          "task": 2
      }
    
      test(`Creating A Reviewer as using authentication by corrupted token,\t\t[=> POST ${this.base_url}\register`, async () => {
        const response = await nfetch("http://localhost:3000/api/reviewer/register", {
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
          email: "kancomnma",
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


      
    wrongAuthShowMyCase(){
      test(`Showing my cases with wrong authauntication,\t\t\t[=> GET\t${this.base_url}mycases/:id\t`, async () => {
        const response = await nfetch(`http://localhost:3000/api/reviewer/mycases/${this.sharedState.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json',
          'x-access-token': "tasdfasdf"}
                
        })
        const jsonResponse = await response.json()
        // check if the json response has data not error
        expect(jsonResponse).toEqual({"auth": false, "message": "Failed to authenticate token."})
        
    
      })
    }
    showwithoutloggingin(){
      test(`Showing my cases without logging in,\t\t\t[=> GET\t${this.base_url}mycases/:id\t`, async () => {
        const response = await nfetch(`http://localhost:3000/api/reviewer/mycases/${this.sharedState.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json'}
                
        })
        const jsonResponse = await response.json()
        // check if the json response has data not error
        expect(jsonResponse).toEqual({"auth": false, "message": "Please login first."})
        
    
      })}
      showMyCases(){
      test(`Showing my cases,\t\t\t[=> GET\t${this.base_url}mycases/:id\t`, async () => {
        const response = await nfetch(`http://localhost:3000/api/reviewer/mycases/${this.sharedState.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json',
          'x-access-token': this.sharedState.token }
                
        })
        const jsonResponse = await response.json()
        // check if the json response has data not error
        expect(Object.keys(jsonResponse)).toEqual(['data'])
        
        var query = {
            $and: [{ status: 'PendingReviewer' }, { lawyer: this.sharedState.socialSecurityNumber }]
          }
        const checkCase = await Company.find(query).exec().then()
        console.log(checkCase)
        if(checkCase==[])
        expect(checkCase).toEqual([])
        else{
        for(var i = 0 ; i<checkCase.length ; i++)
        {
            console.log(123)
            expect(checkCase[i].status).toEqual("PendingReviewer"),
            expect(checkCase[i].reviewer).toEqual(this.sharedState.ssn)
        }}
            

        
     
      })
    
      }

      logInWithUserNotFound () {
        const requestBody = {
          email: "alo2118653112.com",
          password: '123458465678'
        }
    
        test(`logInWithUserNotFound,\t\t[=> POST ${this.base_url}\/login`, async () => {
          const response = await nfetch("http://localhost:3000/api/reviewer/login", {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: { 'Content-Type': 'application/json' }
          })
          const jsonResponse = await response.json()
    
          console.log(`${this.base_url}\/login`)
    
          expect(jsonResponse).toEqual({ auth: false, message: 'No user found.' })
        })
      }
    
      logInWithWrongPassword () {
        const requestBody = {
          email: "alo21112.com",
          password: '12345678'
        }
    
        test(`logInWithWrongPassword,\t\t[=> POST ${this.base_url}\/login`, async () => {
          const response = await nfetch("http://localhost:3000/api/reviewer/login", {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: { 'Content-Type': 'application/json' }
          })
          const jsonResponse = await response.json()
    
          console.log(`${this.base_url}\/login`)
    
          expect(jsonResponse).toEqual({ auth: false, token: null })
        })
      }
    
      logInWithRightPassword () {
        const requestBody = {
          email: "alo21112.com",
          password: "abc"
        }
    
        test(`logInWithRightPassword,\t\t[=> POST ${this.base_url}\/login`, async () => {
          const response = await nfetch("http://localhost:3000/api/reviewer/login", {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: { 'Content-Type': 'application/json' }
          })
          
          const jsonResponse = await response.json()
          const token = jsonResponse.token
    
          console.log(`${this.base_url}\/login`)
          expect(jsonResponse).toEqual({ auth: true, token: token })
          
        })
      }

    
    }
    
module.exports = ReviewersTest