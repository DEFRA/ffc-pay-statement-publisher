const { REJECTED } = require('../../constants/failure-reasons')
const { EMPTY, INVALID } = require('../../constants/crm-error-messages')

const mapCrmErrorMessage = (reason) => {
  return reason === REJECTED ? INVALID : EMPTY
}

module.exports = mapCrmErrorMessage
