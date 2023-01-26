const { EMPTY } = require('../../constants/failure-reasons')
const mapErrorMessage = require('./map-error-message')

const mapMessage = (email, frn, reason) => {
  return {
    email,
    errorMessage: mapErrorMessage(email === '' ? EMPTY : reason),
    frn
  }
}

module.exports = mapMessage
