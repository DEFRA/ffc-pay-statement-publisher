const Joi = require('joi')

const { TEMPORARY, PERMANENT } = require('../../constants/notify-simulation-email-addresses')

module.exports = Joi.alternatives().try(
  Joi.string().email(),
  Joi.string().valid(TEMPORARY, PERMANENT)
).required()
  .messages({
    // 'string.base': 'Email must be a string.',
    // 'string.empty': 'Email cannot be empty.',
    // 'string.email': 'The email provided is not valid.',
    'any.required': 'Email must be provided.',
    '*': 'The email provided is invalid.'
  })
