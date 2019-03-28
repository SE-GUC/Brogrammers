const nfetch = require('node-fetch')
const Lawyer = require('../models/Lawyer')

class LawyerTest {

    constructor(PORT, ROUTE) {
        this.base_url = `http://localhost:${PORT}/api/${ROUTE}`
        this.sharedState = {
            // firstName: null,
            // middleName:null,
            // lastName: null,
            // email: null,
            // password: null,
            // mobileNumber: null,
            // socialSecurityNumber: null,
            // salary: null,
            // birthDate: null,
            // yearsOfExperience: null,
            token: null
        }
    }

    runTests() {
        try {
            return new Promise((resolve, reject) => {
                describe(`Testing Investors ability to fill a case for the start of his company application while not logged in`, () => {
                        this.lawyerCreateCompanySSCLoggedIn(),
                        this.lawyerCreateCompanySSCNotLoggedIn(),
                        this.lawyerCreateCompanySSCCorruptToken(),
                        this.lawyerCreateCompanySSCNotLoggedInAsLawyer(),
                        this.lawyerCreateCompanySSCInvalidCompanyOrInvestorFields(),
                        this.lawyerCreateCompanySPCLoggedIn(),
                        this.lawyerCreateCompanySPCNotLoggedIn(),
                        this.lawyerCreateCompanySPCCorruptToken(),
                        this.lawyerCreateCompanySPCNotLoggedInAsLawyer(),
                        this.lawyerCreateCompanySPCInvalidCompanyOrInvestorFields()
                })

                resolve();
            })
        } catch (err) {

        }
    }

    lawyerCreateCompanySSCLoggedIn() {
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
            manager: [],
            investorName: "mohamed",
            investorType: "alaa",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: '4516515165156',
            investorBD: "Oct 09 2009",
            investorAddress: "rehab",
            investorTelephone: '25262512',
            investorFax: '51622415',
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing lawyer's ability to fill a new SSC company form for an investor while logged in, \t\t[=> POST ${this.base_url}\lawyerinvestor\createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(jsonResponse).toEqual({ "msg": 'Company was created successfully', "data": company })
        })
    }

    lawyerCreateCompanySSCNotLoggedIn() {
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
            manager: [],
            investorName: "mohamed",
            investorType: "alaa",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: '4516515165156',
            investorBD: "Oct 09 2009",
            investorAddress: "rehab",
            investorTelephone: '25262512',
            investorFax: '51622415',
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing lawyer's ability to fill a new SSC company form for an investor while not logged in, \t\t[=> POST ${this.base_url}\lawyerinvestor\createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(jsonResponse).toEqual({ "auth": false, "message": "Please login first." })
        })
    }

    lawyerCreateCompanySSCCorruptToken() {
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
            manager: [],
            investorName: "mohamed",
            investorType: "alaa",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: '4516515165156',
            investorBD: "Oct 09 2009",
            investorAddress: "rehab",
            investorTelephone: '25262512',
            investorFax: '51622415',
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing lawyer ability to fill a new SSC company form for an investor while logged in, but having an invaild token, \t\t[=> POST ${this.base_url}\lawyerinvestor\createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': "rmbkelllv" }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(jsonResponse).toEqual({ auth: false, message: 'Failed to authenticate token.' })
        })
    }

    lawyerCreateCompanySSCNotLoggedInAsLawyer() {
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
            manager: [],
            investorName: "mohamed",
            investorType: "alaa",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: '4516515165156',
            investorBD: "Oct 09 2009",
            investorAddress: "rehab",
            investorTelephone: '25262512',
            investorFax: '51622415',
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing investors ability to fill a new SSC company form while not logged in, \t\t[=> POST ${this.base_url}\lawyerinvestor\createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(jsonResponse).toEqual({ error: 'Lawyer does not exist' })
        })
    }

    lawyerCreateCompanySSCInvalidCompanyOrInvestorFields() {
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
            manager: [],
            investorName: "mohamed",
            investorType: "alaa",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: '4516515165156',
            investorBD: "Oct 09 2009",
            investorAddress: "rehab",
            investorTelephone: '25262512',
            investorFax: '51622415',
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing investors ability to fill a new SSC company form while not logged in, \t\t[=> POST ${this.base_url}\lawyerinvestor\createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(jsonResponse).toEqual({ "error": isValidated.error.details[0].message })
        })
    }

















    lawyerCreateCompanySPCLoggedIn() {
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
            investorName: "mohamed",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: '4516515165156',
            investorBD: "Oct 09 2009",
            investorAddress: "rehab",
            investorTelephone: '25262512',
            investorFax: '51622415',
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing lawyer's ability to fill a new SPC company form for an investor while logged in, \t\t[=> POST ${this.base_url}\lawyerinvestor\createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createsspcompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(jsonResponse).toEqual({ "msg": 'Company was created successfully', "data": company })
        })
    }

    lawyerCreateCompanySPCNotLoggedIn() {
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
            investorName: "mohamed",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: '4516515165156',
            investorBD: "Oct 09 2009",
            investorAddress: "rehab",
            investorTelephone: '25262512',
            investorFax: '51622415',
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing lawyer's ability to fill a new SPC company form for an investor while not logged in, \t\t[=> POST ${this.base_url}\lawyerinvestor\createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(jsonResponse).toEqual({ "auth": false, "message": "Please login first." })
        })
    }

    lawyerCreateCompanySPCCorruptToken() {
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
            investorName: "mohamed",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: '4516515165156',
            investorBD: "Oct 09 2009",
            investorAddress: "rehab",
            investorTelephone: '25262512',
            investorFax: '51622415',
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing lawyer ability to fill a new SPC company form for an investor while logged in, but having an invaild token, \t\t[=> POST ${this.base_url}\lawyerinvestor\createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': "rmbkelllv" }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(jsonResponse).toEqual({ auth: false, message: 'Failed to authenticate token.' })
        })
    }

    lawyerCreateCompanySSCNotLoggedInAsLawyer() {
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
            investorName: "mohamed",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: '4516515165156',
            investorBD: "Oct 09 2009",
            investorAddress: "rehab",
            investorTelephone: '25262512',
            investorFax: '51622415',
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing investors ability to fill a new SPC company form while not logged in, \t\t[=> POST ${this.base_url}\lawyerinvestor\createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(jsonResponse).toEqual({ error: 'Lawyer does not exist' })
        })
    }

    lawyerCreateCompanySPCInvalidCompanyOrInvestorFields() {
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
            investorName: "mohamed",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: '4516515165156',
            investorBD: "Oct 09 2009",
            investorAddress: "rehab",
            investorTelephone: '25262512',
            investorFax: '51622415',
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing investors ability to fill a new SPC company form while not logged in, \t\t[=> POST ${this.base_url}\lawyerinvestor\createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(jsonResponse).toEqual({ "error": isValidated.error.details[0].message })
        })
    }
}
module.exports = LawyerTest