// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const Company = require('../../models/Company');
const Manager = require('../../models/Manager');

const companies = [
	new Company('a', 'b','ش','sh','bor','al','alll','012','aaa',100000,'ass','lll','lll','kk','lnl','kkl','2019-09-08','lo','ooo','899','kh','ww', 'ww')
];

//Create SSC Company
router.post('/ssc', (req, res) => {
	const regulationLaw = req.body.regulationLaw
    const legalCompanyForm = req.body.legalCompanyForm
    const nameInArabic = req.body.nameInArabic
    const nameInEnglish = req.body.nameInEnglish
    const governerateHQ = req.body.governerateHQ
    const cityHQ = req.body.cityHQ
    const addressHQ = req.body.addressHQ
    const telephoneHQ = req.body.telephoneHQ
    const faxHQ = req.body.faxHQ
    const capitalCurrency = req.body.capitalCurrency
    const capital = req.body.capital
    const investorName = req.body.investorName
    const investorType = req.body.investorType
    const investorSex = req.body.investorSex
    const investorNationality = req.body.investorNationality
    const investorIdentificationType = req.body.investorIdentificationType
    const investorIdentificationNumber = req.body.investorIdentificationNumber
    const investorBD = req.body.investorBD
    const investorAddress = req.body.investorAddress
    const investorTelephone = req.body.investorTelephone
    const investorFax = req.body.investorFax
    const investorEmail = req.body.investorEmail
    const managers = req.body.managers

	const schema = {
		regulationLaw: Joi.required(),
        legalCompanyForm: Joi.required(),
        nameInArabic: Joi.string().required(),
        nameInEnglish: Joi.string(),
        governerateHQ: Joi.string().required(),
        cityHQ: Joi.string().required(),
        addressHQ: Joi.string().required(),
        telephoneHQ: Joi.number(),
        faxHQ: Joi.number(),
        capitalCurrency: Joi.string().required(),
        capital: Joi.number().min(50000).required(),
        investorName: Joi.string().required(),
        investorType: Joi.string().required(),
        investorSex: Joi.string().required(),
        investorNationality: Joi.string().required(),
        investorIdentificationType: Joi.string().required(),
        investorIdentificationNumber: Joi.string().required(),
        investorBD: Joi.date().required(),
        investorAddress: Joi.string().required(),
        investorTelephone: Joi.string(),
        investorFax: Joi.string(),
        investorEmail: Joi.string(),
        managers: Joi.array().required()
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const newCompany = new Company(
		regulationLaw,
        legalCompanyForm,
        nameInArabic,
        nameInEnglish,
        governerateHQ,
        cityHQ,
        addressHQ,
        telephoneHQ,
        faxHQ,
        capitalCurrency,
        capital,
        investorName,
        investorType,
        investorSex,
        investorNationality,
        investorIdentificationType,
        investorIdentificationNumber,
        investorBD,
        investorAddress,
        investorTelephone,
        investorFax,
        investorEmail,
        managers
    );
    companies.push(newCompany);
	return res.json({ data: newCompany });
});


//Create SPC Company
router.post('/spc', (req, res) => {
	const regulationLaw = req.body.regulationLaw
    const legalCompanyForm = req.body.legalCompanyForm
    const nameInArabic = req.body.nameInArabic
    const nameInEnglish = req.body.nameInEnglish
    const governerateHQ = req.body.governerateHQ
    const cityHQ = req.body.cityHQ
    const addressHQ = req.body.addressHQ
    const telephoneHQ = req.body.telephoneHQ
    const faxHQ = req.body.faxHQ
    const capitalCurrency = req.body.capitalCurrency
    const capital = req.body.capital
    const investorName = req.body.investorName
    const investorSex = req.body.investorSex
    const investorNationality = req.body.investorNationality
    const investorIdentificationType = req.body.investorIdentificationType
    const investorIdentificationNumber = req.body.investorIdentificationNumber
    const investorBD = req.body.investorBD
    const investorAddress = req.body.investorAddress
    const investorTelephone = req.body.investorTelephone
    const investorFax = req.body.investorFax
    const investorEmail = req.body.investorEmail
    const array = ["ww"]

	const schema = {
		regulationLaw: Joi.required(),
        legalCompanyForm: Joi.required(),
        nameInArabic: Joi.string().required(),
        nameInEnglish: Joi.string(),
        governerateHQ: Joi.string().required(),
        cityHQ: Joi.string().required(),
        addressHQ: Joi.string().required(),
        telephoneHQ: Joi.number(),
        faxHQ: Joi.number(),
        capitalCurrency: Joi.string().required(),
        capital: Joi.number().min(50000).required(),
        investorName: Joi.string().required(),
        investorSex: Joi.string(),
        investorNationality: Joi.string().required(),
        investorIdentificationType: Joi.string().required(),
        investorIdentificationNumber: Joi.string().required(),
        investorBD: Joi.date().required(),
        investorAddress: Joi.string().required(),
        investorTelephone: Joi.string(),
        investorFax: Joi.string(),
        investorEmail: Joi.string(),
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const newCompany = new Company (
		regulationLaw,
        legalCompanyForm,
        nameInArabic,
        nameInEnglish,
        governerateHQ,
        cityHQ,
        addressHQ,
        telephoneHQ,
        faxHQ,
        capitalCurrency,
        capital,
        investorName,
        "",
        investorSex,
        investorNationality,
        investorIdentificationType,
        investorIdentificationNumber,
        investorBD,
        investorAddress,
        investorTelephone,
        investorFax,
        investorEmail
    );
    companies.push(newCompany);
    return res.json({ data: newCompany });
});

//Read All Company
router.get('/', (req, res) => 
res.json({ data: companies }));

//Read Specific Company 
router.get('/:id', (req, res) => {
const companyId = req.params.id
const company = companies.find(company => company.id === companyId)
res.send(company)});

//Update Company SSC
router.put('/ssc/:id', (req,res) =>{
    const companyid = req.params.id;
    const regulationLaw= req.body.regulationLaw;
    const legalCompanyForm=req.body.legalCompanyForm;
    const nameInArabic=req.body.nameInArabic;
    const nameInEnglish=req.body.nameInEnglish;
    const governerateHQ=req.body.governerateHQ;
    const cityHQ=req.body.cityHQ;
    const addressHQ=req.body.addressHQ;
    const telephoneHQ=req.body.telephoneHQ;
    const faxHQ=req.body.faxHQ;
    const capitalCurrency=req.body.capitalCurrency;
    const capital=req.body.capital;
    const investorName=req.body.investorName;
    const investorSex= req.body.investorSex;
    const investorType=req.body.investorType;
    const investorNationality= req.body.investorNationality;
    const investorIdentificationNumber= req.body.investorIdentificationNumber;
    const investorIdentificationType= req.body.investorIdentificationType;
    const investorBD= req.body.investorBD;
    const investorAddress= req.body.investorAddress;
    const investorTelephone = req.body.investorTelephone;
    const investorFax = req.body.investorFax;
    const investorEmail = req.body.investorEmail;
    const managers = req.body.managers;
    const companyd = companies.find(company => company.id === companyid)

    const schema = {
        nameInArabic: Joi.string(),
        nameInEnglish: Joi.string(),
        governerateHQ: Joi.string(),
        cityHQ: Joi.string(),
        addressHQ: Joi.string(),
        telephoneHQ: Joi.number(),
        faxHQ: Joi.number(),
        capitalCurrency: Joi.string(),
        capital: Joi.number().min(50000),
        investorName: Joi.string(),
        investorType: Joi.string(),
        investorSex: Joi.string(),
        investorNationality: Joi.string(),
        investorIdentificationType: Joi.string(),
        investorIdentificationNumber: Joi.string(),
        investorBD: Joi.date(),
        investorAddress: Joi.string(),
        investorTelephone: Joi.string(),
        investorFax: Joi.string(),
        investorEmail: Joi.string(),
        managers: Joi.array()
	}

    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    if(regulationLaw)
        companyd.regulationLaw = regulationLaw;
    if(legalCompanyForm)
        companyd.legalCompanyForm = legalCompanyForm;
    if(nameInArabic)
        companyd.nameInArabic = nameInArabic;
    if(nameInEnglish)
        companyd.nameInEnglish = nameInEnglish;
    if(governerateHQ)
        companyd.governerateHQ = governerateHQ;
    if(cityHQ)
        companyd.cityHQ = cityHQ;
    if(addressHQ)
        companyd.addressHQ = addressHQ;
    if(telephoneHQ)
        companyd.telephoneHQ = telephoneHQ;
    if(faxHQ)
        companyd.faxHQ = faxHQ;
    if(capitalCurrency)
        companyd.capitalCurrency = capitalCurrency;
    if(capital)
        companyd.capital = capital;
    if(investorName)
        companyd.investorName = investorName;
    if(investorType)
        companyd.investorType = investorType;
    if(investorSex)
        companyd.investorSex = investorSex;
    if(investorNationality)
        companyd.investorNationality = investorNationality;
    if(investorIdentificationNumber)
        companyd.investorIdentificationNumber = investorIdentificationNumber;
    if(investorIdentificationType)
        companyd.investorIdentificationType= investorIdentificationType
    if(investorBD)
        companyd.investorBD = investorBD;
    if(investorAddress)
        companyd.investorAddress = investorAddress;
    if(investorTelephone)
        companyd.investorTelephone = investorTelephone;
    if(investorFax)
        companyd.investorFax = investorFax;
    if(investorEmail)
        companyd.investorEmail = investorEmail;
    if(managers)
        companyd.managers = managers;
    res.send(companyd);
});

//Update Company SPC
router.put('/spc/:id', (req,res) =>{
    const companyid = req.params.id;
    const regulationLaw= req.body.regulationLaw;
    const legalCompanyForm=req.body.legalCompanyForm;
    const nameInArabic=req.body.nameInArabic;
    const nameInEnglish=req.body.nameInEnglish;
    const governerateHQ=req.body.governerateHQ;
    const cityHQ=req.body.cityHQ;
    const addressHQ=req.body.addressHQ;
    const telephoneHQ=req.body.telephoneHQ;
    const faxHQ=req.body.faxHQ;
    const capitalCurrency=req.body.capitalCurrency;
    const capital=req.body.capital;
    const investorName=req.body.investorName;
    const investorSex= req.body.investorSex;
    const investorNationality= req.body.investorNationality;
    const investorIdentificationNumber= req.body.investorIdentificationNumber;
    const investorIdentificationType= req.body.investorIdentificationType;
    const investorBD= req.body.investorBD;
    const investorAddress= req.body.investorAddress;
    const investorTelephone = req.body.investorTelephone;
    const investorFax = req.body.investorFax;
    const investorEmail = req.body.investorEmail;
    const companyd = companies.find(company => company.id === companyid)

    const schema = {
        nameInArabic: Joi.string(),
        nameInEnglish: Joi.string(),
        governerateHQ: Joi.string(),
        cityHQ: Joi.string(),
        addressHQ: Joi.string(),
        telephoneHQ: Joi.number(),
        faxHQ: Joi.number(),
        capitalCurrency: Joi.string(),
        capital: Joi.number().min(50000),
        investorName: Joi.string(),
        investorSex: Joi.string(),
        investorNationality: Joi.string(),
        investorIdentificationType: Joi.string(),
        investorIdentificationNumber: Joi.string(),
        investorBD: Joi.date(),
        investorAddress: Joi.string(),
        investorTelephone: Joi.string(),
        investorFax: Joi.string(),
        investorEmail: Joi.string(),
	}

    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    if(regulationLaw)
        companyd.regulationLaw = regulationLaw;
    if(legalCompanyForm)
        companyd.legalCompanyForm = legalCompanyForm;
    if(nameInArabic)
        companyd.nameInArabic = nameInArabic;
    if(nameInEnglish)
        companyd.nameInEnglish = nameInEnglish;
    if(governerateHQ)
        companyd.governerateHQ = governerateHQ;
    if(cityHQ)
        companyd.cityHQ = cityHQ;
    if(addressHQ)
        companyd.addressHQ = addressHQ;
    if(telephoneHQ)
        companyd.telephoneHQ = telephoneHQ;
    if(faxHQ)
        companyd.faxHQ = faxHQ;
    if(capitalCurrency)
        companyd.capitalCurrency = capitalCurrency;
    if(capital)
        companyd.capital = capital;
    if(investorName)
        companyd.investorName = investorName;
    if(investorSex)
        companyd.investorSex = investorSex;
    if(investorNationality)
        companyd.investorNationality = investorNationality;
    if(investorIdentificationNumber)
        companyd.investorIdentificationNumber = investorIdentificationNumber;
    if(investorIdentificationType)
        companyd.investorIdentificationType= investorIdentificationType
    if(investorBD)
        companyd.investorBD = investorBD;
    if(investorAddress)
        companyd.investorAddress = investorAddress;
    if(investorTelephone)
        companyd.investorTelephone = investorTelephone;
    if(investorFax)
        companyd.investorFax = investorFax;
    if(investorEmail)
        companyd.investorEmail = investorEmail;
    res.send(companies);
});

//Delete Company SSC
router.delete('/ssc/:id', (req, res) => {
    const companyid = req.params.id;
    const company = companies.find(company => company.id === companyid)
    const index = companies.indexOf(company)
    companies.splice(index,1)
    res.send(companies)
})

//Delete Company SPC
router.delete('/spc/:id', (req, res) => {
    const companyid = req.params.id;
    const company = companies.find(company => company.id === companyid)
    const index = companies.indexOf(company)
    companies.splice(index,1)
    res.send(companies)
})

module.exports = router;
