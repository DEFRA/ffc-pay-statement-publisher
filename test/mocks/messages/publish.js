const MARKETING_YEAR = require('../components/marketing-year')
const {
  LINE_1,
  LINE_2,
  LINE_3,
  LINE_4,
  LINE_5,
  POSTCODE
} = require('../components/address')
const EMAIL = require('../components/email')
const FRN = require('../components/frn')
const BUSINESS_NAME = require('../components/business-name')
const SBI = require('../components/sbi')

const { QUARTERLY: QUARTERLY_FREQUENCY } = require('../../../app/constants/frequencies')
const { SHORT_NAMES, LONG_NAMES } = require('../../../app/constants/scheme-names')

const MESSAGE_SOURCE = require('../../../app/constants/message-source')
const { STATEMENT: STATEMENT_TYPE, SCHEDULE: SCHEDULE_TYPE } = require('../../../app/constants/document-types')

const { STATEMENT: STATEMENT_FILENAME, SCHEDULE: SCHEDULE_FILENAME } = require('../components/filename')
const DOCUMENT_REFERENCE = require('../components/document-reference')

const BASE_MESSAGE = {
  body: {},
  type: null,
  source: MESSAGE_SOURCE
}

const STATEMENT_MESSAGE = {
  ...BASE_MESSAGE,
  body: {
    businessName: BUSINESS_NAME,
    sbi: Number(SBI),
    frn: Number(FRN),
    address: {
      line1: LINE_1,
      line2: LINE_2,
      line3: LINE_3,
      line4: LINE_4,
      line5: LINE_5,
      postcode: POSTCODE
    },
    email: EMAIL,
    filename: STATEMENT_FILENAME,
    scheme: {
      name: LONG_NAMES.SFI,
      shortName: SHORT_NAMES.SFI,
      year: String(MARKETING_YEAR),
      frequency: QUARTERLY_FREQUENCY
    },
    documentReference: DOCUMENT_REFERENCE
  },
  type: `uk.gov.pay.${STATEMENT_TYPE.id}.publish`
}

const SCHEDULE_MESSAGE = {
  ...BASE_MESSAGE,
  body: {
    businessName: BUSINESS_NAME,
    sbi: Number(SBI),
    frn: Number(FRN),
    address: {
      line1: LINE_1,
      line2: LINE_2,
      line3: LINE_3,
      line4: LINE_4,
      line5: LINE_5,
      postcode: POSTCODE
    },
    email: EMAIL,
    filename: SCHEDULE_FILENAME,
    scheme: {
      name: LONG_NAMES.SFI,
      shortName: SHORT_NAMES.SFI,
      year: String(MARKETING_YEAR),
      frequency: QUARTERLY_FREQUENCY
    },
    documentReference: DOCUMENT_REFERENCE
  },
  type: `uk.gov.pay.${SCHEDULE_TYPE.id}.publish`
}

module.exports = {
  STATEMENT_MESSAGE,
  SCHEDULE_MESSAGE
}
