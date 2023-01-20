const Joi = require('joi')

const email = require('../components/email')
const frn = require('../components/frn')
const errorMessage = require('../components/errorMessage')

module.exports = Joi.object({
  ...email,
  ...frn,
  ...errorMessage
}).required()
