const ffcMessaging = require('ffc-messaging')

const createMessage = require('./create-message')

const sendMessage = async (body, type, config) => {
  const message = createMessage(body, type)
  const sender = new ffcMessaging.MessageSender(config)
  await sender.sendMessage(message)
  await sender.closeConnection()
}

module.exports = sendMessage
