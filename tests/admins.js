const nfetch = require('node-fetch')
const Company = require('../models/Company')

class AdminsTest{
    constructor (PORT, ROUTE) {
        this.base_url = `http://localhost:${PORT}/routes/api/${ROUTE}`
     this.sharedState = {
        id: null,
        title: null,
        author: null,
        release_date: null,
        ratings: null
      }
    }

  runTests() {
    try {
      return new Promise((resolve, reject) => {
        describe('Checking company Sprint 1 tests', () => {
          this. creatingAdminWithoutLoggingIn()
        })
        resolve()
      })
    } catch (err) {}
  }

  creatingAdminWithoutLoggingIn() {
    const requestBody = {
        name: "manga",
        password:"momonjvjf",
        birthDate: "2018-05-01",
        gender: "Female",
        joinDate:"5/5/2017",
        email: "kh.a392b2com",
        phone: "01111088333"
    }

    test(`Creeating An Admin without logging in,\t\t[=> POST ${this.base_url}\register`, async () => {
      const response = await nfetch("http://localhost:3000/routes/api/admins/register", {
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


}

module.exports = AdminsTest