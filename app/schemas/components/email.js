const Joi = require('joi')

module.exports = {
  email: Joi.string().email().required()
    .messages({
      'any.required': 'The statement cannot be emailed as no email address was provided.',
      'string.empty': 'The statement cannot be emailed as no email address was provided.',
      'string.email': 'We failed to send the statement because the email address provided was invalid.',
      '*': 'We failed to send the statement because the email address provided was invalid.'
    })
}
