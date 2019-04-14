const nfetch = require('node-fetch')
const Company = require('../models/Company')


class CompanysTest {
    constructor(PORT, ROUTE) {
        this.base_url = `http://localhost:${PORT}/api/${ROUTE}`
        this.sharedState = {
            companyId: null
        }
    }

    runTests() {
        try {
            return new Promise((resolve, reject) => {
                describe('Checking company Sprint 1 tests', () => {
                        this.lawyerCreateCompanySSC(),
                        this.lawyerCreateCompanySPC(),
                        this.viewCompanys(),
                        this.viewCompanysById(),
                        this.viewAcceptedCompanies()
                     
                })
                resolve()
            })
        } catch (err) { }
    }



    lawyerCreateCompanySSC() {
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
        managers: [],
        investorName: "mohamed",
        investorType: "alaa",
        investorSex: "male",
        investorNationality: "Egyptian",
        investorIdentificationType: "basbor",
        investorIdentificationNumber: "4516515165156",
        investorBD: "7/7/2010",
        investorAddress: "rehab",
        investorTelephone: "25262512",
        investorFax: "51622415",
        investorEmail: "mohamed@gmail.com"
    }
    test(`Testing Company creation in CRUD, \t\t[=> POST ${this.base_url}\/lawyerinvestor\/createssccompany`, async () => {
        const response = await nfetch("http://localhost:3000/api/company/ssc", {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: { 'Content-Type': 'application/json'}
        })
        const jsonResponse = await response.json()

        expect(Object.keys(jsonResponse)).toEqual(["msg", "data"])

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
        expect(company.investorName).toEqual(requestBody.investorName)
        expect(company.investorType).toEqual(requestBody.investorType)
        expect(company.investorSex).toEqual(requestBody.investorSex)
        expect(company.investorNationality).toEqual(requestBody.investorNationality)
        expect(company.investorIdentificationType).toEqual(requestBody.investorIdentificationType)
        expect(company.investorIdentificationNumber).toEqual(requestBody.investorIdentificationNumber)
        expect(company.investorAddress).toEqual(requestBody.investorAddress)
        expect(company.investorTelephone).toEqual(requestBody.investorTelephone)
        expect(company.investorFax).toEqual(requestBody.investorFax)
        expect(company.investorEmail).toEqual(requestBody.investorEmail)
        this.sharedState.companyId=company.id
    })
}




lawyerCreateCompanySPC() {

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
        investorName: "mohamed",
        investorSex: "male",
        investorNationality: "Egyptian",
        investorIdentificationType: "basbor",
        investorIdentificationNumber: "4516515165156",
        investorBD: "7/7/2010",
        investorAddress: "rehab",
        investorTelephone: "25262512",
        investorFax: "51622415",
        investorEmail: "mohamed@gmail.com"
    }
    test(`Testing lawyer's ability to fill a new SSC company form for an investor while logged in, \t\t[=> POST ${this.base_url}\/lawyerinvestor\/createspccompany`, async () => {
        const response = await nfetch("http://localhost:3000/api/company/spc", {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: { 'Content-Type': 'application/json' }
        })
        const jsonResponse = await response.json()

        expect(Object.keys(jsonResponse)).toEqual(["msg", "data"])

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
        expect(company.investorName).toEqual(requestBody.investorName)
        expect(company.investorSex).toEqual(requestBody.investorSex)
        expect(company.investorNationality).toEqual(requestBody.investorNationality)
        expect(company.investorIdentificationType).toEqual(requestBody.investorIdentificationType)
        expect(company.investorIdentificationNumber).toEqual(requestBody.investorIdentificationNumber)
        expect(company.investorAddress).toEqual(requestBody.investorAddress)
        expect(company.investorTelephone).toEqual(requestBody.investorTelephone)
        expect(company.investorFax).toEqual(requestBody.investorFax)
        expect(company.investorEmail).toEqual(requestBody.investorEmail)
        this.sharedState.companyId=company.id
    })
}


viewCompanys() {
    test(`Showing all companys CRUD,\t\t\t[=> GET\t${this.base_url}mycases/:id\t`, async () => {
        const response = await nfetch(`http://localhost:3000/api/company`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        })
        const jsonResponse = await response.json()
        // check if the json response has data not error
        expect(Object.keys(jsonResponse)).toEqual(['data'])




    })

}


viewCompanysById() {
    test(`Showing all companys CRUD,\t\t\t[=> GET\t${this.base_url}\t`, async () => {
        const response = await nfetch(`http://localhost:3000/api/company/${this.sharedState.companyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        })
        const jsonResponse = await response.json()
        // check if the json response has data not error
        expect(Object.keys(jsonResponse)).toEqual(['data'])

    
        const checkCase = await Company.findById(this.sharedState.companyId)
        expect(this.sharedState.companyId+"").toEqual(checkCase._id+"")




    })

}

viewAcceptedCompanies() {
    test(`Viewing all accepted companies,\t\t\t[=> GET\t${this.base_url}\t`, async () => {
        const response = await nfetch("http://localhost:3000/api/company/approved", {
            method: 'GET'
        })
        const jsonResponse = await response.json()
        // check if the json response has data not error
        expect(Object.keys(jsonResponse)).toEqual(['data'])
    })
}

}
    
module.exports = CompanysTest
