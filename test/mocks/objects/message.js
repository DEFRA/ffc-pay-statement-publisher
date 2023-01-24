const SOURCE = require('../../../app/constants/message-source')
const { CRM: TYPE } = require('../../../app/constants/message-types')
const { INVALID } = require('../../../app/constants/crm-error-messages')

const EMAIL = require('../components/email')
const FRN = require('../components/frn')

module.exports = {
  CRM: {
    body: {
      email: EMAIL,
      frn: FRN,
      errorMessage: INVALID
    },
    source: SOURCE,
    type: TYPE
  }
}
