const nfetch = require('node-fetch')
const Admin = require('../models/Admin')
const Lawyer = require('../models/Lawyer')
const Reviewer = require('../models/reviewer')

class AdminsTest {
  constructor (PORT, ROUTE) {
    this.base_url = `http://localhost:${PORT}/routes/api/${ROUTE}`
    this.sharedState = {
      id: null,
      token: null
    }
  }

  runTests () {
    try {
      return new Promise((resolve, reject) => {
        describe('Checking Admin login', () => {
          this.creatingAdminWithoutLoggingIn(),
          this.creatingAnAdminAsCrud(),
          this.creatingAnAdminByAdmin(),
          this.creatingAnAdminAlreadyExsistent(),
          this.creatingAnAdminWithCorruptedToken(),
          this.logInWithUserNotFound(),
          this.logInWithWrongPassword(),
          this.logInWithRightPassword()
        })
        resolve()
      })
    } catch (err) {}
  }

  creatingAnAdminAsCrud () {
    const requestBody = {
      name: 'manga',
      password: 'momonjvjf',
      birthDate: '2018-05-01',
      gender: 'Female',
      joinDate: '5/5/2017',
      email: 'kh.a392b2com22',
      phone: '01111088333'
    }

    test(`Creating An Admin as CRUD without authentication,\t\t[=> POST ${this.base_url}\register`, async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/registerNo', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['auth', 'token', 'msg', 'data'])

      // go check in the mongo database
      const admin = await Admin.findById(jsonResponse.data._id).exec()
      expect(admin.name).toEqual(requestBody.name)
      expect(admin.phone).toEqual(requestBody.phone)
      expect(admin.email).toEqual(requestBody.email)
      this.sharedState.id = admin.id
      this.sharedState.token = jsonResponse.token
    })
  }

  creatingAdminWithoutLoggingIn () {
    const requestBody = {
      name: 'manga',
      password: 'momonjvjf',
      birthDate: '2018-05-01',
      gender: 'Female',
      joinDate: '5/5/2017',
      email: 'kh.a392b2com',
      phone: '01111088333'
    }

    test(`Creeating An Admin without logging in,\t\t[=> POST ${this.base_url}\register`, async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      console.log(`${this.base_url}\register`)
      // check if the json response has data not error
      expect(jsonResponse).toEqual({ 'auth': false, 'message': 'Please login first.' })
    })
  }

  creatingAnAdminWithCorruptedToken () {
    const requestBody = {
      name: 'manga',
      password: 'momonjvjf',
      birthDate: '2018-05-01',
      gender: 'Female',
      joinDate: '5/5/2017',
      email: 'khaled.com3',
      phone: '01111088333'
    }

    test(`Creating An Admin using Corrupted token,\t\t[=> POST ${this.base_url}\register`, async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json',
          'x-access-token': 'abcd' }
      })
      const jsonResponse = await response.json()

      // check if the json response has data not error
      expect(jsonResponse).toEqual({ 'auth': false, 'message': 'Failed to authenticate token.' })
    })
  }

  creatingAnAdminByAdmin () {
    const requestBody = {
      name: 'manga',
      password: 'momonjvjf',
      birthDate: '2018-05-01',
      gender: 'Female',
      joinDate: '5/5/2017',
      email: 'khaled.com',
      phone: '01111088333'
    }

    test(`Creating An Admin as using authentication by another admin,\t\t[=> POST ${this.base_url}\register`, async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json',
          'x-access-token': this.sharedState.token }
      })
      const jsonResponse = await response.json()

      // check if the json response has data not error
      expect(Object.keys(jsonResponse)).toEqual(['auth', 'token', 'msg', 'data'])

      // go check in the mongo database
      const admin = await Admin.findById(jsonResponse.data._id).exec()
      expect(admin.name).toEqual(requestBody.name)
      expect(admin.phone).toEqual(requestBody.phone)
      expect(admin.email).toEqual(requestBody.email)
      this.sharedState.id = admin.id
      this.sharedState.token = jsonResponse.token
    })
  }

  creatingAnAdminAlreadyExsistent () {
    const requestBody = {
      name: 'manga',
      password: 'momonjvjf',
      birthDate: '2018-05-01',
      gender: 'Female',
      joinDate: '5/5/2017',
      email: 'khaled.com',
      phone: '01111088333'
    }

    test(`Creating An Admin using an already existent email,\t\t[=> POST ${this.base_url}\register`, async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json',
          'x-access-token': this.sharedState.token }
      })
      const jsonResponse = await response.json()

      // check if the json response has data not error
      expect(jsonResponse).toEqual({ 'error': 'Email already exists' })
    })
  }

  logInWithUserNotFound () {
    const requestBody = {
      email: 'notreg@sumerge.com',
      password: '123456789'
    }

    test(`logInWithUserNotFound,\t\t[=> POST ${this.base_url}\/login`, async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/login', {
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
      email: 'omarrtl@whhatever.com',
      password: '12345678'
    }

    test(`logInWithWrongPassword,\t\t[=> POST ${this.base_url}\/login`, async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/login', {
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
      email: 'khaled.com',
      password: 'momonjvjf'
    }

    test(`logInWithRightPassword,\t\t[=> POST ${this.base_url}\/login`, async () => {
      const response = await nfetch('http://localhost:3000/routes/api/admins/login', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      const token = this.sharedState.token

      console.log(`${this.base_url}\/login`)
      expect(jsonResponse).toEqual({ auth: true, token: token })
    })
  }
  // check if the json response has data not error
}

module.exports = AdminsTest
