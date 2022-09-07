const { EMAIL } = require('../methods')
const getPersonalisation = require('./get-personalisation')
const publish = require('./publish')
const saveRequest = require('./save-request')

const publishStatement = async (request) => {
  const personalisation = getPersonalisation(request.scheme.name, request.scheme.shortName, request.scheme.year, request.scheme.frequency, request.businessName)
  const response = await publish(request.email, request.filename, personalisation)
  await saveRequest(request, response.data.id, EMAIL)
}

module.exports = publishStatement
