const BUSINESS_NAME = require('../components/business-name')
const SBI = require('../components/sbi')
const FRN = require('../components/frn')
const EMAIL = require('../components/email')

const DOCUMENT_REFERENCE = require('./components/document-reference')
const {
  LINE_1,
  LINE_2,
  LINE_3,
  CITY,
  COUNTY,
  POSTCODE
} = require('./components/address')
const AGREEMENT_NUMBER = require('../components/agreement-number')
const { Q4: FREQUENCY_QUARTERLY } = require('../../app/constants/schedules').NAMES
const { SFI: SFI_LONG_SCHEME_NAME } = require('../../app/constants/scheme-names').LONG_NAMES
const { SFI: SFI_SHORT_SCHEME_NAME } = require('../../app/constants/scheme-names').SHORT_NAMES
const MARKETING_YEAR = require('../components/marketing-year')

module.exports = {
  businessName: BUSINESS_NAME,
  sbi: Number(SBI),
  frn: Number(FRN),
  email: EMAIL,
  filename: 'FFC_PaymentSchedule_SFI_2022_1234567890_2022080515301012.pdf',
  documentReference: DOCUMENT_REFERENCE,
  address: {
    line1: LINE_1,
    line2: LINE_2,
    line3: LINE_3,
    line4: CITY,
    line5: COUNTY,
    postcode: POSTCODE
  },
  scheme: {
    agreementNumber: String(AGREEMENT_NUMBER),
    frequency: FREQUENCY_QUARTERLY,
    name: SFI_LONG_SCHEME_NAME,
    shortName: SFI_SHORT_SCHEME_NAME,
    year: String(MARKETING_YEAR)
  }
}
