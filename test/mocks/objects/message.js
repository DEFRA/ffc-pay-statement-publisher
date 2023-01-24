const SOURCE = require('../../../app/constants/message-source')
const { CRM: TYPE } = require('../../../app/constants/message-types')

const EMAIL = require('../components/email')
const FRN = require('../components/frn')

module.exports = {
  CRM: {
    body: {
      email: EMAIL,
      frn: FRN,
      errorMessage: 'b'
    },
    source: SOURCE,
    type: TYPE
  }
}
