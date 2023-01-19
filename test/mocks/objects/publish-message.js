const _2022 = require('../components/marketing-year')
const ADDRESS = require('../components/address')
const EMAIL_ADDRESS = require('../components/email-address')
const FILENAME = require('../components/filename')
const FRN = require('../components/frn')
const ORGANISATION_NAME = require('../components/organisation-name')
const SBI = require('../components/sbi')

const { QUARTERLY: QUARTERLY_FREQUENCY } = require('../../../app/constants/frequencies')
const { SHORT_NAMES, LONG_NAMES } = require('../../../app/constants/scheme-names')

module.exports = {
  filename: FILENAME,
  businessName: ORGANISATION_NAME,
  frn: FRN,
  sbi: SBI,
  email: EMAIL_ADDRESS,
  address: ADDRESS,
  scheme: {
    name: LONG_NAMES.SFI,
    shortName: SHORT_NAMES.SFI,
    year: _2022,
    frequency: QUARTERLY_FREQUENCY
  }
}
