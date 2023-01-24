const mapCrmErrorMessage = require('./map-crm-error-message')

const mapMessage = (message) => {
  return {
    email: message?.email,
    errorMessage: mapCrmErrorMessage('Inbox full or rejected as spam'),
    frn: message?.frn
  }
}

module.exports = mapMessage
