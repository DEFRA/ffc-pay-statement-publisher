const createMessage = require('./create-message')
const validateMessage = require('./validate-message')

const getMessage = (message) => {
  return validateMessage(createMessage(message))
}

module.exports = getMessage
