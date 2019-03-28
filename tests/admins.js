const nfetch = require('node-fetch')
const Admin = require('../models/Admin')
const Lawyer = require('../models/Lawyer')
const Reviewer = require('../models/reviewer')


class AdminsTest{
  constructor (PORT, ROUTE) {
      this.base_url = `http://localhost:${PORT}/routes/api/${ROUTE}`
   this.sharedState = {
      id: null,
      token: null
    }
  }

runTests() {
  try {
    return new Promise((resolve, reject) => {
      describe('Checking Admin login', () => {
        this.logInWithUserNotFound(),
        this.logInWithWrongPassword(),
        this.logInWithRightPassword()
      })
      resolve()
    })
  } catch (err) {}
}

  logInWithUserNotFound() {
  const requestBody = {
    email: "notreg@sumerge.com",
    password:"123456789"
  }

  test(`logInWithUserNotFound,\t\t[=> POST ${this.base_url}\/login`, async () => {
    const response = await nfetch("http://localhost:3000/routes/api/admins/login", {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    })
    const jsonResponse = await response.json()

    console.log(`${this.base_url}\/login`);
    
    expect(jsonResponse).toEqual({auth: false,message: 'No user found.' })
  })
}

logInWithWrongPassword() {
  const requestBody = {
    email: "omarrtl@whhatever.com",
     password: "12345678"
  }

  test(`logInWithWrongPassword,\t\t[=> POST ${this.base_url}\/login`, async () => {
    const response = await nfetch("http://localhost:3000/routes/api/admins/login", {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    })
    const jsonResponse = await response.json()

    console.log(`${this.base_url}\/login`);
    
    expect(jsonResponse).toEqual({auth: false,token: null })
  })
}

logInWithRightPassword() {
  const requestBody = {
    email: "omarrtl@whhatever.com",
     password: "12345678tl"
  }

  test(`logInWithRightPassword,\t\t[=> POST ${this.base_url}\/login`, async () => {
    const response = await nfetch("http://localhost:3000/routes/api/admins/login", {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    })
    const jsonResponse = await response.json()

    console.log(`${this.base_url}\/login`);
    
    expect(jsonResponse).toEqual({ auth: true,token: "sharedValue"})
  })
}

}

module.exports = AdminsTest