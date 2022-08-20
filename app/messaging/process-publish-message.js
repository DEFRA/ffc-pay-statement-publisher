const util = require('util')
const { VALIDATION } = require('../errors')
const publishStatement = require('../publish')
const validateRequest = require('./validate-request')

const processPublishMessage = async (message, receiver) => {
  try {
    const publishRequest = message.body
    console.log('Statement publishing request received:', util.inspect(publishRequest, false, null, true))
    validateRequest(publishRequest)
    await publishStatement(publishRequest)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to publish statement:', err)
    if (err.category === VALIDATION) {
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = processPublishMessage
