const util = require('util')

const processPublishMessage = async (message, receiver) => {
  try {
    const publishRequest = message.body
    console.log('Statement publishing request received:', util.inspect(publishRequest, false, null, true))
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process statement:', err)
  }
}

module.exports = processPublishMessage
