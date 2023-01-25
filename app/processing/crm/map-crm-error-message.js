const { REJECTED } = require('../../constants/failure-reasons')
const { EMPTY, ERRONEOUS } = require('../../constants/crm-error-messages')

const mapCrmErrorMessage = (reason) => {
  return reason === REJECTED ? ERRONEOUS : EMPTY
}

module.exports = mapCrmErrorMessage
