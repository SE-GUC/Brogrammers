const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  identificationType: {
    type: String,
    required: true
  },
  identificationNumber: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  managerialPosition: {
    type: String
  }
});

const CompanySchema = new Schema(
 {
    managers: {
      type: [ManagerSchema]
    },
    creationDate:{
      type:Date
    },
    status: {
      type: String,
      default: "PendingLawyer",
      enum: [
        "PendingLawyer",
        "PendingReviewer",
        "RejectedLawyer",
        "RejectedReviewer",
        "Accepted"
      ]
    },
    legalCompanyForm:{
      type: String
    },
    lawyer: {
      type: String
      // Lawyer SSN
    },
    lawyerComment: {
      type: String
    },
    reviewer: {
      type: String
      // should be type reviewer
    },
    reviewerComment: {
      type: String
    }
  },
  { strict:false }

);

module.exports = mongoose.model('companys',CompanySchema);
