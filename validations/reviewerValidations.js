const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      ssn: Joi.number().required(),
      name: Joi.string().required(),
      gender: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.number().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      yearsOfExperience: Joi.number().required(),
      age: Joi.number().required(),
      birth: Joi.string().required(),
      task: Joi.number().required()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      ssn: Joi.number(),
      name: Joi.string(),
      gender: Joi.string(),
      address: Joi.string(),
      phone: Joi.number(),
      email: Joi.string(),
      password: Joi.string(),
      yearsOfExperience: Joi.number(),
      age: Joi.number(),
      birth: Joi.string(),
      task: Joi.number()
    }

    return Joi.validate(request, updateSchema)
  }
}
