const { EMAIL } = require('../methods')
const publish = require('./publish')
const saveRequest = require('./save-request')

const publishStatement = async (request) => {
  const personalisation = { schemeName: request.scheme.name, schemeShortName: request.scheme.shortName, schemeYear: request.scheme.year, schemeFrequency: request.scheme.frequency, businessName: request.businessName }
  const response = await publish(request.email, request.filename, personalisation)
  await saveRequest(request, response.data.id, EMAIL)
}

module.exports = publishStatement
