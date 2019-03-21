const Joi = require('joi')

module.exports = {
    createValidationSSC: request => {
        const createSchemaSSC= {
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

        return Joi.validate(request, createSchemaSSC)
    },
    createValidationSPC: request => {
        const createSchemaSPC= {
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
        investorEmail: Joi.string()
        }

        return Joi.validate(request, createSchemaSPC)
    },

    updateValidationSSC: request => {
        const updateSchemaSSC= {
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

        return Joi.validate(request, updateSchemaSSC)
    }, 
    updateValidationSPC: request => {
        const updateSchemaSPC= {
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

        return Joi.validate(request, updateSchemaSPC)
    }
}