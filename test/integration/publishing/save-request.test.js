const db = require('../../../app/data')
const saveRequest = require('../../../app/publishing/save-request')
const { EMAIL } = require('../../../app/methods')
const MOCK_REFERENCE = 'c8363cba-2093-4447-8812-697c09820614'
let mockRequest

describe('save request', () => {
  beforeEach(async () => {
    mockRequest = JSON.parse(JSON.stringify(require('../../mocks/request')))
    jest.clearAllMocks()
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))
    await db.sequelize.truncate({ cascade: true })
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('saves one statement', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const statement = await db.statement.findAll()
    expect(statement.length).toBe(1)
  })

  test('saves statement with business name', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const statement = await db.statement.findOne()
    expect(statement.businessName).toBe(mockRequest.businessName)
  })

  test('saves statement with sbi', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const statement = await db.statement.findOne()
    expect(statement.sbi).toBe(mockRequest.sbi)
  })

  test('saves statement with frn', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const statement = await db.statement.findOne()
    expect(statement.frn).toBe(mockRequest.frn.toString())
  })

  test('saves statement with email', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const statement = await db.statement.findOne()
    expect(statement.email).toBe(mockRequest.email)
  })

  test('saves statement with filename', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const statement = await db.statement.findOne()
    expect(statement.filename).toBe(mockRequest.filename)
  })

  test('saves statement with address line 1', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const statement = await db.statement.findOne()
    expect(statement.addressLine1).toBe(mockRequest.address.line1)
  })

  test('saves statement with address line 2', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const statement = await db.statement.findOne()
    expect(statement.addressLine2).toBe(mockRequest.address.line2)
  })

  test('saves statement with address line 3', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const statement = await db.statement.findOne()
    expect(statement.addressLine3).toBe(mockRequest.address.line3)
  })

  test('saves statement with address line 4', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const statement = await db.statement.findOne()
    expect(statement.addressLine4).toBe(mockRequest.address.line4)
  })

  test('saves statement with address line 5', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const statement = await db.statement.findOne()
    expect(statement.addressLine5).toBe(mockRequest.address.line5)
  })

  test('saves statement with address postcode', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const statement = await db.statement.findOne()
    expect(statement.postcode).toBe(mockRequest.address.postcode)
  })

  test('saves one delivery', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const delivery = await db.delivery.findAll()
    expect(delivery.length).toBe(1)
  })

  test('saves delivery with statement id', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const statement = await db.statement.findOne()
    const delivery = await db.delivery.findOne()
    expect(delivery.statementId).toBe(statement.statementId)
  })

  test('saves delivery with email method', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const delivery = await db.delivery.findOne()
    expect(delivery.method).toBe(EMAIL)
  })

  test('saves delivery with requested date', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const delivery = await db.delivery.findOne()
    expect(delivery.requested).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('saves delivery with null completed date', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const delivery = await db.delivery.findOne()
    expect(delivery.completed).toBeNull()
  })

  test('saves delivery with reference if reference', async () => {
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const delivery = await db.delivery.findOne()
    expect(delivery.reference).toBe(MOCK_REFERENCE)
  })

  test('saves delivery with null reference if null reference', async () => {
    await saveRequest(mockRequest, null, EMAIL)
    const delivery = await db.delivery.findOne()
    expect(delivery.reference).toBeNull()
  })

  test('saves delivery with null reference if undefined reference', async () => {
    await saveRequest(mockRequest, undefined, EMAIL)
    const delivery = await db.delivery.findOne()
    expect(delivery.reference).toBeNull()
  })

  test('saves one failure if null email address', async () => {
    mockRequest.email = null
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const failure = await db.failure.findAll()
    expect(failure.length).toBe(1)
  })

  test('saves one failure if empty email address', async () => {
    mockRequest.email = ''
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const failure = await db.failure.findAll()
    expect(failure.length).toBe(1)
  })

  test('saves one failure if undefined email address', async () => {
    mockRequest.email = undefined
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const failure = await db.failure.findAll()
    expect(failure.length).toBe(1)
  })

  test('saves failure with deliveryId if no email', async () => {
    mockRequest.email = null
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const delivery = await db.delivery.findOne()
    const failure = await db.failure.findOne()
    expect(failure.deliveryId).toBe(delivery.deliveryId)
  })

  test('saves failure with no email reason if no email', async () => {
    mockRequest.email = null
    await saveRequest(mockRequest, MOCK_REFERENCE, EMAIL)
    const failure = await db.failure.findOne()
    expect(failure.reason).toBe('No email address provided')
  })
})
