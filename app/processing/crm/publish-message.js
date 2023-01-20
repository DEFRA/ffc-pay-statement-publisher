const config = require('../../config')

const { CRM: CRM_MESSAGE_TYPE } = require('../../constants/message-type')
const SOURCE = require('../../constants/message-source')

const sendMessage = require('../../messaging/send-message')
const getMessage = require('./get-message')

const publishMessage = async (message) => {
  await sendMessage(getMessage(message), CRM_MESSAGE_TYPE, { ...config.crmTopic, source: SOURCE })
}

module.exports = publishMessage
