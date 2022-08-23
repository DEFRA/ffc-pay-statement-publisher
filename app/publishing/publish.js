const retry = require('../retry')
const { getFile } = require('../storage')
const publishByEmail = require('./publish-by-email')

const publish = async (email, filename) => {
  const file = await retry(() => getFile(filename))
  return publishByEmail(email, file)
}

module.exports = publish
