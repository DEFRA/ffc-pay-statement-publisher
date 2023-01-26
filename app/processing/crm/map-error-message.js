const { INVALID, REJECTED } = require('../../constants/failure-reasons')
const { EMPTY, ERRONEOUS } = require('../../constants/crm-error-messages')

const mapErrorMessage = (reason) => {
  switch (reason) {
    case INVALID:
      return EMPTY
    case REJECTED:
      return ERRONEOUS
    default:
      return ''
  }
}

module.exports = mapErrorMessage
