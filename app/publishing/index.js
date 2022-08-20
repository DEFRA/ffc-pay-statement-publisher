const { EMAIL } = require('../methods')
const { getFile } = require('../storage')
const publishByEmail = require('./publish-by-email')
const saveDelivery = require('./save-delivery')

const publishStatement = async (request) => {
  const file = await getFile(request.filename)
  const response = await publishByEmail(request, file)
  await saveDelivery(request, response.data.id, EMAIL)
}

module.exports = publishStatement
