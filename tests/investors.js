const nfetch = require("node-fetch");
const Investor = require("../models/Investor");

class InvestorsTest {
  constructor(PORT, ROUTE) {
    this.base_url = `http://localhost:${PORT}/routes/api/${ROUTE}`;
    this.sharedState = {
      id: "5c9f5b5a41169e75544b8712",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOWY1YjVhNDExNjllNzU1NDRiODcxMiIsImlhdCI6MTU1Mzk0NzQ4MywiZXhwIjoxNTU0MDMzODgzfQ.Uqfr7NxPRkvNtA0-2KjrtK1Ajqc5Dv1-aSu-0xfJbcA",
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
      password: null
    };
  }

  runTests() {
    try {
      describe(`Testing Investors ability to fill a case for the start of his company application`, () => {
        this.updateInvestorWithCorrectIdAndToken();
        this.updateInvestorWithWrongId();
        this.updateInvestorWithWrongToken();
      });
      resolve();
    } catch (err) {}
  }

  updateInvestorWithCorrectIdAndToken() {
    const requestBody = {
      name: "Ahmad Hesham Mohammed",
      gender: "male",
      mail: "yeetyeet.com"
    };
    test(`Updating specificed investor's info, providing correct token and ID`, async () => {
      const response = await nfetch(
        "http://localhost:3000/api/investors/5c9f5b5a41169e75544b8712",
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
      expect(jsonResponse).toEqual({ msg: "You do not have the authorization" });
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
              "http://localhost:3000/api/investors/5c9f5b5a41169e75544b8712",
              {
                  method: "PUT",
                  body: JSON.stringify(requestBody),
                  headers: {
                      "Content-Type": "application/json",
                      "x-access-token": "aqwtyunbbj"
                  }
              }
          )
          const jsonResponse = await response.json();
          expect(jsonResponse).toEqual({auth: false, message: "Failed to authenticate token."});
      })
  }

}
module.exports = InvestorsTest;
