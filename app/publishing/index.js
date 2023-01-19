const { EMAIL } = require('../constants/methods')
const getPersonalisation = require('./get-personalisation')
const publish = require('./publish')
const saveRequest = require('./save-request')
const validateEmail = require('./validate-email')

const publishStatement = async (request) => {
  let response
  if (validateEmail(request.email)) {
    const personalisation = getPersonalisation(request.scheme.name, request.scheme.shortName, request.scheme.year, request.scheme.frequency, request.businessName)
    response = await publish(request.email, request.filename, personalisation)
    console.log(`Statement published: ${request.filename}`)
  }
  await saveRequest(request, response?.data.id, EMAIL)
}

module.exports = publishStatement
