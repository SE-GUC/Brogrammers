const nfetch = require('node-fetch')
const Company = require('../models/Company')
const Investor = require('../models/Investor')

class InvestorsTest {
    constructor(PORT, ROUTE) {
        this.base_url = `http://localhost:${PORT}/routes/api/${ROUTE}`
        this.sharedState = {
            id: null,
            token: null
        }
    }

    runTests() {
        try {
            return new Promise((resolve, reject) => {
                describe(`Testing Investors ability to fill a case for the start of his company application`, () => {
                    this.creatingInvestor(),
                        this.creatingInvestorAlreadyLogged(),
                        this.creatingInvestorExistingEmail()
                    this.investorCreateCompanySSCLoggedIn(),
                        this.investorCreateCompanySSCNotLoggedIn(),
                        this.investorCreateCompanySSCLoggedInWithCorruptToken(),
                        //this.investorCreateCompanySSCNotLoggedInWithInvestor(),
                        this.investorCreateCompanySSCInvalidCompanyFields(),
                        this.investorCreateCompanySPCLoggedIn(),
                        this.investorCreateCompanySPCNotLoggedIn(),
                        this.investorCreateCompanySPCLoggedInWithCorruptToken(),
                       // this.investorCreateCompanySPCNotLoggedInWithInvestor(),
                        this.investorCreateCompanySPCInvalidCompanyFields()
                })
                resolve();
            })
        } catch (err) {

        }
    }

    investorCreateCompanySSCLoggedIn() {
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: 7775000,
            faxHQ: 7775000,
            capitalCurrency: "US Dollars",
            capital: 80000,
            managers: []
        }
        test(`Testing investors ability to fill a new SSC company form while logged in, \t\t[=> POST ${this.base_url}\createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/investors/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()

            expect(Object.keys(jsonResponse)).toEqual([ "msg", "data" ])

            const company = await Company.findById(jsonResponse.data._id).exec()

            expect(company.regulationLaw).toEqual(requestBody.regulationLaw)
            expect(company.legalCompanyForm).toEqual(requestBody.legalCompanyForm)
            expect(company.nameInArabic).toEqual(requestBody.nameInArabic)
            expect(company.nameInEnglish).toEqual(requestBody.nameInEnglish)
            expect(company.governerateHQ).toEqual(requestBody.governerateHQ)
            expect(company.cityHQ).toEqual(requestBody.cityHQ)
            expect(company.addressHQ).toEqual(requestBody.addressHQ)
            expect(company.telephoneHQ).toEqual(requestBody.telephoneHQ)
            expect(company.faxHQ).toEqual(requestBody.faxHQ)
            expect(company.capitalCurrency).toEqual(requestBody.capitalCurrency)
            expect(company.capital).toEqual(requestBody.capital)
            expect(company.manager).toEqual(requestBody.manager)
        })
    }

    investorCreateCompanySSCNotLoggedIn() {
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: 7775000,
            faxHQ: 7775000,
            capitalCurrency: "US Dollars",
            capital: 80000,
            managers: []
        }
        test(`Testing investors ability to fill a new SSC company form while not logged in, \t\t[=> POST ${this.base_url}\createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/investors/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()
            console.log(`Testing investors ability to fill a new SSC company form while not logged in`)
            expect(jsonResponse).toEqual({ auth: false, "message": "Please login first." })
        })
    }

    investorCreateCompanySSCLoggedInWithCorruptToken() {
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: 7775000,
            faxHQ: 7775000,
            capitalCurrency: "US Dollars",
            capital: 80000,
            managers: []
        }
        test(`Testing ability to fill a new SSC company form while having a corrupt token, \t\t[=> POST ${this.base_url}\createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/investors/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': "mmemkcmk" }
            })
            const jsonResponse = await response.json()
            console.log(`Testing ability to fill a new SSC company form while having a corrupt token`)
            expect(jsonResponse).toEqual({ "auth": false, "message": 'Failed to authenticate token.' })
        })
    }
    //GET another token from reviewer
    // investorCreateCompanySSCNotLoggedInWithInvestor() {
    //     const requestBody = {
    //         regulationLaw: "Law 159",
    //         legalCompanyForm: "CompanyForm",
    //         nameInArabic: "esm bel 3araby",
    //         nameInEnglish: "WAW",
    //         governerateHQ: "New Cairo",
    //         cityHQ: "Cairo",
    //         addressHQ: "Rehab City",
    //         telephoneHQ: 7775000,
    //         faxHQ: 7775000,
    //         capitalCurrency: "US Dollars",
    //         capital: 80000,
    //         managers: []
    //     }
    //     test(`Testing ability to fill a new SSC company form while not logged in as an investor, \t\t[=> POST ${this.base_url}\createssccompany`, async () => {
    //         const response = await nfetch("http://localhost:3000/api/investors/createssccompany", {
    //             method: 'POST',
    //             body: JSON.stringify(requestBody),
    //             headers: { 'Content-Type': 'application/json', 'x-access-token':  }
    //         })
    //         const jsonResponse = await response.json()
    //         expect(jsonResponse).toEqual({ error: 'Investor does not exist' })
    //     })
    // }

    investorCreateCompanySSCInvalidCompanyFields() {
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: 15155515185,
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: "7775000",
            faxHQ: "7775000",
            capitalCurrency: "US Dollars",
            capital: "80000",
            managers: []
        }
        test(`Testing investors ability to fill a new SSC company form while logged in, but filling fields with wrong info, \t\t[=> POST ${this.base_url}\createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/investors/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            console.log(`Testing investors ability to fill a new SSC company form while logged in, but filling fields with wrong info`)
            expect(Object.keys(jsonResponse)).toEqual([ "error" ])
        })
    }

    investorCreateCompanySPCLoggedIn() {
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: 7775000,
            faxHQ: 7775000,
            capitalCurrency: "US Dollars",
            capital: 80000
        }
        test(`Testing investors ability to fill a new SPC company form while logged in, \t\t[=> POST ${this.base_url}\createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/investors/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()

            expect(Object.keys(jsonResponse)).toEqual([ "msg", "data" ])

            const company = await Company.findById(jsonResponse.data._id).exec()

            expect(company.regulationLaw).toEqual(requestBody.regulationLaw)
            expect(company.legalCompanyForm).toEqual(requestBody.legalCompanyForm)
            expect(company.nameInArabic).toEqual(requestBody.nameInArabic)
            expect(company.nameInEnglish).toEqual(requestBody.nameInEnglish)
            expect(company.governerateHQ).toEqual(requestBody.governerateHQ)
            expect(company.cityHQ).toEqual(requestBody.cityHQ)
            expect(company.addressHQ).toEqual(requestBody.addressHQ)
            expect(company.telephoneHQ).toEqual(requestBody.telephoneHQ)
            expect(company.faxHQ).toEqual(requestBody.faxHQ)
            expect(company.capitalCurrency).toEqual(requestBody.capitalCurrency)
            expect(company.capital).toEqual(requestBody.capital)
        })
    }

    investorCreateCompanySPCNotLoggedIn() {
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: 7775000,
            faxHQ: 7775000,
            capitalCurrency: "US Dollars",
            capital: 80000
        }
        test(`Testing investors ability to fill a new SPC company form while not logged in, \t\t[=> POST ${this.base_url}\createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/investors/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()
            console.log(`Testing investors ability to fill a new SPC company form while not logged in`)
            expect(jsonResponse).toEqual({ "auth": false, "message": "Please login first." })
        })
    }

    investorCreateCompanySPCLoggedInWithCorruptToken() {
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: 7775000,
            faxHQ: 7775000,
            capitalCurrency: "US Dollars",
            capital: 80000
        }
        test(`Testing ability to fill a new SPC company form while logged in with a corrupt token, \t\t[=> POST ${this.base_url}\createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/investors/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': "mmemkcmk" }
            })
            const jsonResponse = await response.json()
            console.log(`Testing ability to fill a new SPC company form while logged in with a corrupt token`)
            expect(jsonResponse).toEqual({ "auth": false, "message": 'Failed to authenticate token.' })
        })
    }
    //GET another token from reviewer
    // investorCreateCompanySPCNotLoggedInWithInvestor() {
    //     const requestBody = {
    //         regulationLaw: "Law 159",
    //         legalCompanyForm: "CompanyForm",
    //         nameInArabic: "esm bel 3araby",
    //         nameInEnglish: "WAW",
    //         governerateHQ: "New Cairo",
    //         cityHQ: "Cairo",
    //         addressHQ: "Rehab City",
    //         telephoneHQ: 7775000,
    //         faxHQ: 7775000,
    //         capitalCurrency: "US Dollars",
    //         capital: 80000
    //     }
    //     test(`Testing ability to fill a new SPC company form while not logged in as an investor, \t\t[=> POST ${this.base_url}\createspccompany`, async () => {
    //         const response = await nfetch("http://localhost:3000/api/investors/createspccompany", {
    //             method: 'POST',
    //             body: JSON.stringify(requestBody),
    //             headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
    //         })
    //         const jsonResponse = await response.json()
    //         expect
    //         console.log(`Testing ability to fill a new SPC company form while not logged in as an investor`)
    //         expect(jsonResponse).toEqual({ "error": 'Investor does not exist' })
    //     })
    // }

    investorCreateCompanySPCInvalidCompanyFields() {
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: 848187,
            nameInArabic: 2561656,
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: 7775000,
            faxHQ: 7775000,
            capitalCurrency: "US Dollars",
            capital: "80000"
        }
        test(`Testing investors ability to fill a new SSC company form while logged in, but filling forem with invalid fields, \t\t[=> POST ${this.base_url}\createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/investors/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            console.log(`Testing investors ability to fill a new SPC company form while logged in, but filling forem with invalid fields`)
            expect(Object.keys(jsonResponse)).toEqual(["error"])
        })
    }

    creatingInvestor() {
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
            expect(Object.keys(jsonResponse)).toEqual(['auth', 'token', 'msg', 'data'])

            // go check in the mongo database
            const investor = await Investor.findById(jsonResponse.data._id).exec()
            expect(investor.name).toEqual(requestBody.name)
            expect(investor.phone).toEqual(requestBody.phone)
            expect(investor.email).toEqual(requestBody.email)
            this.sharedState.id = investor.id
            this.sharedState.token = jsonResponse.token
        })
    }

    creatingInvestorAlreadyLogged() {
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
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': this.sharedState.token
                }
            })
            const jsonResponse = await response.json()

            // check if the json response has data not error
            expect(jsonResponse).toEqual({ message: 'You are already logged in' })
        })
    }

    creatingInvestorExistingEmail() {
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
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()

            // check if the json response has data not error
            expect(jsonResponse).toEqual({ error: "Email already exists" })


        })
    }
}

module.exports = InvestorsTest
