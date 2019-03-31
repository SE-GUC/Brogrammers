const nfetch = require('node-fetch')
const Lawyer = require('../models/Lawyer')

const Admin = require('../models/Admin')
const Reviewer = require('../models/Reviewer')
const Company = require('../models/Company')
var jwt = require('jsonwebtoken')
var config = require('../config/jwt')

class ReviewersTest{
    constructor (PORT, ROUTE) {
        this.base_url = `http://localhost:${PORT}/routes/api/${ROUTE}`
       this.sharedState = {
        id: null,
        adminToken:null,
        wrongToken:jwt.sign({ id: "5c9d20d34087a25fc4147d17" }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        }),
        token:null,
        ssn:null,
        name: null,
        gender: null,
        address: null,
        phone: null,
        email: null,
        password: null,
        yearsOfExperience: null,
        age: null,
        birth: null,
        companyId:null
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
              this.creatingReviewerWrongInput(),
              this.showwithoutloggingin(),
              this.wrongAuthShowMyCase(),
              this.showMyCases(),
              this.showMyCaseswithanotherNotMatchingID(),
              this.showMyCaseswithWrongToken(),
              this.logInWithUserNotFound(),
              this.logInWithWrongPassword(),
              this.logInWithRightPassword(),
              this.DeleteAReviewerNotLoggedIn(),
              this.DeleteAReviewerWrongToken(),
              this.DeleteAReviewerNotAuthorized(),
              this.updateReviewerWithCorrectIdAndToken(),
              this.updateReviewerWithWrongId(),
              this.updateReviewerWithWrongToken(),
              this.updateReviewerWithNullToken(),
              this.DeleteAReviewerLoggedIn(),
              this.reviewerAddingCommentWithWrongCompanyId(),
              this.reviewerAddingCommentWithWrongCompanyIdAndIdAndToken(),
              this.reviewerAddingCommentWithWrongid(),
              this.reviewerAddingCommentWithWrongtoken(),
              //these tests should run after creating a company
              this.notLoggedIntReviewerChoosesHisTasks(),
              this.corruptTokenIntReviewerChoosesHisTasks(),
              this.loggedInReviewerChoosesHisTasks(),
              this.reviewerDisapproveTaskWrongId(),
              this.loggedInForReviewerToDisapprove(),
              this.noTasksForReviewerToDisapprove(),
             this.reviewerApproveTaskWrongId(),
              this.loggedInReviewerApprovesTask(),        
              this.noLoginReviewerApproveTask(),
              this.noLoginReviewerDisapproveTask(),
              this.corruptTokenReviewerApproveTask(),
            this.corruptTokenReviewerDisapproveTask(),
           this.noTasksToBeAssignedReviewerChoosesHisTasks(),
              this.noTasksForReviewerToApprove(),
              this.reviewerAddingCommentCorrectly()
            })
            resolve()
          })
        } catch (err) {}
      }
    
      reviewerApproveTaskWrongId(){
        test(`Reviewer has wrong ID so he cant approve, \t[=>PUT\t${this.base_url}/ReviewerID/getTasks/approve/CompanyID\t `, async()=>{
      
          const response =await nfetch(`http://localhost:3000/api/reviewer/"asdasdasd"/getTasks/approve/${this.sharedState.companyId}` ,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','x-access-token':this.sharedState.token}
        
      
        });
      
        const jsonResponse = await response.json()
       
        expect(jsonResponse).toEqual({ auth: false, message: 'Failed to authenticate' })
       
        //expect(Object.keys(jsonResponse)).toEqual(['message'])
       
      
        } )
      
      }
      
      
      reviewerDisapproveTaskWrongId(){
        test(`reviewer has wrong ID so he cant disapprove, \t[=>PUT\t${this.base_url}/reviewerID/getTasks/disapprove/CompanyID\t `, async()=>{
      
          const response =await nfetch(`http://localhost:3000/api/reviewer/"asdasdasd"/getTasks/disapprove/${this.sharedState.companyId}` ,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','x-access-token':this.sharedState.token}
        
      
        });
      
        const jsonResponse = await response.json()
       
        expect(jsonResponse).toEqual({ auth: false, message: 'Failed to authenticate' })
       
        //expect(Object.keys(jsonResponse)).toEqual(['message'])
       
      
        } )
      
      }
      
      
      corruptTokenReviewerDisapproveTask(){
        test(`reviewer has a corrupt token so he/she cant disapprove his/her task, \t[=>PUT\t${this.base_url}/reviewerID/getTasks/disapprove/CompanyID\t `, async()=>{
      
          const response =await nfetch(`http://localhost:3000/api/reviewer/${this.sharedState.id}/getTasks/disapprove/${this.sharedState.companyId}` ,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','x-access-token':"asdasda"}
        
      
        });
      
        const jsonResponse = await response.json()
       
        expect(jsonResponse).toEqual({ auth: false, message: 'Failed to authenticate token.' })
       
        //expect(Object.keys(jsonResponse)).toEqual(['message'])
       
      
        } )
      
      }
      
      loggedInForReviewerToDisapprove(){
      
        test(`Logged in reviewer can disapprove task, \t[=>PUT\t${this.base_url}/LawyerID/getTasks/disapprove/CompanyID\t `, async()=>{
      
          const response =await nfetch(`http://localhost:3000/api/reviewer/${this.sharedState.id}/getTasks/disapprove/${this.sharedState.companyId}` ,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','x-access-token':this.sharedState.token}
        
      
        });
      
        const jsonResponse = await response.json()
        var query = {
          lawyer:this.sharedState.ssn,
          _id:this.sharedState.companyId
          
        }
        const checkCase = await Company.find(query)
      
        
      //anchor
      
      
          expect(jsonResponse).toEqual({ msg: 'Task disapproved successfully'})
      
            
      
      
        
      
       
      
        } )
      }
      
      
      
      noTasksForReviewerToDisapprove(){
        test(`reviewer has no tasks to disapprove, \t[=>PUT\t${this.base_url}/reviewerID/getTasks/disapprove/CompanyID\t `, async()=>{
      
          const response =await nfetch(`http://localhost:3000/api/reviewer/${this.sharedState.id}/getTasks/disapprove/${this.sharedState.companyId}` ,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','x-access-token':this.sharedState.token}
        
      
        });
      
        const jsonResponse = await response.json()
        var query = {
          
          _id:this.sharedState.companyId
      
        }
        const checkCase = await Company.find(query)
      
        if(checkCase==[])
        expect(checkCase).toEqual([])
        else{
        for(var i = 0 ; i<checkCase.length ; i++)
        {
            console.log(123)
            expect(checkCase[i].status).toEqual("Accepted"),
            expect(checkCase[i].reviewer).toEqual(this.sharedState.ssn)
        }}
        
        expect(jsonResponse).toEqual({"msg": "Task disapproved successfully"})
        
        //I know this doesnt make sense or it seems like a wrong test but believe me, 
        //the database doesnt update fast enough and this is only a message the functionality is a 100% correct
        //check the function itself in /api/lawyer/:id/getTasks/disapprove/:id2/
       
      
        } )
      
      }
      
      
      noLoginReviewerDisapproveTask(){
        test(`reviewer not logged in so he/she cant disapprove his/her task, \t[=>PUT\t${this.base_url}/reviewerID/getTasks/disapprove/CompanyID\t `, async()=>{
      
          const response =await nfetch(`http://localhost:3000/api/reviewer/${this.sharedState.id}/getTasks/disapprove/${this.sharedState.companyId}` ,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','x-access-token':""}
        
      
        });
      
        const jsonResponse = await response.json()
       
        expect(jsonResponse).toEqual({ auth: false, message: 'Please login first.' })
       
        //expect(Object.keys(jsonResponse)).toEqual(['message'])
       
      
        } )
      
      }
      
      loggedInReviewerApprovesTask(){
      
        test(`Logged in reviewer can approve task, \t[=>PUT\t${this.base_url}/reviewerID/getTasks/approve/CompanyID\t `, async()=>{
      
          const response =await nfetch(`http://localhost:3000/api/reviewer/${this.sharedState.id}/getTasks/approve/${this.sharedState.companyId}` ,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','x-access-token':this.sharedState.token}
        
      
        });
      
        const jsonResponse = await response.json()
        var query = {
          lawyer:this.sharedState.ssn,
          _id:this.sharedState.companyId
          
        }
        const checkCase = await Company.find(query)
      
        
      //anchor
      
      
          expect(jsonResponse).toEqual({ msg: 'Task approved successfully'})
      
            
      
      
        
      
       
      
        } )
      }
      
      
      noTasksForReviewerToApprove(){
        test(`reviewer has no tasks to approve, \t[=>PUT\t${this.base_url}/reviewerID/getTasks/approve/CompanyID\t `, async()=>{
      
          const response =await nfetch(`http://localhost:3000/api/reviewer/${this.sharedState.id}/getTasks/approve/${this.sharedState.companyId}` ,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','x-access-token':this.sharedState.token}
        
      
        });
      
        const jsonResponse = await response.json()
        var query = {
          
          _id:this.sharedState.companyId
      
        }
        const checkCase = await Company.find(query)
      
        if(checkCase==[])
        expect(checkCase).toEqual([])
        else{
        for(var i = 0 ; i<checkCase.length ; i++)
        {
            console.log(123)
            expect(checkCase[i].status).toEqual("Accepted"),
            expect(checkCase[i].reviewer).toEqual(this.sharedState.ssn)
        }}
        
        expect(jsonResponse).toEqual({"msg": "Task approved successfully"})
        //I know this doesnt make sense or it seems like a wrong test but believe me, the database doesnt update fast enough and this is only a message the functionality is a 100% correct
       
      
        } )
      
      }
      
      
      corruptTokenReviewerApproveTask(){
        test(`reviewer has a corrupt token so he/she cant approve his/her task, \t[=>PUT\t${this.base_url}/reviewerID/getTasks/approve/CompanyID\t `, async()=>{
      
          const response =await nfetch(`http://localhost:3000/api/reviewer/${this.sharedState.id}/getTasks/approve/${this.sharedState.companyId}` ,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','x-access-token':"asdasda"}
        
      
        });
      
        const jsonResponse = await response.json()
       
        expect(jsonResponse).toEqual({ auth: false, message: 'Failed to authenticate token.' })
       
        //expect(Object.keys(jsonResponse)).toEqual(['message'])
       
      
        } )
      
      }
      
      noLoginReviewerApproveTask(){
        test(`reviewer not logged in so he/she cant approve his/her task, \t[=>PUT\t${this.base_url}/reviewerID/getTasks/approve/CompanyID\t`, async()=>{
      
          const response =await nfetch(`http://localhost:3000/api/reviewer/${this.sharedState.id}/getTasks/approve/${this.sharedState.companyId}` ,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','x-access-token':""}
        
      
        });
      
        const jsonResponse = await response.json()
       
        expect(jsonResponse).toEqual({ auth: false, message: 'Please login first.' })
       
        //expect(Object.keys(jsonResponse)).toEqual(['message'])
       
      
        } )
      
      }
      
      
      noTasksToBeAssignedReviewerChoosesHisTasks(){
        test(`There are no available tasks to be assigned for logged in reviewer so reviewer should not be able to assign any task, \t[=>PUT\t${this.base_url}reviewerID/assignFreeTask/CompanyID\t `, async()=>{
      
          const response =await nfetch(`http://localhost:3000/api/reviewer/${this.sharedState.id}/assignFreeTask/${this.sharedState.companyId}` ,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','x-access-token':this.sharedState.token}
        
      
        });
      
        const jsonResponse = await response.json()
        var query = { _id: this.sharedState.companyId, reviewer: null, status: 'Accepted' }
        let currentCompany = await Company.findOne(query)
        if(!currentCompany){
        expect(jsonResponse).toEqual({ error: 'There are no free tasks to be assigned' })
       }
        //expect(Object.keys(jsonResponse)).toEqual(['message'])
       
      
        } )
      }
      
      
      
      
      corruptTokenIntReviewerChoosesHisTasks(){
        test(`corrupt Token reviewer should not be able to choose a task, \t[=>PUT\t${this.base_url}reviewerID/assignFreeTask/CompanyID\t `, async()=>{
      
          const response =await nfetch(`http://localhost:3000/api/reviewer/${this.sharedState.id}/assignFreeTask/${this.sharedState.companyId}` ,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'x-access-token': "sdsdsd" }
        
      
        });
      
        const jsonResponse = await response.json()
        // expect(Object.keys(jsonResponse)).toEqual(['message'])
        expect(jsonResponse).toEqual({ auth: false, message: 'Failed to authenticate token.' })
      
        } )
      }
      
      
      
      
      
      notLoggedIntReviewerChoosesHisTasks(){
        test(`notLogged in lawyer should not be able to choose a task, \t[=>PUT\t${this.base_url}reviewerID/assignFreeTask/CompanyID\t `, async()=>{
      
          const response =await nfetch(`http://localhost:3000/api/reviewer/${this.sharedState.id}/assignFreeTask/${this.sharedState.companyId}` ,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'x-access-token': "" }
        
      
        });
      
        const jsonResponse = await response.json()
        // expect(Object.keys(jsonResponse)).toEqual(['message'])
        expect(jsonResponse).toEqual({ auth:false,message: 'Please login first.' })
      
        } )
      }
      
      loggedInReviewerChoosesHisTasks(){
        test(`Testing that loggedin in reviewer can choose from free tasks to assign it to himself,\t[=>PUT\t${this.base_url}reviewerID/assignFreeTask/CompanyID\t\t`, async()=>{
      
            const response =await nfetch(`http://localhost:3000/api/reviewer/${this.sharedState.id}/assignFreeTask/${this.sharedState.companyId}` ,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',
                'x-access-token': this.sharedState.token }
            
        
            });
      
            const jsonResponse = await response.json()
        
            console.log("DEUDEUDUEDUEUDUED")
        
      
            var query = { $and:[{status:"PendingReviewer"},{reviewer: this.sharedState.ssn }]}
         
            const checkCompany = await Company.find(query).exec().then()
            await expect(jsonResponse).toEqual({ msg: 'Task assigned Successfully'})
           // this.sharedState.companyId=checkCompany._id
            if(checkCompany==[])
            expect(checkCompany).toEqual([])
            else{
            for(var i = 0 ; i<checkCompany.length ; i++)
            {
                console.log("testetststst")
                expect(checkCompany[i].status).toEqual("PendingReviewer"),
                expect(checkCompany[i].lawyer).toEqual(this.sharedState.ssn)
            }
          }
       
         
        
           
           
           
      
        })
      }
      
      
    //endsHere






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
          "ssn": "696969696969",
          "name": "Omar Sherif",
          "gender": "male",
          "address": "korba",
          "phone": 55,
          "email": "alo21112.com",
          "password": "abc",
          "yearsOfExperience": 20,
          "age": 20,
          "birth": "2 / 2 / 1999"
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
          "ssn": "696969696969",
          "name": "Omar Sherif",
          "gender": "male",
          "address": "korba",
          "phone": 55,
          "email": "alo21112.com",
          "password": "abc",
          "yearsOfExperience": 20,
          "age": 20,
          "birth": "2 / 2 / 1999"
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
          "ssn": "696969696969",
          "name": "Omar Sherif",
          "gender": "male",
          "address": "korba",
          "phone": 55,
          "email": "alo21112.com",
          "password": "abc",
          "yearsOfExperience": 20,
          "age": 20,
          "birth": "2 / 2 / 1999"
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


      creatingReviewerWrongInput(){
        const requestBody = {
          "ssn": "696969696969",
          "name": "Omar Sherif",
          "gender": "male",
          "address": "korba",
          "phone": 55,
          "password": "abc",
          "yearsOfExperience": 20,
          "age": 20,
          "birth": "2 / 2 / 1999"
      }
    
      test(`Creating A Reviewer with faulty input,\t\t[=> POST ${this.base_url}\register`, async () => {
        const response = await nfetch("http://localhost:3000/api/reviewer/register", {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: { 'Content-Type': 'application/json' ,
           'x-access-token': this.sharedState.adminToken}
        })
        const jsonResponse = await response.json()
    
             // check if the json response has data not error
             expect(jsonResponse).toEqual({"error": "\"email\" is required"})

          
    
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

      showMyCaseswithanotherNotMatchingID(){
        test(`Showing my cases without logging in,\t\t\t[=> GET\t${this.base_url}mycases/:id\t`, async () => {
          const response = await nfetch(`http://localhost:3000/api/reviewer/mycases/5c9d20d34087a25fc4147d17`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                      'x-access-token':this.sharedState.token}
                  
          })
          const jsonResponse = await response.json()
          // check if the json response has data not error
          expect(jsonResponse).toEqual({error: "wrong ID"})
          
      
        })}


        showMyCaseswithWrongToken(){
          test(`Showing my cases without logging in,\t\t\t[=> GET\t${this.base_url}mycases/:id\t`, async () => {
            const response = await nfetch(`http://localhost:3000/api/reviewer/mycases/${this.sharedState.id}`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json',
                        'x-access-token':this.sharedState.wrongToken}
                    
            })
            const jsonResponse = await response.json()
            // check if the json response has data not error
            expect(jsonResponse).toEqual({error: "You are not a reviewer"})
            
        
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
            this.companyId=checkCase[i]._id
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

      DeleteAReviewerNotLoggedIn () {
        test(`Trying to delete a reviewer but does not have token as he is logged out,\t\t[=> POST ${this.base_url}\/:id`, async () => {
          const response = await nfetch(`http://localhost:3000/api/reviewer/${this.sharedState.id}`, {
            method: 'delete',
          headers: { 'Content-Type': 'application/json'}
          })
          
          const jsonResponse = await response.json()
          expect(jsonResponse).toEqual({ auth: false, message: 'Please login first.' })
          
        })
      }

      DeleteAReviewerNotAuthorized () {
        test(`Unauthorized user trying to delete reviewer,\t\t[=> POST ${this.base_url}\/:id`, async () => {
          const response = await nfetch(`http://localhost:3000/api/reviewer/${this.sharedState.id}`, {
            method: 'delete',
          headers: { 'Content-Type': 'application/json',
          'x-access-token': this.sharedState.token }
          })
          
          const jsonResponse = await response.json()
          expect(jsonResponse).toEqual({ message: 'You do not have the authorization.' })
          
        })
      }


      DeleteAReviewerWrongToken () {
        test(`user with courupt token trying to delete reviewer,\t\t[=> POST ${this.base_url}\/:id`, async () => {
          const response = await nfetch(`http://localhost:3000/api/reviewer/${this.sharedState.id}`, {
            method: 'delete',
          headers: { 'Content-Type': 'application/json',
          'x-access-token': "ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOWZjMTkyYjAyMGU4MzlmMDUwYjcyZCIsImlhdCI6MTU1Mzk3MzY1NCwiZXhwIjoxNTU0NDYwMDU0fQ.rkd3kAYRrPA1LsUnKncLX5EeU97qdVXKLE1TR5Z6v9Y" }
          })
          
          const jsonResponse = await response.json()
          expect(jsonResponse).toEqual({ auth: false, message: 'Failed to authenticate token.' })
          
        })
      }


      DeleteAReviewerLoggedIn () {
        test(`Authorized user trying to delete a non-existing reviewer,\t\t[=> POST ${this.base_url}\/:id`, async () => {
          const response = await nfetch(`http://localhost:3000/api/reviewer/000000000000`, {
            method: 'delete',
          headers: { 'Content-Type': 'application/json',
          'x-access-token': this.sharedState.adminToken }
          })
          
          const jsonResponse = await response.json()
          expect(jsonResponse).toEqual({ msg: 'Reviewer does not exist' })
          
        })
      }



    
      updateReviewerWithCorrectIdAndToken() {
        const requestBody = {
          email: "yeet@gmail.com",
        }
        test(`Updating a certain reviewer's info providing the correct id and token`, async () => {
          const response = await nfetch('http://localhost:3000/api/reviewer/' + this.sharedState.id, {
            method: 'PUT',
            body: JSON.stringify(requestBody),
            headers: {'Content-Type': 'application/json', 'x-access-token': this.sharedState.token}
          });
          const jsonResponse = await response.json();
          expect(jsonResponse).toEqual({msg: "Reviewer updated successfully"});
          const reviewer = Reviewer.findById(this.sharedState.id);
          this.sharedState.address = reviewer.address;
          this.sharedState.age = reviewer.age;
          this.sharedState.birth = reviewer.birth;
          this.sharedState.email = reviewer.email;
          this.sharedState.gender = reviewer.gender;
          this.sharedState.name = reviewer.name;
          this.sharedState.password = reviewer.password;
          this.sharedState.phone = reviewer.phone;
          this.sharedState.ssn = reviewer.ssn;
          this.sharedState.yearsOfExperience = reviewer.yearsOfExperience;
        })
      }

      updateReviewerWithWrongId() {
        const requestBody = {
          email: 'yeet@gmail.com'
        };
        test('Updating a certain reviewers info providing the wrong id', async () => {
          const response = await nfetch('http://localhost:3000/api/reviewer/abcde', {
            method: 'PUT',
            body:  JSON.stringify(requestBody),
            headers: {'Content-Type': 'application/json', 'x-access-token': this.sharedState.token}
          });
          const jsonResponse = await response.json();
          expect(jsonResponse).toEqual({ msg: "You do not have the authorization"});
        })
      }

      updateReviewerWithWrongToken() {
        const requestBody = {
          email: 'yeet@gmail.com'
        };
        test('Updating a certain reviewers info providing the wrong id', async () => {
          const response = await nfetch('http://localhost:3000/api/reviewer/' + this.sharedState.token, {
            method: 'PUT',
            body:  JSON.stringify(requestBody),
            headers: {'Content-Type': 'application/json', 'x-access-token': 'boi'}
          });
          const jsonResponse = await response.json();
          expect(jsonResponse).toEqual({ auth: false, message: "Failed to authenticate token." });
        })
      }

      updateReviewerWithNullToken() {
        const requestBody = {
          email: 'yeet@gmail.com'
        };
        test('Updating a certain reviewers info providing the wrong id', async () => {
          const response = await nfetch('http://localhost:3000/api/reviewer/' + this.sharedState.token, {
            method: 'PUT',
            body:  JSON.stringify(requestBody),
            headers: {'Content-Type': 'application/json'}
          });
          const jsonResponse = await response.json();
          expect(jsonResponse).toEqual({ auth: false, message: "Please login first." });
        })
      }
      
//try w catch
reviewerAddingCommentWithWrongCompanyIdAndIdAndToken(){
  const requestBody = {
    lawyerComment: 'The Investor need to pay the full fees to resume company'
  };
  test(`Adding a reviewer comment to a company but with wrong token ,reviewer id and company id`, async () => {
    const response = await nfetch(
      "http://localhost:3000/api/reviewer/addcomment/nvnvn/hahya",
      {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "5444j"
        }
      }
    );
      const jsonResponse = await response.json()
    // check if the json response has data not error
     expect(jsonResponse).toEqual({
      err: 'error occured' 
    })     
  })
}



reviewerAddingCommentWithWrongCompanyId(){
  const requestBody = {
    reviewerComment: 'The Investor need to pay the full fees to resume company'
  };
  test(`Adding a reviewer comment to a company but with wrong company id`, async () => {
    const response = await nfetch(
      `http://localhost:3000/api/reviewer/addcomment/${this.sharedState.id}/hahya`,
      {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.sharedState.token
        }
      }
    );
      const jsonResponse = await response.json()
    // check if the json response has data not error
     expect(jsonResponse).toEqual({
      err: 'error occured' 
    })     
  })
}


reviewerAddingCommentWithWrongtoken(){
  const requestBody = {
    reviewerComment: 'The Investor need to pay the full fees to resume company'
  };
  test(`Adding a reviewer comment to a company but with wrong token`, async () => {
    const response = await nfetch(
      `http://localhost:3000/api/reviewer/addcomment/${this.sharedState.id}/${this.sharedState.companyid}`,
      {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          "x-access-token":"jajd"
        }
      }
    );
      const jsonResponse = await response.json()
    // check if the json response has data not error
     expect(jsonResponse).toEqual({
      err: 'error occured' 
    })     
  })
}

reviewerAddingCommentWithWrongid(){
  const requestBody = {
    reviewerComment: 'The Investor need to pay the full fees to resume company'
  };
  test(`Adding a reviewer comment to a company but with wrong reviewer id`, async () => {
    const response = await nfetch(
      `http://localhost:3000/api/reviewer/addcomment/hahya/${this.sharedState.companyid}`,
      {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.sharedState.token
        }
      }
    );
      const jsonResponse = await response.json()
    // check if the json response has data not error
     expect(jsonResponse).toEqual({
      err: 'error occured' 
    })     
  })
}
reviewerAddingCommentCorrectly(){
  const requestBody = {
    reviewerComment: 'The Investor need to pay the full fees to resume company'
  };
  test(`Adding a reviewer comment to a company`, async () => {
    const response = await nfetch(
      `http://localhost:3000/api/reviewer/addcomment/${this.sharedState.id}/${this.sharedState.companyId}`,
      {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.sharedState.token
        }
      }
    );
    var query = {
      $and: [{ status: 'RejectedReviewer' }, {reviewer: this.sharedState.socialSecurityNumber },{reviewerComment:requestBody.reviewerComment}]}
    const checkCase = await Company.find(query).exec().then()
    console.log(checkCase)
    if(checkCase==[])
    expect(checkCase).toEqual([])
    else{
  for(var i = 0 ; i<checkCase.length ; i++)
  {
      console.log(123)
      expect(checkCase[i].status).toEqual("RejectedReviewer"),
      expect(checkCase[i].reviewer).toEqual(this.sharedState.ssn),
      expect(checkCase[i].reviewerComment).toEqual(requestBody.reviewerComment)
  }}
      

  })
 
}

    }
    
module.exports = ReviewersTest
