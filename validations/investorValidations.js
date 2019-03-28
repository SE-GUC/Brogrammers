<<<<<<< HEAD
const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().min(3).required(),
      type: Joi.string().length(3).required(),
      gender: Joi.string().valid('male', 'female').required(),
      nationality: Joi.string().max(25).required(),
      idType: Joi.string().valid('Passport', 'National ID').required(),
      idNumber: Joi.String().required(),
      dob: Joi.date().required(),
      address: Joi.string().required(),
      telephone: Joi.number().required(),
      fax: Joi.number(),
      mail: Joi.string().required(),
      password: Joi.string().required()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string().min(3),
      type: Joi.string().length(3),
      gender: Joi.string().valid('male', 'female'),
      nationality: Joi.string().max(25),
      idType: Joi.string().valid('Passport', 'National ID'),
      idNumber: Joi.number(),
      dob: Joi.date(),
      address: Joi.string(),
      telephone: Joi.number(),
      fax: Joi.number(),
      mail: Joi.string(),
      password: Joi.string()
    }

    return Joi.validate(request, updateSchema)
  }
}
=======
const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().min(3).required(),
      type: Joi.string().length(3).required(),
      gender: Joi.string().valid('male', 'female').required(),
      nationality: Joi.string().max(25).required(),
      idType: Joi.string().valid('Passport', 'National ID').required(),
      idNumber: Joi.String().required(),
      dob: Joi.date().required(),
      address: Joi.string().required(),
      telephone: Joi.number().required(),
      fax: Joi.number(),
      mail: Joi.string().required(),
      password: Joi.string().required()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string().min(3),
      type: Joi.string().length(3),
      gender: Joi.string().valid('male', 'female'),
      nationality: Joi.string().max(25),
      idType: Joi.string().valid('Passport', 'National ID'),
      idNumber: Joi.number(),
      dob: Joi.date(),
      address: Joi.string(),
      telephone: Joi.number(),
      fax: Joi.number(),
      mail: Joi.string(),
      password: Joi.string()
    }

    return Joi.validate(request, updateSchema)
  }
}
>>>>>>> 32f7c2bcaf6585dc3dd527dcb4efe76752e6c59a
