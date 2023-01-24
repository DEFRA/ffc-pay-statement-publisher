const SOURCE = require('../../../app/constants/message-source')
const { CRM: TYPE } = require('../../../app/constants/message-types')
const { EMPTY, INVALID } = require('../../../app/constants/crm-error-messages')

const EMAIL = require('../components/email')
const FRN = require('../components/frn')

const baseMessage = {
  source: SOURCE,
  type: TYPE
}

const invalidMessage = {
  ...baseMessage,
  body: {
    email: EMAIL,
    frn: FRN,
    errorMessage: INVALID
  }
}

const emptyMessage = {
  ...baseMessage,
  body: {
    email: EMAIL,
    frn: FRN,
    errorMessage: EMPTY
  }
}

module.exports = {
  CRM: {
    EMPTY: emptyMessage,
    INVALID: invalidMessage
  }
}
