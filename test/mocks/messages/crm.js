const { EMPTY, ERRONEOUS } = require('../../../app/constants/crm-error-messages')

const EMAIL = require('../components/email')
const FRN = require('../components/frn')

const BASE_MESSAGE = require('../objects/message')

const invalidMessage = {
  ...BASE_MESSAGE,
  body: {
    email: EMAIL,
    frn: FRN,
    errorMessage: ERRONEOUS
  }
}

const emptyMessage = {
  ...BASE_MESSAGE,
  body: {
    email: EMAIL,
    frn: FRN,
    errorMessage: EMPTY
  }
}

module.exports = {
  EMPTY: emptyMessage,
  INVALID: invalidMessage
}
