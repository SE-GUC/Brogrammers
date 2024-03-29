const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {

      firstName: Joi.string().min(1).required(),
      middleName: Joi.string().min(1).required(),
      lastName: Joi.string().min(1).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      mobileNumber: Joi.string().min(6).required(),
      socialSecurityNumber: Joi.string().min(14).max(14).required(),
      salary: Joi.number().required(),
      birthDate: Joi.date().required(),
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
      mobileNumber: Joi.string().min(6),
      socialSecurityNumber: Joi.string().min(14).max(14),
      salary: Joi.number(),
      birthDate: Joi.date(),
      yearsOfExperience: Joi.number()
    }

    return Joi.validate(request, updateSchema)
  }
}
