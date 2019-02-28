const uuid = require('uuid')

class Company{
    constructor(regulationLaw, legalCompanyForm, nameInArabic, nameInEnglish, governerateHQ, cityHQ, addressHQ, telephoneHQ, faxHQ, capitalCurrency, capital, investorName, 
        investorType, investorSex, investorNationality, investorIdentificationType, investorIdentificationNumber, investorBD, investorAddress,
         investorTelephone, investorFax, investorEmail, managers){
             this.regulationLaw= regulationLaw;
             this.legalCompanyForm=legalCompanyForm;
             this.nameInArabic=nameInArabic;
             this.nameInEnglish=nameInEnglish;
             this.governerateHQ=governerateHQ;
             this.cityHQ=cityHQ;
             this.addressHQ=addressHQ;
             this.telephoneHQ=telephoneHQ;
             this.faxHQ=faxHQ;
             this.capitalCurrency=capitalCurrency;
             this.capital=capital;
             this.investorName=investorName;
             this.investorType=investorType;
             this.investorSex= investorSex;
             this.investorNationality= investorNationality;
             this.investorIdentificationType= investorIdentificationType;
             this.investorIdentificationNumber= investorIdentificationNumber;
             this.investorBD= investorBD;
             this.investorAddress= investorAddress;
             this.investorTelephone = investorTelephone;
             this.investorFax = investorFax;
             this.investorEmail = investorEmail;
             this.managers = managers;
             this.id = uuid.v4();
        }
}



module.exports = Company