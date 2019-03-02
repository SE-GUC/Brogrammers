const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            firstName: Joi.string().min(1).required(),
            middleName: Joi.string().min(1).required(),
            lastName: Joi.string().min(1).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            mobile_number: Joi.string().min(6).required(),
            Social_Security_Number: Joi.string().min(14).max(14).required(),
            salary: Joi.number().required(),
            birth_Date: Joi.date().required(),
            yearsOfExperience: Joi.number().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            firstName: Joi.string().min(1),
            middleName: Joi.string().min(1),
            lastName: Joi.string().min(1),
            email: Joi.string().email(),
            password: Joi.string().min(8),
            mobile_number: Joi.string().min(6),
            Social_Security_Number: Joi.string().min(14).max(14),
            salary: Joi.number(),
            birth_Date: Joi.date(),
            yearsOfExperience: Joi.number()
        }

        return Joi.validate(request, updateSchema)
    }, 
}
