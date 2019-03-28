const nfetch = require('node-fetch')
const Company = require('../models/Company')

class InvestorTest {

    constructor(PORT, ROUTE) {
        this.base_url = `http://localhost:${PORT}/api/${ROUTE}`
        this.sharedState = {
            // name: null,
            // type: null,
            // gender: null,
            // nationality: null,
            // idType: null,
            // idNumber: null,
            // dob: null,
            // address: null,
            // telephone: null,
            // fax: null,
            // mail: null,
            // password: null,
            token: null
        }
    }

    runTests() {
        try {
            return new Promise((resolve, reject) => {
                describe(`Testing Investors ability to fill a case for the start of his company application`, () => {
                        this.investorCreateCompanySSCLoggedIn(),
                        this.investorCreateCompanySSCNotLoggedIn(),
                        this.investorCreateCompanySSCLoggedInWithCorruptToken(),
                        this.investorCreateCompanySSCNotLoggedInWithInvestor(),
                        this.investorCreateCompanySSCInvalidCompanyFields(),
                        this.investorCreateCompanySPCLoggedIn(),
                        this.investorCreateCompanySPCNotLoggedIn(),
                        this.investorCreateCompanySPCLoggedInWithCorruptToken(),
                        this.investorCreateCompanySPCNotLoggedInWithInvestor(),
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
            telephoneHQ: '07775000',
            faxHQ: '07775000',
            capitalCurrency: "US Dollars",
            capital: '80000',
            manager: []
        }
        test(`Testing investors ability to fill a new SSC company form while logged in, \t\t[=> POST ${this.base_url}\createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/investors/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            console.log(`Testing investors ability to fill a new SSC company form while logged in`)
            const company = await Company.findById(jsonResponse.data._id).exec()
            expect(jsonResponse).toEqual({ "msg": 'SSC Company was created successfully', "data": company })
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
            this.sharedState.id = company.id
            this.sharedState.token=jsonResponse.token
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
            telephoneHQ: '07775000',
            faxHQ: '07775000',
            capitalCurrency: "US Dollars",
            capital: '80000',
            manager: []
        }
        test(`Testing investors ability to fill a new SSC company form while not logged in, \t\t[=> POST ${this.base_url}\createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/investors/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()
            console.log(`Testing investors ability to fill a new SSC company form while not logged in`)
            expect(jsonResponse).toEqual({ "auth": false, "message": "Please login first." })
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
            telephoneHQ: '07775000',
            faxHQ: '07775000',
            capitalCurrency: "US Dollars",
            capital: '80000',
            manager: []
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

    investorCreateCompanySSCNotLoggedInWithInvestor() {
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: '07775000',
            faxHQ: '07775000',
            capitalCurrency: "US Dollars",
            capital: '80000',
            manager: []
        }
        test(`Testing ability to fill a new SSC company form while not logged in as an investor, \t\t[=> POST ${this.base_url}\createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/investors/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            console.log(`Testing ability to fill a new SSC company form while not logged in as an investor`)
            expect(jsonResponse).toEqual({ error: 'Investor does not exist' })
        })
    }

    investorCreateCompanySSCInvalidCompanyFields() {
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: '07775000',
            faxHQ: '07775000',
            capitalCurrency: "US Dollars",
            capital: '80000',
            manager: []
        }
        test(`Testing investors ability to fill a new SSC company form while logged in, but filling fields with wrong info, \t\t[=> POST ${this.base_url}\createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/investors/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            console.log(`Testing investors ability to fill a new SSC company form while logged in, but filling fields with wrong info`)
            expect(jsonResponse).toEqual({ "error": isValidated.error.details[0].message })
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
            telephoneHQ: '07775000',
            faxHQ: '07775000',
            capitalCurrency: "US Dollars",
            capital: '80000',
        }
        test(`Testing investors ability to fill a new SPC company form while logged in, \t\t[=> POST ${this.base_url}\createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/investors/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            console.log(`Testing investors ability to fill a new SPC company form while logged in`)
            expect(jsonResponse).toEqual({ "msg": 'SPC Company was created successfully', "data": company })
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
            telephoneHQ: '07775000',
            faxHQ: '07775000',
            capitalCurrency: "US Dollars",
            capital: '80000',
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
            telephoneHQ: '07775000',
            faxHQ: '07775000',
            capitalCurrency: "US Dollars",
            capital: '80000',
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

    investorCreateCompanySPCNotLoggedInWithInvestor() {
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: '07775000',
            faxHQ: '07775000',
            capitalCurrency: "US Dollars",
            capital: '80000',
        }
        test(`Testing ability to fill a new SPC company form while not logged in as an investor, \t\t[=> POST ${this.base_url}\createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/investors/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            expect
            console.log(`Testing ability to fill a new SPC company form while not logged in as an investor`)
            expect(jsonResponse).toEqual({ "error": 'Investor does not exist' })
        })
    }

    investorCreateCompanySPCInvalidCompanyFields() {
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: '07775000',
            faxHQ: '07775000',
            capitalCurrency: "US Dollars",
            capital: '80000',
        }
        test(`Testing investors ability to fill a new SSC company form while logged in, but filling forem with invalid fields, \t\t[=> POST ${this.base_url}\createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/investors/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            console.log(`Testing investors ability to fill a new SSC company form while logged in, but filling forem with invalid fields`)
            expect(jsonResponse).toEqual({ "error": isValidated.error.details[0].message })
        })
    }
}
module.exports = InvestorTest