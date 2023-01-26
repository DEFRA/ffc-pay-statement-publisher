const { EMPTY, ERRONEOUS } = require('../../../app/constants/crm-error-messages')

const EMAIL = require('../components/email')
const FRN = require('../components/frn')

const BASE_MESSAGE = require('../objects/message')

const emptyMappedMessage = {
  email: EMAIL,
  frn: FRN,
  errorMessage: EMPTY
}

const emptyMessage = {
  ...BASE_MESSAGE,
  body: emptyMappedMessage
}

const invalidMappedMessage = {
  email: EMAIL,
  frn: FRN,
  errorMessage: ERRONEOUS
}

const invalidMessage = {
  ...BASE_MESSAGE,
  body: invalidMappedMessage
}

module.exports = {
  EMPTY_MAPPED: emptyMappedMessage,
  EMPTY: emptyMessage,
  INVALID_MAPPED: invalidMappedMessage,
  INVALID: invalidMessage
}
