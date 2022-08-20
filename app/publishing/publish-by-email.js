const config = require('../config')
const { NotifyClient } = require('notifications-node-client')

const publishByEmail = async (request, file) => {
  const notifyClient = new NotifyClient(config.notifyApiKey)
  return notifyClient.sendEmail(config.notifyEmailTemplateKey, request.email, {
    personalisation: {
      link_to_file: notifyClient.prepareUpload(file)
    }
  })
}

module.exports = publishByEmail