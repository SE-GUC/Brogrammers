const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            firstName: Joi.string().min(3).required(),
            middleName: Joi.string().min(3).required(),
            lastName: Joi.string().min(3).required(),

            email: Joi.string().email().required(),
            password: Joi.string().required(),
            mobile_number: Joi.number().min(6).required(),
            Social_Security_Number: Joi.number().min(5).required(),
            salary: Joi.number().required(),
            birth_Date: Joi.date().required(),
            yearsOfExperience: Joi.number().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            firstName: Joi.string().min(3).required(),
            middleName: Joi.string().min(3).required(),
            lastName: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            mobile_number: Joi.number().min(10).required(),
            Social_Security_Number: Joi.number().min(5).required(),
            salary: Joi.number().required(),
            birth_Date: Joi.date().required(),
            yearsOfExperience: Joi.number().required()
        }

        return Joi.validate(request, updateSchema)
    }, 
}