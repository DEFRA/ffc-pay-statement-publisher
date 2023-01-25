const ERROR_MESSAGE = require('../../../app/constants/crm-error-messages').ERRONEOUS

const EMAIL = require('../components/email')
const FRN = require('../components/frn')

module.exports = {
  email: EMAIL,
  errorMessage: ERROR_MESSAGE,
  frn: FRN
}
