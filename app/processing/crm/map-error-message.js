const { EMPTY, INVALID, REJECTED } = require('../../constants/failure-reasons')
const { EMPTY: EMPTY_ERROR, ERRONEOUS } = require('../../constants/crm-error-messages')

const mapErrorMessage = (reason) => {
  switch (reason) {
    case EMPTY:
      return EMPTY_ERROR
    case INVALID:
      return ERRONEOUS
    case REJECTED:
      return ERRONEOUS
    default:
      return ''
  }
}

module.exports = mapErrorMessage
