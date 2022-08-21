const { EMAIL } = require('../methods')
const publish = require('./publish')
const saveRequest = require('./save-request')

const publishStatement = async (request) => {
  const response = await publish(request.email, request.filename)
  await saveRequest(request, response.data.id, EMAIL)
}

module.exports = publishStatement
