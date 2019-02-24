// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const Company = require('../../models/Company');
const Manager = require('../../models/Manager');

const companies = [
	new Company('a', 'b','ش','sh','bor','al','alll','012','aaa',100000,'ass','lll','lll','kk','lnl','kkl','2019-09-08','lo','ooo','899','kh',['ww','2r'])
];

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
        investorSex: Joi.string(),
        investorNationality: Joi.string().required(),
        investorIdentificationType: Joi.string().required(),
        investorIdentificationNumber: Joi.string().required(),
        investorBD: Joi.date().required(),
        investorAddress: Joi.string().required(),
        investorTelephone: Joi.string(),
        investorFax: Joi.string(),
        investorEmail: Joi.string(),
        managers: Joi.array()
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
		//id: uuid.v4()
    );
    companies.push(newCompany);
	return res.json({ data: newCompany });
});



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

	const newCompany = {
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
        investorSex,
        investorNationality,
        investorIdentificationType,
        investorIdentificationNumber,
        investorBD,
        investorAddress,
        investorTelephone,
        investorFax,
        investorEmail,
		id: uuid.v4()
	};
    return res.json({ data: newCompany });
    companies.push(newCompany);
});

router.get('/', (req, res) => 
res.json({ data: companies }));


router.get('/:id', (req, res) => {
const companyId = req.params.id
const company = companies.find(company => company.id === companyId)
res.send(company)});

module.exports = router;
