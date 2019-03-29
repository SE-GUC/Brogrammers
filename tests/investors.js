const nfetch = require("node-fetch");
const Investor = require("../models/Investor");
const Company = require("../models/Company");
class investorTest {
  constructor(PORT, ROUTE) {
    this.base_url = `http://localhost:${PORT}/api/${ROUTE}`;
    this.sharedState = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOWQyN2E2OTdmNjgzZTU2YzM2ZTQ0ZiIsImlhdCI6MTU1MzgwMzE3NSwiZXhwIjoxNTUzODg5NTc1fQ.6C42vAc4c5UeNdSNyGVvq0j_BrMGPpgvtlha1hEU3sw",
      id: "5c9d27a697f683e56c36e44f",
      name: null,
      type: null,
      gender: null,
      nationality: null,
      idType: null,
      idNumber: "123456789",
      dob: null,
      address: null,
      telephone: null,
      fax: null,
      mai: null,
      password: null
    };
    this.sharedStateCompany = {
      id: "5c9d284897f683e56c36e450",
      status: "PendingLawyer",
      _id: "5c9d284897f683e56c36e450",
      regulationLaw: "Law 72",
      legalCompanyForm: "SSC",
      nameInArabic: "شركة مختار مختار",
      nameInEnglish: "Mokhtar Mokhtaar",
      governerateHQ: "Cairo",
      cityHQ: "Cairo",
      addressHQ: "Tanta",
      telephoneHQ: 10102354,
      faxHQ: 1242436264026,
      capitalCurrency: "USD",
      capital: 54800,
      investorName: "ahmed",
      investorType: "type",
      investorSex: "male",
      investorNationality: "Czeckoslovakia",
      investorIdentificationType: "passport",
      investorIdentificationNumber: "123456789",
      investorBD: "1882-04-03T21:54:51.000Z",
      investorAddress: "Cairo",
      investorTelephone: 64276721,
      investorFax: 1326513,
      investorEmail: "ahmed@gmail.com",
      managers: [],
      __v: 0
    };
  }

  runIndependently() {
    try {
      return new Promise((resolve, reject) => {
        describe("Checking company Sprint 1 tests", () => {});
        resolve();
      });
    } catch (err) {}
  }
  runTests() {
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure dependent investors routes work", () => {
          this.getMyRequests();
          this.getMyRequestDetailed();
          // this.putEdit();
        });
        resolve();
      });
    } catch (err) {}
  }

  getMyRequests() {
    test(`Fetching the data of a request as an investor,\t[=> GET\t\t${
      this.base_url
    }/:id/MyRequests\t`, async () => {
      const response = await nfetch(
        `${this.base_url}/${this.sharedState.id}/MyRequests`,
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
      this.sharedStateCompany.nameInArabic;
    });
  }
  EditCompanyAfterRejection() {
    const requestBody = {
      regulationLaw: "Law 72",
      legalCompanyForm: "SSC",
      nameInArabic: "شركة مختار مختار",
      nameInEnglish: "Mokhtar Mokhtaar",
      governerateHQ: "Cairo",
      cityHQ: "Cairo",
      addressHQ: "Tanta",
      telephoneHQ: 10102354,
      faxHQ: 1242436264026,
      capitalCurrency: "USD",
      capital: 54800,
      investorName: "ahmed",
      investorType: "type",
      investorSex: "male",
      investorNationality: "Czeckoslovakia",
      investorIdentificationType: "passport",
      investorIdentificationNumber: "123456789",
      investorBD: "1882-04-03T21:54:51.000Z",
      investorAddress: "Cairo",
      investorTelephone: 64276721,
      investorFax: 1326513,
      investorEmail: "ahmed@gmail.com",
      managers: []
    };
    test(`Fetching the data of a request as an investor,\t[=> PUT\t\t${
      this.base_url
    }/:id/MyRequests/:companyid\t`, async () => {
      const response = await nfetch(
        `${this.base_url}/${this.sharedState.id}//${
          this.sharedStateCompany.id
        }`,
        {
          method: "PUT",
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

      const company = await Company.findById(jsonResponse.data.id).exec();
    });
  }
  getMyRequestDetailed() {
    test(`Fetching the data of a request as an investor,\t[=> GET\t\t${
      this.base_url
    }/:id/MyRequests/:companyid\t`, async () => {
      const response = await nfetch(
        `${this.base_url}/${this.sharedState.id}/MyRequests/${
          this.sharedStateCompany.id
        }`,
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
      expect(company.regulationLaw).toEqual(
        this.sharedStateCompany.regulationLaw
      );
      expect(company.legalCompanyForm).toEqual(
        this.sharedStateCompany.legalCompanyForm
      );
      expect(company.nameInArabic).toEqual(
        this.sharedStateCompany.nameInArabic
      );
      expect(company.nameInEnglish).toEqual(
        this.sharedStateCompany.nameInEnglish
      );
      expect(company.governerateHQ).toEqual(
        this.sharedStateCompany.governerateHQ
      );
      expect(company.cityHQ).toEqual(this.sharedStateCompany.cityHQ);
      expect(company.addressHQ).toEqual(this.sharedStateCompany.addressHQ);
      expect(company.telephoneHQ).toEqual(this.sharedStateCompany.telephoneHQ);
      expect(company.faxHQ).toEqual(this.sharedStateCompany.faxHQ);
      expect(company.capitalCurrency).toEqual(
        this.sharedStateCompany.capitalCurrency
      );
      expect(company.capital).toEqual(this.sharedStateCompany.capital);
      expect(company.investorName).toEqual(
        this.sharedStateCompany.investorName
      );
      expect(company.investorType).toEqual(
        this.sharedStateCompany.investorType
      );
      expect(company.investorSex).toEqual(this.sharedStateCompany.investorSex);
      expect(company.investorNationality).toEqual(
        this.sharedStateCompany.investorNationality
      );
      expect(company.investorIdentificationType).toEqual(
        this.sharedStateCompany.investorIdentificationType
      );
      expect(company.investorIdentificationNumber).toEqual(
        this.sharedStateCompany.investorIdentificationNumber
      );
      expect(company.investorAddress).toEqual(
        this.sharedStateCompany.investorAddress
      );
      expect(company.investorTelephone).toEqual(
        this.sharedStateCompany.investorTelephone
      );
      expect(company.investorEmail).toEqual(
        this.sharedStateCompany.investorEmail
      );
      expect(company.lawyerComment).toEqual(
        this.sharedStateCompany.lawyerComment
      );
    });
  }

}
module.exports = investorTest;
