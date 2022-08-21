const util = require('util')
const { VALIDATION } = require('../errors')
const publishStatement = require('../publishing')
const convertRequestToStatement = require('./convert-request-to-statement')
const validateRequest = require('./validate-request')

const processPublishMessage = async (message, receiver) => {
  try {
    const publishRequest = message.body
    console.log('Statement publishing request received:', util.inspect(publishRequest, false, null, true))
    validateRequest(publishRequest)
    const statement = convertRequestToStatement(publishRequest)
    await publishStatement(statement)
    await receiver.completeMessage(message)
    console.log(`Statement published: ${publishRequest.filename}`)
  } catch (err) {
    console.error('Unable to publish statement:', err)
    if (err.category === VALIDATION) {
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = processPublishMessage
