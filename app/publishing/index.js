const { EMAIL } = require('../methods')
const { getFile } = require('../storage')
const publishByEmail = require('./publish-by-email')
const saveRequest = require('./save-request')

const publishStatement = async (statement) => {
  const file = await getFile(statement.filename)
  const response = await publishByEmail(statement, file)
  await saveRequest(statement, response.data.id, EMAIL)
}

module.exports = publishStatement
