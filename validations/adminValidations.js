const Joi = require('joi')

module.exports = {
  updateValidation: request => {
    const updateSchema = {
      email: Joi.string(),
      phone: Joi.number(),
      password: Joi.string().min(8).max(20),
      gender: Joi.string().valid('Male', 'Female')
    }
    return Joi.validate(request, updateSchema)
  },
  createValidation: request => {
    const createSchema = {
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.number().required(),
      birthDate: Joi.string().required(),
      joinDate: Joi.string(),
      password: Joi.string().min(8).max(20).required(),
      gender: Joi.string().valid('Male', 'Female').required()
    }
    return Joi.validate(request, createSchema)
  }

}
