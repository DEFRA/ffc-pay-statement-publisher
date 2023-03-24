const config = require('../config')
const { NotifyClient } = require('notifications-node-client')

const util = require('util')

const publishByEmail = async (email, file, personalisation) => {
  const notifyClient = new NotifyClient(config.notifyApiKey)
  const a = notifyClient.prepareUpload(file, { confirmEmailBeforeDownload: true })
  const b = notifyClient.sendEmail(config.notifyEmailTemplateKey, email, {
    personalisation: {
      link_to_file: a,
      ...personalisation
    }
  })
  console.log(util.inspect(b, false, null, true))
  console.log(Object.keys(b))
  console.log(Object.values(b))
  return b
}

module.exports = publishByEmail
