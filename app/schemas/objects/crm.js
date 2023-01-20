const Joi = require('joi')

const emailAddress = require('../components/emailAddress')
const frn = require('../components/frn')
const errorMessage = require('../components/errorMessage')

module.exports = Joi.object({
  ...emailAddress,
  ...frn,
  ...errorMessage
}).required()
