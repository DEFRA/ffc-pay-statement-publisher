const EMAIL = require('./components/email')

const mockScheme = {
  schemeName: 'Sustainable Farming Incentive',
  schemeShortName: 'SFI',
  schemeYear: '2022',
  schemeFrequency: 'Quarterly'
}

const mockStatement1 = {
  statementId: 1,
  businessName: 'Business 1',
  addressLine1: 'Line1',
  addressLine2: 'Line2',
  addressLine3: 'Line 3',
  addressLine4: 'Line4',
  addressLine5: 'Line5',
  postcode: 'SW1 1AA',
  filename: 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf',
  sbi: 123456789,
  frn: 1234567890,
  email: EMAIL,
  received: new Date(2022, 7, 5, 15, 30, 10, 120),
  ...mockScheme
}

const mockStatement2 = {
  statementId: 2,
  businessName: 'Business 2',
  addressLine1: 'Line1',
  addressLine2: 'Line2',
  addressLine3: 'Line 3',
  addressLine4: 'Line4',
  addressLine5: 'Line5',
  postcode: 'SW2 2AA',
  filename: 'FFC_PaymentStatement_SFI_2022_1234567898_2022080515301012.pdf',
  sbi: 123456788,
  frn: 1234567898,
  email: 'farmer2@farm.com',
  received: new Date(2022, 7, 5, 15, 30, 10, 120),
  ...mockScheme
}

module.exports = {
  mockStatement1,
  mockStatement2
}
