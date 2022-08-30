const retry = require('../retry')
const { getFile } = require('../storage')
const publishByEmail = require('./publish-by-email')

const publish = async (request, filename) => {
  const file = await retry(() => getFile(filename))
  return publishByEmail(request, file)
}

module.exports = publish
