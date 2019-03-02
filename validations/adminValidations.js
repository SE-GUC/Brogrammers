const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone :Joi.number().required(),
            gender: Joi.string(),
            birthDate: Joi.Date(),
            joinDate: Joi.Date(),
            username: Joi.string().required(),
            password: Joi.string().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name: Joi.string(),
            email: Joi.string(),
            phone :Joi.number(),
            gender: Joi.string(),
            birthDate: Joi.Date(),
            joinDate: Joi.Date(),
            username: Joi.string(),
            password: Joi.string()
        }

        return Joi.validate(request, updateSchema)
    }, 
}