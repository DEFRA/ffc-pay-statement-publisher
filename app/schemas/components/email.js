const Joi = require('joi')

module.exports = {
  email: Joi.string().email().required()
    .messages({
      'string.base': 'Email must be a string.',
      'string.empty': 'Email cannot be empty.',
      'string.email': 'The email provided is not valid.',
      'any.required': 'Email must be provided.',
      '*': 'The email provided is invalid.'
    })
}
