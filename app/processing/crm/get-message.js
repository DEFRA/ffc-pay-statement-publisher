const mapMessage = require('./map-message')
const validateMessage = require('./validate-message')

const getMessage = (message) => {
  return validateMessage(mapMessage(message))
}

module.exports = getMessage
