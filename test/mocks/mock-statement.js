const mockStatement1 = {
  statementId: 1,
  businessName: 'Business 1',
  postcode: 'SW1 1AA',
  filename: 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf',
  sbi: 123456789,
  frn: 1234567890,
  email: 'farmer1@farm.com',
  received: new Date(2022, 7, 5, 15, 30, 10, 120)
}

const mockStatement2 = {
  statementId: 2,
  businessName: 'Business 2',
  postcode: 'SW2 2AA',
  filename: 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf',
  sbi: 123456788,
  frn: 1234567898,
  email: 'farmer2@farm.com',
  received: new Date(2022, 7, 5, 15, 30, 10, 120)
}

module.exports = {
  mockStatement1,
  mockStatement2
}
