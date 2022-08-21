let mockSendEmail
const MOCK_PREPARED_FILE = 'mock-prepared-file'
let mockPrepareUpload
jest.mock('notifications-node-client', () => {
  return {
    NotifyClient: jest.fn().mockImplementation(() => {
      return {
        sendEmail: mockSendEmail,
        prepareUpload: mockPrepareUpload
      }
    })
  }
})
jest.mock('ffc-messaging')
const { BlobServiceClient } = require('@azure/storage-blob')
const config = require('../../../app/config/storage')
const db = require('../../../app/data')
const updateDeliveryFromResponse = require('../../../app/monitoring/update-delivery-from-response')
const path = require('path')
const { DELIVERED, SENDING, CREATED, TEMPORARY_FAILURE, PERMANENT_FAILURE, TECHNICAL_FAILURE } = require('../../../app/statuses')
const { REJECTED, INVALID } = require('../../../app/failure-reasons')

const FILE_NAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'
const TEST_FILE = path.resolve(__dirname, '../../files/test.pdf')

let blobServiceClient
let container

let mockStatement1
let mockDelivery1

describe('update delivery from response', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))
    blobServiceClient = BlobServiceClient.fromConnectionString(config.connectionStr)
    container = blobServiceClient.getContainerClient(config.container)
    await container.deleteIfExists()
    await container.createIfNotExists()
    const blockBlobClient = container.getBlockBlobClient(`${config.folder}/${FILE_NAME}`)
    await blockBlobClient.uploadFile(TEST_FILE)

    mockStatement1 = JSON.parse(JSON.stringify(require('../../mocks/statement').mockStatement1))
    mockDelivery1 = JSON.parse(JSON.stringify(require('../../mocks/delivery').mockDelivery1))

    await db.sequelize.truncate({ cascade: true })
    await db.statement.bulkCreate([mockStatement1])
    await db.delivery.bulkCreate([mockDelivery1])

    mockSendEmail = jest.fn().mockResolvedValue({ data: { id: mockDelivery1.reference } })
    mockPrepareUpload = jest.fn().mockReturnValue(MOCK_PREPARED_FILE)
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('should complete delivery if status delivered', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: DELIVERED } })
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should not complete delivery if status sending', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: SENDING } })
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toBeNull()
  })

  test('should not complete delivery if status created', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: CREATED } })
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toBeNull()
  })

  test('should complete delivery if status temporary failure', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: TEMPORARY_FAILURE } })
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should create failure if status temporary failure', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: TEMPORARY_FAILURE } })
    const failure = await db.failure.findOne({ where: { deliveryId: 1 } })
    expect(failure).not.toBeNull()
  })

  test('should create failure with reason if status temporary failure', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: TEMPORARY_FAILURE } })
    const failure = await db.failure.findOne({ where: { deliveryId: 1 } })
    expect(failure.reason).toBe(REJECTED)
  })

  test('should create failure with date failed if status temporary failure', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: TEMPORARY_FAILURE } })
    const failure = await db.failure.findOne({ where: { deliveryId: 1 } })
    expect(failure.failed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should complete delivery if status permanent failure', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: PERMANENT_FAILURE } })
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should create failure if status permanent failure', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: PERMANENT_FAILURE } })
    const failure = await db.failure.findOne({ where: { deliveryId: 1 } })
    expect(failure).not.toBeNull()
  })

  test('should create failure with reason if status permanent failure', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: PERMANENT_FAILURE } })
    const failure = await db.failure.findOne({ where: { deliveryId: 1 } })
    expect(failure.reason).toBe(INVALID)
  })

  test('should create failure with date failed if status permanent failure', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: PERMANENT_FAILURE } })
    const failure = await db.failure.findOne({ where: { deliveryId: 1 } })
    expect(failure.failed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should complete delivery if status technical failure', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: TECHNICAL_FAILURE } })
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should create new delivery if status technical failure', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: TECHNICAL_FAILURE } })
    const deliveries = await db.delivery.findAll({ where: { statementId: 1 } })
    expect(deliveries.length).toBe(2)
  })

  test('should create new delivery with requested date if status technical failure', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: TECHNICAL_FAILURE } })
    const delivery = await db.delivery.findOne({ where: { statementId: 1, completed: null } })
    expect(delivery.requested).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should not create new statement if status technical failure', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: TECHNICAL_FAILURE } })
    const statements = await db.statement.findAll()
    expect(statements.length).toBe(1)
  })

  test('should send email via Notify once if status technical failure', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: TECHNICAL_FAILURE } })
    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })

  test('should send email to requested email address if status technical failure', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: TECHNICAL_FAILURE } })
    expect(mockSendEmail.mock.calls[0][1]).toBe('farmer1@farm.com')
  })

  test('should send email with file link if status technical failure', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: TECHNICAL_FAILURE } })
    expect(mockSendEmail.mock.calls[0][2].personalisation.link_to_file).toBe(MOCK_PREPARED_FILE)
  })

  test('should not complete delivery if status unknown', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: 'not an understood status' } })
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toBeNull()
  })

  test('should not create failure if status unknown', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: { status: 'not an understood status' } })
    const failure = await db.failure.findOne({ where: { deliveryId: 1 } })
    expect(failure).toBeNull()
  })

  test('should not complete delivery if status missing', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: {} })
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toBeNull()
  })

  test('should not create failure if status missing', async () => {
    await updateDeliveryFromResponse(mockDelivery1, { data: {} })
    const failure = await db.failure.findOne({ where: { deliveryId: 1 } })
    expect(failure).toBeNull()
  })

  test('should not complete delivery if response data missing', async () => {
    await updateDeliveryFromResponse(mockDelivery1, {})
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toBeNull()
  })
})
