const { getFile } = require('../storage')
const publishByEmail = require('./publish-by-email')

const publish = async (email, filename) => {
  const file = await getFile(filename)
  return publishByEmail(email, file)
}

module.exports = publish
