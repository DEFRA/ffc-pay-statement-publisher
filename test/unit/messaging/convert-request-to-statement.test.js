const convertRequestToStatement = require('../../../app/messaging/convert-request-to-statement')
let mockRequest

describe('convert request to statement', () => {
  beforeEach(() => {
    mockRequest = JSON.parse(JSON.stringify(require('../../mocks/request')))
  })

  test('retains business name', () => {
    const result = convertRequestToStatement(mockRequest)
    expect(result.businessName).toBe(mockRequest.businessName)
  })

  test('retains sbi', () => {
    const result = convertRequestToStatement(mockRequest)
    expect(result.sbi).toBe(mockRequest.sbi)
  })

  test('retains frn', () => {
    const result = convertRequestToStatement(mockRequest)
    expect(result.frn).toBe(mockRequest.frn)
  })

  test('retains email', () => {
    const result = convertRequestToStatement(mockRequest)
    expect(result.email).toBe(mockRequest.email)
  })

  test('retains filename', () => {
    const result = convertRequestToStatement(mockRequest)
    expect(result.filename).toBe(mockRequest.filename)
  })

  test('maps address line 1', () => {
    const result = convertRequestToStatement(mockRequest)
    expect(result.addressLine1).toBe(mockRequest.address.line1)
  })

  test('maps address line 2', () => {
    const result = convertRequestToStatement(mockRequest)
    expect(result.addressLine2).toBe(mockRequest.address.line2)
  })

  test('maps address line 3', () => {
    const result = convertRequestToStatement(mockRequest)
    expect(result.addressLine3).toBe(mockRequest.address.line3)
  })

  test('maps address line 4', () => {
    const result = convertRequestToStatement(mockRequest)
    expect(result.addressLine4).toBe(mockRequest.address.line4)
  })

  test('maps address line 5', () => {
    const result = convertRequestToStatement(mockRequest)
    expect(result.addressLine5).toBe(mockRequest.address.line5)
  })

  test('maps postcode', () => {
    const result = convertRequestToStatement(mockRequest)
    expect(result.postcode).toBe(mockRequest.address.postcode)
  })
})
