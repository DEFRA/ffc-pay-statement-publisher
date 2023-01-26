const Joi = require('joi')

const email = require('../components/email')
const frn = require('../components/frn')
const errorMessage = require('../components/errorMessage')

module.exports = Joi.object({
  email: email,
  frn: frn,
  errorMessage: errorMessage
}).required()
  .messages({
    'object.base': 'CRM message must be an object.',
    'any.required': 'CRM message must be provided.',
    '*': 'The CRM message provided is invalid.'
  })
