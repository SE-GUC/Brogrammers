const nfetch = require('node-fetch')
const Investor = require('../models/Investor')

class InvestorsTest{
    constructor (PORT, ROUTE) {
        this.base_url = `http://localhost:${PORT}/routes/api/${ROUTE}`
     this.sharedState = {
        id: null,
        token:null
      }
    }

  runTests() {
    try {
      return new Promise((resolve, reject) => {
        describe('Checking company Sprint 1 tests', () => {
          this.creatingInvestor(),
          this.creatingInvestorAlreadyLogged(),
          this.creatingInvestorExistingEmail()
       //   this.creatingAnAdminAsCrud(),
        //  this.creatingAnAdminByAdmin(),
         // this.creatingAnAdminAlreadyExsistent(),
         // this.creatingAnAdminWithCorruptedToken()
        })
        resolve()
      })
    } catch (err) {}
  }


  creatingInvestor(){
    const requestBody = {
        name: "bassem",
        type: "SPC",
        gender: "male",
        nationality: "'5awaga'",
        idType: "Passport",
        idNumber: 123456789,
        dob: "1998-02-02T22:00:00.000Z",
        address: "Nasr-City",
        telephone: "011271131666",
        mail: "Manga.ab1o1b1m11uia1k5215233252r312@gmail.com",
        password: "NewPassworddd"
  }

  test(`Creating A Reviewer,\t\t[=> POST ${this.base_url}\register`, async () => {
    const response = await nfetch("http://localhost:3000/api/investors/register", {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    })
    const jsonResponse = await response.json()

         // check if the json response has data not error
    expect(Object.keys(jsonResponse)).toEqual(['auth','token','msg','data'])
    
         // go check in the mongo database
         const investor = await Investor.findById(jsonResponse.data._id).exec()
         expect(investor.name).toEqual(requestBody.name)
         expect(investor.phone).toEqual(requestBody.phone)
         expect(investor.email).toEqual(requestBody.email)
         this.sharedState.id = investor.id
         this.sharedState.token=jsonResponse.token
      

  })
  }

  creatingInvestorAlreadyLogged(){
    const requestBody = {
        name: "bassem",
        type: "SPC",
        gender: "male",
        nationality: "'5awaga'",
        idType: "Passport",
        idNumber: 123456789,
        dob: "1998-02-02T22:00:00.000Z",
        address: "Nasr-City",
        telephone: "011271131666",
        mail: "Manga.ab1o1b1m11uia1k5215233252r312@gmail.com",
        password: "NewPassworddd"
  }

  test(`Creating A Reviewer while already logged in,\t\t[=> POST ${this.base_url}\register`, async () => {
    const response = await nfetch("http://localhost:3000/api/investors/register", {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' ,
    'x-access-token': this.sharedState.token}
    })
    const jsonResponse = await response.json()

         // check if the json response has data not error
    expect(jsonResponse).toEqual({auth:false ,message: 'You are already logged in' })
      
  })
  }

  creatingInvestorExistingEmail(){
    const requestBody = {
        name: "bassem",
        type: "SPC",
        gender: "male",
        nationality: "'5awaga'",
        idType: "Passport",
        idNumber: 123456789,
        dob: "1998-02-02T22:00:00.000Z",
        address: "Nasr-City",
        telephone: "011271131666",
        mail: "Manga.ab1o1b1m11uia1k5215233252r312@gmail.com",
        password: "NewPassworddd"
  }

  test(`Creating A Reviewer while already logged in,\t\t[=> POST ${this.base_url}\register`, async () => {
    const response = await nfetch("http://localhost:3000/api/investors/register", {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json'}
    })
    const jsonResponse = await response.json()

         // check if the json response has data not error
    expect(jsonResponse).toEqual({error : "Email already exists"})
      

  })
  }


}

module.exports =InvestorsTest