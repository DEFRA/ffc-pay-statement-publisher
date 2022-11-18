const { EMAIL } = require('../methods')
const getPersonalisation = require('./get-personalisation')
const publish = require('./publish')
const saveRequest = require('./save-request')

const publishStatement = async (request) => {
  let response
  if (request.email) {
    const personalisation = getPersonalisation(request.scheme.name, request.scheme.shortName, request.scheme.year, request.scheme.frequency, request.businessName)
    response = await publish(request.email, request.filename, personalisation)
    console.log(`Statement published: ${request.filename}`)
  }
  await saveRequest(request, response?.data.id, EMAIL)
}

module.exports = publishStatement
