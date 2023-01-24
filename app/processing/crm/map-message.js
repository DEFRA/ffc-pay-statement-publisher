const mapCrmErrorMessage = require('./map-crm-error-message')

const mapMessage = (email, frn, reason) => {
  return {
    email,
    errorMessage: mapCrmErrorMessage(reason),
    frn
  }
}

module.exports = mapMessage
