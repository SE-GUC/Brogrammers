const nfetch = require("node-fetch");
const Company = require("../models/Company");
const Investor = require("../models/Investor");
const Admin = require('../models/Admin')

class InvestorsTest {
  constructor(PORT, ROUTE) {
    this.base_url = `http://localhost:${PORT}/api/${ROUTE}`;
    this.sharedState = {
      id: null,
      token: null,
      name: null,
      type: null,
      gender: null,
      nationality: null,
      idType: null,
      idNumber: null,
      dob: null,
      address: null,
      telephone: null,
      fax: null,
      mail: null,
      password: null,
      adminToken:null
    };
    this.sharedStateCompany = {
      status: null,
      _id: null,
      regulationLaw: null,
      legalCompanyForm: null,
      nameInArabic: null,
      nameInEnglish: null,
      governerateHQ: null,
      cityHQ: null,
      addressHQ: null,
      telephoneHQ: null,
      faxHQ: null,
      capitalCurrency: null,
      capital: null,
      investorName: null,
      investorType: null,
      investorSex: null,
      investorNationality: null,
      investorIdentificationType: null,
      investorIdentificationNumber: null,
      investorBD: null,
      investorAddress: null,
      investorTelephone: null,
      investorFax: null,
      investorEmail: null,
      managers: [],
      __v: 0
    };
  }
  runTests() {
    try {
      return new Promise((resolve, reject) => {
        describe(`Testing Investors ability to fill a case for the start of his company `, () => {
            this.creatingAnAdminAsCrud(),  
            this.creatingInvestor(),
            this.logInWithUserNotFound(),
            this.logInWithWrongPassword(),
            this.logInWithRightPassword(),
            this.creatingInvestorAlreadyLogged(),
            this.creatingInvestorExistingEmail(),
            this.creatingInvestorMissingInputs(),
            this.investorCreateCompanySSCLoggedIn(),
            this.investorCreateCompanySSCNotLoggedIn(),
            this.investorCreateCompanySSCLoggedInWithCorruptToken(),
            this.investorCreateCompanySSCNotLoggedInWithInvestor(),
            this.investorCreateCompanySSCInvalidCompanyFields(),
            this.investorCreateCompanySPCLoggedIn(),
            this.investorCreateCompanySPCNotLoggedIn(),
            this.investorCreateCompanySPCLoggedInWithCorruptToken(),
            this.investorCreateCompanySPCNotLoggedInWithInvestor(),
            this.investorCreateCompanySPCInvalidCompanyFields(),
            this.updateInvestorWithCorrectIdAndToken(),
            this.updateInvestorWithWrongId(),
            this.updateInvestorWithWrongToken(),
            this.viewCompaniesInvestorCorrectIdAndToken(),
            this.viewCompaniesInvestorWrongToken(),
            this.viewCompaniesInvestorNullToken(),
            this.updateInvestorWithNullToken(),
            this.investorCreateCompanySPCInvalidCompanyFields(),
            this.investorsViewFees(),
            this.investorsViewFeesWithoutLogin(),
            this.investorsViewFeesWrongID(),
            this.getMyRequestsLoggedIn(),
            this.getMyRequestsLoggedOut(),
            this.getMyRequestsIncorrectToken(),
            this.EditMyRequestLoggedOut(),
            this.EditMyRequestIncorrectToken(),
            this.EditMyRequestWrongCompany(),
            this.EditMyRequestWrongFields()
            this.loggingOut();
        });
        resolve();
      });
    } catch (err) {}
  }

  runTestsDependently() {
    try {
      return new Promise((resolve, reject) => {
        describe(`Testing the ability of an investor to act with his request`, () => {});
        resolve();
      });
    } catch (err) {}
  }

  creatingInvestorMissingInputs() {
    const requestBody = {
      name: "bassem",
      type: "SPC",
      gender: "male",
      nationality: "'5awaga'",
      idType: "Passport",
      idNumber: "123456789",
      dob: "1998-02-02T22:00:00.000Z",
      address: "Nasr-City",
      telephone: "011271131666",
      password: "NewPassworddd"
    };

    test(`Creating An Investor with missing inputs,\t\t[=> POST ${
      this.base_url
    }\register`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/register",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      // check if the json response has data not error
      expect(jsonResponse).toEqual({ error: '"mail" is required' });
    });
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
      managers: [],
      investorIdentificationNumber: "123456789"
    };
    test(`Testing investors ability to fill a new SSC company form while logged in, \t\t[=> POST ${
      this.base_url
    }\createssccompany`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/createssccompany",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["msg", "data"]);

      const company = await Company.findById(jsonResponse.data._id).exec();

      expect(company.regulationLaw).toEqual(requestBody.regulationLaw);
      expect(company.legalCompanyForm).toEqual(requestBody.legalCompanyForm);
      expect(company.nameInArabic).toEqual(requestBody.nameInArabic);
      expect(company.nameInEnglish).toEqual(requestBody.nameInEnglish);
      expect(company.governerateHQ).toEqual(requestBody.governerateHQ);
      expect(company.cityHQ).toEqual(requestBody.cityHQ);
      expect(company.addressHQ).toEqual(requestBody.addressHQ);
      expect(company.telephoneHQ).toEqual(requestBody.telephoneHQ);
      expect(company.faxHQ).toEqual(requestBody.faxHQ);
      expect(company.capitalCurrency).toEqual(requestBody.capitalCurrency);
      expect(company.capital).toEqual(requestBody.capital);
      expect(company.manager).toEqual(requestBody.manager);
      this.sharedState.companyID = company.id;
      this.sharedStateCompany.id=company.id;
      this.sharedStateCompany.investorIdentificationNumber =
      company.investorIdentificationNumber;
    this.sharedStateCompany.regulationLaw = company.regulationLaw;
    this.sharedStateCompany.legalCompanyForm = company.legalCompanyForm;
    this.sharedStateCompany.nameInArabic = company.nameInArabic;
    this.sharedStateCompany.status = company.status;
    this.sharedStateCompany.nameInEnglish=company.nameInEnglish;
    });
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
    };
    test(`Testing investors ability to fill a new SSC company form while not logged in, \t\t[=> POST ${
      this.base_url
    }\createssccompany`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/createssccompany",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      console.log(
        `Testing investors ability to fill a new SSC company form while not logged in`
      );
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Please login first."
      });
    });
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
    };
    test(`Testing ability to fill a new SSC company form while having a corrupt token, \t\t[=> POST ${
      this.base_url
    }\createssccompany`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/createssccompany",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "mmemkcmk"
          }
        }
      );
      const jsonResponse = await response.json();
      console.log(
        `Testing ability to fill a new SSC company form while having a corrupt token`
      );
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Failed to authenticate token."
      });
    });
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
          telephoneHQ: 7775000,
          faxHQ: 7775000,
          capitalCurrency: "US Dollars",
          capital: 80000,
          managers: []
      }
      test(`Testing ability to fill a new SSC company form while not logged in as an investor, \t\t[=> POST ${this.base_url}\createssccompany`, async () => {
          const response = await nfetch("http://localhost:3000/api/investors/createssccompany", {
              method: 'POST',
              body: JSON.stringify(requestBody),
              headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.adminToken }
          })
          const jsonResponse = await response.json()
          expect(jsonResponse).toEqual({ error: 'Investor does not exist' })
      })
  }

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
    };
    test(`Testing investors ability to fill a new SSC company form while logged in, but filling fields with wrong info, \t\t[=> POST ${
      this.base_url
    }\createssccompany`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/createssccompany",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();
      console.log(
        `Testing investors ability to fill a new SSC company form while logged in, but filling fields with wrong info`
      );
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
    });
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
    };
    test(`Testing investors ability to fill a new SPC company form while logged in, \t\t[=> POST ${
      this.base_url
    }\createspccompany`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/createspccompany",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["msg", "data"]);

      const company = await Company.findById(jsonResponse.data._id).exec();

      expect(company.regulationLaw).toEqual(requestBody.regulationLaw);
      expect(company.legalCompanyForm).toEqual(requestBody.legalCompanyForm);
      expect(company.nameInArabic).toEqual(requestBody.nameInArabic);
      expect(company.nameInEnglish).toEqual(requestBody.nameInEnglish);
      expect(company.governerateHQ).toEqual(requestBody.governerateHQ);
      expect(company.cityHQ).toEqual(requestBody.cityHQ);
      expect(company.addressHQ).toEqual(requestBody.addressHQ);
      expect(company.telephoneHQ).toEqual(requestBody.telephoneHQ);
      expect(company.faxHQ).toEqual(requestBody.faxHQ);
      expect(company.capitalCurrency).toEqual(requestBody.capitalCurrency);
      expect(company.capital).toEqual(requestBody.capital);
      this.sharedState.companyID = company.id;
      this.sharedStateCompany.id=company.id;
      this.sharedStateCompany.investorIdentificationNumber =
      company.investorIdentificationNumber;
    this.sharedStateCompany.regulationLaw = company.regulationLaw;
    this.sharedStateCompany.legalCompanyForm = company.legalCompanyForm;
    this.sharedStateCompany.nameInArabic = company.nameInArabic;
    this.sharedStateCompany.status = company.status;
    this.sharedStateCompany.nameInEnglish=company.nameInEnglish;
    });
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
    };
    test(`Testing investors ability to fill a new SPC company form while not logged in, \t\t[=> POST ${
      this.base_url
    }\createspccompany`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/createspccompany",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      console.log(
        `Testing investors ability to fill a new SPC company form while not logged in`
      );
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Please login first."
      });
    });
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
    };
    test(`Testing ability to fill a new SPC company form while logged in with a corrupt token, \t\t[=> POST ${
      this.base_url
    }\createspccompany`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/createspccompany",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "mmemkcmk"
          }
        }
      );
      const jsonResponse = await response.json();
      console.log(
        `Testing ability to fill a new SPC company form while logged in with a corrupt token`
      );
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Failed to authenticate token."
      });
    });
  }
  //GET another token from reviewer
  investorCreateCompanySPCNotLoggedInWithInvestor() {
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
      test(`Testing ability to fill a new SPC company form while not logged in as an investor, \t\t[=> POST ${this.base_url}\createspccompany`, async () => {
          const response = await nfetch("http://localhost:3000/api/investors/createspccompany", {
              method: 'POST',
              body: JSON.stringify(requestBody),
              headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.adminToken }
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
    };
    test(`Testing investors ability to fill a new SSC company form while logged in, but filling forem with invalid fields, \t\t[=> POST ${
      this.base_url
    }\createspccompany`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/createspccompany",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();
      console.log(
        `Testing investors ability to fill a new SPC company form while logged in, but filling forem with invalid fields`
      );
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
    });
  }

  creatingInvestor() {
    const requestBody = {
      name: "bassem",
      type: "SPC",
      gender: "male",
      nationality: "'5awaga'",
      idType: "Passport",
      idNumber: "123456789",
      dob: "1998-02-02T22:00:00.000Z",
      address: "Nasr-City",
      telephone: "011271131666",
      mail: "Manga.ab1o1b1m11uia1k5215233252r312@gmail.com",
      password: "NewPassworddd"
    };

    test(`Creating An Investror,\t\t[=> POST ${
      this.base_url
    }\register`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/register",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      // check if the json response has data not error
      expect(Object.keys(jsonResponse)).toEqual([
        "auth",
        "token",
        "msg",
        "data"
      ]);

      // go check in the mongo database
      const investor = await Investor.findById(jsonResponse.data._id).exec();
      expect(investor.name).toEqual(requestBody.name);
      expect(investor.phone).toEqual(requestBody.phone);
      expect(investor.email).toEqual(requestBody.email);
      this.sharedState.id = investor.id;
      this.sharedState.token = jsonResponse.token;
    });
  }
  logInWithUserNotFound() {
    const requestBody = {
      email: "qwhat.com",
      password: "2123"
    };

    test(`logInWithUserNotFound,\t\t[=> POST ${
      this.base_url
    }\/login`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/login",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["msg", "data"]);

      const company = await Company.findById(jsonResponse.data._id).exec();

      expect(company.regulationLaw).toEqual(requestBody.regulationLaw);
      expect(company.legalCompanyForm).toEqual(requestBody.legalCompanyForm);
      expect(company.nameInArabic).toEqual(requestBody.nameInArabic);
      expect(company.nameInEnglish).toEqual(requestBody.nameInEnglish);
      expect(company.governerateHQ).toEqual(requestBody.governerateHQ);
      expect(company.cityHQ).toEqual(requestBody.cityHQ);
      expect(company.addressHQ).toEqual(requestBody.addressHQ);
      expect(company.telephoneHQ).toEqual(requestBody.telephoneHQ);
      expect(company.faxHQ).toEqual(requestBody.faxHQ);
      expect(company.capitalCurrency).toEqual(requestBody.capitalCurrency);
      expect(company.capital).toEqual(requestBody.capital);
      expect(company.manager).toEqual(requestBody.manager);
      
    });
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
    };
    test(`Testing investors ability to fill a new SSC company form while not logged in, \t\t[=> POST ${
      this.base_url
    }\createssccompany`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/createssccompany",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      console.log(
        `Testing investors ability to fill a new SSC company form while not logged in`
      );
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Please login first."
      });
    });
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
    };
    test(`Testing ability to fill a new SSC company form while having a corrupt token, \t\t[=> POST ${
      this.base_url
    }\createssccompany`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/createssccompany",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "mmemkcmk"
          }
        }
      );
      const jsonResponse = await response.json();
      console.log(
        `Testing ability to fill a new SSC company form while having a corrupt token`
      );
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Failed to authenticate token."
      });
    });
  }
  // GET another token from reviewer
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
    };
    test(`Testing investors ability to fill a new SSC company form while logged in, but filling fields with wrong info, \t\t[=> POST ${
      this.base_url
    }\createssccompany`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/createssccompany",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();
      console.log(
        `Testing investors ability to fill a new SSC company form while logged in, but filling fields with wrong info`
      );
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
    });
  }

  

  creatingInvestorAlreadyLogged() {
    const requestBody = {
      name: "bassem",
      type: "SPC",
      gender: "male",
      nationality: "'5awaga'",
      idType: "Passport",
      idNumber: "123456789",
      dob: "1998-02-02T22:00:00.000Z",
      address: "Nasr-City",
      telephone: "011271131666",
      mail: "Manga.ab1o1b1m11uia1k5215233252r312@gmail.com",
      password: "NewPassworddd"
    };

    test(`Creating A Reviewer while already logged in,\t\t[=> POST ${
      this.base_url
    }\register`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/register",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();

      // check if the json response has data not error
      expect(jsonResponse).toEqual({ message: "You are already logged in" });
    });
  }

  creatingInvestorExistingEmail() {
    const requestBody = {
      name: "bassem",
      type: "SPC",
      gender: "male",
      nationality: "'5awaga'",
      idType: "Passport",
      idNumber: "123456789",
      dob: "1998-02-02T22:00:00.000Z",
      address: "Nasr-City",
      telephone: "011271131666",
      mail: "Manga.ab1o1b1m11uia1k5215233252r312@gmail.com",
      password: "NewPassworddd"
    };

    test(`Creating A Reviewer while already logged in,\t\t[=> POST ${
      this.base_url
    }\register`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/register",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      // check if the json response has data not error
      expect(jsonResponse).toEqual({ error: "Email already exists" });
    });
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
    };
    test(`Testing investors ability to fill a new SPC company form while not logged in, \t\t[=> POST ${
      this.base_url
    }\createspccompany`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/createspccompany",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      console.log(
        `Testing investors ability to fill a new SPC company form while not logged in`
      );
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Please login first."
      });
    });
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
    };
    test(`Testing ability to fill a new SPC company form while logged in with a corrupt token, \t\t[=> POST ${
      this.base_url
    }\createspccompany`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/createspccompany",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "mmemkcmk"
          }
        }
      );
      const jsonResponse = await response.json();
      console.log(
        `Testing ability to fill a new SPC company form while logged in with a corrupt token`
      );
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Failed to authenticate token."
      });
    });
  }
  // GET another token from reviewer
  investorCreateCompanySPCNotLoggedInWithInvestor() {
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
      test(`Testing ability to fill a new SPC company form while not logged in as an investor, \t\t[=> POST ${this.base_url}\createspccompany`, async () => {
          const response = await nfetch("http://localhost:3000/api/investors/createspccompany", {
              method: 'POST',
              body: JSON.stringify(requestBody),
              headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.adminToken }
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
    };
    test(`Testing investors ability to fill a new SSC company form while logged in, but filling forem with invalid fields, \t\t[=> POST ${
      this.base_url
    }\createspccompany`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/createspccompany",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();
      console.log(
        `Testing investors ability to fill a new SPC company form while logged in, but filling forem with invalid fields`
      );
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
    });
  }

  creatingInvestor() {
    const requestBody = {
      name: "bassem",
      type: "SPC",
      gender: "male",
      nationality: "'5awaga'",
      idType: "Passport",
      idNumber: "123456789",
      dob: "1998-02-02T22:00:00.000Z",
      address: "Nasr-City",
      telephone: "011271131666",
      mail: "Manga.ab1o1b1m11uia1k5215233252r312@gmail.com",
      password: "NewPassworddd"
    };

    test(`Creating A Reviewer,\t\t[=> POST ${this.base_url}/register`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/register",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      // check if the json response has data not error
      expect(Object.keys(jsonResponse)).toEqual([
        "auth",
        "token",
        "msg",
        "data"
      ]);

      // go check in the mongo database
      const investor = await Investor.findById(jsonResponse.data._id).exec();
      expect(investor.name).toEqual(requestBody.name);
      expect(investor.phone).toEqual(requestBody.phone);
      expect(investor.email).toEqual(requestBody.email);
      this.sharedState.id = investor.id;
      this.sharedState.token = jsonResponse.token;
    });
  }

  logInWithUserNotFound() {
    const requestBody = {
      email: "qwhat.com",
      password: "2123"
    };

    test(`logInWithUserNotFound,\t\t[=> POST ${
      this.base_url
    }\/login`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/login",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      console.log(`${this.base_url}\/login`);

      expect(jsonResponse).toEqual({ auth: false, message: "No user found." });
    });
  }
  logInWithWrongPassword() {
    const requestBody = {
      email: "Manga.ab1o1b1m11uia1k5215233252r312@gmail.com",
      password: "12345678"
    };

    test(`logInWithWrongPassword,\t\t[=> POST ${
      this.base_url
    }\/login`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/login",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      console.log(`${this.base_url}\/login`);

      expect(jsonResponse).toEqual({ auth: false, token: null });
    });
  }
  logInWithRightPassword() {
    const requestBody = {
      email: "Manga.ab1o1b1m11uia1k5215233252r312@gmail.com",
      password: "NewPassworddd"
    };

    test(`logInWithRightPassword,\t\t[=> POST ${
      this.base_url
    }\/login`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/login",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      const token = this.sharedState.token;

      console.log(`${this.base_url}\/login`);
      expect(Object.keys(jsonResponse)).toEqual(["auth", "token"]);
    });
  }
  creatingInvestorAlreadyLogged() {
    const requestBody = {
      name: "bassem",
      type: "SPC",
      gender: "male",
      nationality: "'5awaga'",
      idType: "Passport",
      idNumber: "123456789",
      dob: "1998-02-02T22:00:00.000Z",
      address: "Nasr-City",
      telephone: "011271131666",
      mail: "Manga.ab1o1b1m11uia1k5215233252r312@gmail.com",
      password: "NewPassworddd"
    };

    test(`Creating A Reviewer while already logged in,\t\t[=> POST ${
      this.base_url
    }\register`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/register",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();

      // check if the json response has data not error
      expect(jsonResponse).toEqual({ message: "You are already logged in" });
    });
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
    };

    test(`Creating A Reviewer while already logged in,\t\t[=> POST ${
      this.base_url
    }\register`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/register",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      // check if the json response has data not error
      expect(jsonResponse).toEqual({ error: "Email already exists" });
    });
  }
  // ----------------------------------------------Reyad-------------------------------------------------------

  getMyRequestsLoggedIn() {
    test(`Fetching the data of a request as an investor while logged in,\t[=> GET\t\t${
      this.base_url
    }/MyRequests\t`, async () => {
      const response = await nfetch(
        `${this.base_url}/MyRequests`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );

      const jsonResponse = await response.json();
      // check if the json response has data not error
      expect(Object.keys(jsonResponse)).toEqual(["data"]);
      expect(Object.keys(jsonResponse)).not.toEqual(["error"]);

      const company = await Company.findById(this.sharedStateCompany.id).exec();

      expect(company.status).toEqual(this.sharedStateCompany.status);
      expect(company.nameInArabic).toEqual(
        this.sharedStateCompany.nameInArabic
      );
      expect(company.lawyerComment).toEqual(
        this.sharedStateCompany.lawyerComment
      );
    });
  }
  getMyRequestsLoggedOut() {
    test(`Fetching the data of my requests as an investor while logged out,\t[=> GET\t\t${
      this.base_url
    }/MyRequests\t`, async () => {
      const response = await nfetch(
        `${this.base_url}/MyRequests`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Testing a logged out investor viewing his requests");
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Please login first."
      });
    });
  }
  getMyRequestsIncorrectToken() {
    test(`Fetching the data of my requests as an investor with wrong token,\t[=> GET\t\t${
      this.base_url
    }/:id/MyRequests\t`, async () => {
      const response = await nfetch(
        `${this.base_url}/MyRequests`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "wrongToken"
          }
        }
      );
      console.log("Testing an investor viewing his requests with wrong token");
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Failed to authenticate token."
      });
    });
  }
  
  //Lawyer must reject first
  EditMyRequestLoggedIn() {
    const requestBody = {
      regulationLaw: "Law 72",
      legalCompanyForm: "SSC",
      nameInArabic: "شركة احمد"
    };
    test(`Updating a company request form while logged in,\t[=> PUT\t\t${
      this.base_url
    }/MyRequests/:companyid\t`, async () => {
      const response = await nfetch(
        `${this.base_url}/MyRequests/${
          this.sharedStateCompany.id
        }`,
        {
          method: "PUT",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();
      // check if the json response has data not error
      console.log(`Updating a company form after being rejected`);
      const company = await Company.findById(this.sharedStateCompany.id);
      expect(jsonResponse).toEqual({ msg: "Form updated successfully" });

      expect(this.nameInArabic).toEqual(requestBody.nameInArabic);
      this.sharedStateCompany.nameInArabic = company.nameInArabic;
    });
  }
  EditMyRequestLoggedOut() {
    test(`Updating a company request form while logged out,\t[=> PUT\t\t${
      this.base_url
    }/MyRequests/:companyid\t`, async () => {
      const response = await nfetch(
        `${this.base_url}/MyRequests/${
          this.sharedStateCompany.id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Testing a logged out investor updating a request form");
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Please login first."
      });
    });
  }
  EditMyRequestIncorrectToken() {
    test(`Updating a company request form with incorrect token,\t[=> PUT\t\t${
      this.base_url
    }/MyRequests/:companyid\t`, async () => {
      const response = await nfetch(
        `${this.base_url}/MyRequests/${
          this.sharedStateCompany.id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "wrongToken"
          }
        }
      );
      console.log(
        "Testing an investor updating a request form with wrong token"
      );
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Failed to authenticate token."
      });
    });
  }
  EditMyRequestWrongCompany() {
    const requestBody = {
      nameInArabic: "شركة احمد"
    };
    test(`Updating a company request form which is not rejected yet and commented on by a lawyer,\t[=> PUT\t\t${
      this.base_url
    }/MyRequests/:companyid\t`, async () => {
      const response = await nfetch(
        `${this.base_url}/MyRequests/${
          this.sharedState.id
        }`,
        {
          method: "PUT",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: "Company does not exist" });
    });
  }
  EditMyRequestWrongFields() {
    const requestBody = {
      legalCompanyForm: 123,
      nameInArabic: "شركة احمد"
    };
    test(`Updating a company request form with wrong fields,\t[=> PUT\t\t${
      this.base_url
    }/MyRequests/:companyid\t`, async () => {
      const response = await nfetch(
        `${this.base_url}/MyRequests/${
          this.sharedStateCompany.id
        }`,
        {
          method: "PUT",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      // check if the json response has data not error
      console.log(`Updating a company form with wrong fields`);
    });
  }

  updateInvestorWithCorrectIdAndToken() {
    const requestBody = {
      name: "Ahmad Hesham Mohammed",
      gender: "male",
      mail: "yeetyeet.com"
    };
    test(`Updating specificed investor's info, providing correct token and ID`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/" + this.sharedState.id,
        {
          method: "PUT",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ msg: "Investor updated successfully" });
      const investor = await Investor.findById(this.sharedState.id);
      this.sharedState.address = investor.address;
      this.sharedState.dob = investor.dob;
      this.sharedState.fax = investor.fax;
      this.sharedState.gender = investor.gender;
      this.sharedState.idNumber = investor.idNumber;
      this.sharedState.idType = investor.idType;
      this.sharedState.mail = investor.mail;
      this.sharedState.name = investor.name;
      this.sharedState.nationality = investor.nationality;
      this.sharedState.password = investor.password;
      this.sharedState.telephone = investor.telephone;
      this.sharedState.type = investor.type;
    });
  }

  updateInvestorWithWrongId() {
    const requestBody = {
      name: "Ahmad Hesham Mohammed",
      gender: "male",
      mail: "yeetyeet.com"
    };
    test("Updating the specified investor's info, providing wrong ID", async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/abcde",
        {
          method: "PUT",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({
        msg: "You do not have the authorization"
      });
    });
  }

  updateInvestorWithWrongToken() {
    const requestBody = {
      name: "Ahmad Hesham Mohammed",
      gender: "male",
      mail: "yeetyeet.com"
    };
    test("Updating the specified investor's info, providing wrong token", async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/" + this.sharedState.id,
        {
          method: "PUT",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "aqwtyunbbj"
          }
        }
      );
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Failed to authenticate token."
      });
    });
  }

  updateInvestorWithNullToken() {
    const requestBody = {
      name: "Ahmad Hesham Mohammed",
      gender: "male",
      mail: "yeetyeet.com"
    };
    test("Updating the specified investor's info, providing a null token", async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/" + this.sharedState.id,
        {
          method: "PUT",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({
        auth: false,
        message: "No token provided."
      });
    });
  }

  viewCompaniesInvestorCorrectIdAndToken() {
    test(`Displaying all established and unestablished companies of an investor providing the correct token`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/View/ViewCompanies",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["msg", "data"]);
    });
  }

  viewCompaniesInvestorWrongToken() {
    test(`Displaying all established and unestablished companies of an investor providing the correct token`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/View/ViewCompanies",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "abcde"
          }
        }
      );
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({
        auth: false,
        message: "Failed to authenticate token."
      });
    });
  }
  //removed the token from the headers to make it null
  viewCompaniesInvestorNullToken() {
    test(`Displaying all established and unestablished companies of an investor provoding the correct token`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/View/ViewCompanies",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({
        auth: false,
        message: "No token provided."
      });
    });
  }
  investorsViewFees() {
    test(`Fetching the company creation fees ,[=> GET${
      this.base_url
    }/:id/:companyID/viewFees`, async () => {
      const response = await nfetch(
        `http://localhost:3000/api/investors/${this.sharedState.id}/${
          this.sharedState.companyID
        }/viewFees`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["EstimatedFees"]);
    });
  }
  investorsViewFeesWithoutLogin() {
    test(`Fetching the company creation fees without logging in ,[=> GET${
      this.base_url
    }/:id/:companyID/viewFees`, async () => {
      const response = await nfetch(
        `http://localhost:3000/api/investors/${this.sharedState.id}/${
          this.sharedState.companyID
        }/viewFees`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "wrongToken"
          }
        }
      );
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["auth", "message"]);
    });
  }
  investorsViewFeesWrongID() {
    test(`Fetching the company creation fees with a wrong investor ID ,[=> GET${
      this.base_url
    }/:id/:companyID/viewFees`, async () => {
      const response = await nfetch(
        `http://localhost:3000/api/investors/wrongID/${
          this.sharedState.companyID
        }/viewFees`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.sharedState.token
          }
        }
      );
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["auth", "message"]);
    });
  }

  //Panda logouts
  loggingOut(){
    test(`Logging an Investor out,\t\t[=> GET ${this.base_url}\logout`, async () => {
      const response = await nfetch("http://localhost:3000/routes/api/admins/logout", {
        method: 'GET'                    
        })           
        const jsonResponse = await response.json()         
        expect(jsonResponse).toEqual({"auth": false, "token": null})       
    })
  }


  creatingAnAdminAsCrud() {
    const requestBody = {
      name: "manga",
      password: "momonjvjf",
      birthDate: "2018-05-01",
      gender: "Female",
      joinDate: "5/5/2017",
      email: "a@b.com",
      phone: "01111088333"
    };

    test(`Creating An Admin as CRUD without authentication,\t\t[=> POST ${
      this.base_url
    }\register`, async () => {
      const response = await nfetch(
        "http://localhost:3000/routes/api/admins/registerNo",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      // check if the json response has data not error
      expect(Object.keys(jsonResponse)).toEqual([
        "auth",
        "token",
        "msg",
        "data"
      ]);

      // go check in the mongo database
      const admin = await Admin.findById(jsonResponse.data._id).exec();
      expect(admin.name).toEqual(requestBody.name);
      expect(admin.phone).toEqual(requestBody.phone);
      expect(admin.email).toEqual(requestBody.email);
      this.sharedState.adminToken = jsonResponse.token;
    });
  }
}

module.exports = InvestorsTest;
