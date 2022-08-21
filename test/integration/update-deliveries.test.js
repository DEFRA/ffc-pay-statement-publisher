const MOCK_REFERENCE = '78363cba-2093-4447-8812-697c09820614'
let mockSendEmail
const MOCK_PREPARED_FILE = 'mock-prepared-file'
let mockPrepareUpload
let mockGetNotificationById
jest.mock('notifications-node-client', () => {
  return {
    NotifyClient: jest.fn().mockImplementation(() => {
      return {
        sendEmail: mockSendEmail,
        prepareUpload: mockPrepareUpload,
        getNotificationById: mockGetNotificationById
      }
    })
  }
})
jest.mock('ffc-messaging')
const { BlobServiceClient } = require('@azure/storage-blob')
const config = require('../../app/config/storage')
const db = require('../../app/data')
const updateDeliveries = require('../../app/monitoring/update-deliveries')
const path = require('path')
const { EMAIL } = require('../../app/methods')
const { DELIVERED, SENDING, CREATED, TEMPORARY_FAILURE, PERMANENT_FAILURE, TECHNICAL_FAILURE } = require('../../app/statuses')

const FILE_NAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'
const TEST_FILE = path.resolve(__dirname, '../files/test.pdf')

let blobServiceClient
let container

describe('update deliveries', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))
    blobServiceClient = BlobServiceClient.fromConnectionString(config.connectionStr)
    container = blobServiceClient.getContainerClient(config.container)
    await container.deleteIfExists()
    await container.createIfNotExists()
    const blockBlobClient = container.getBlockBlobClient(`${config.folder}/${FILE_NAME}`)
    await blockBlobClient.uploadFile(TEST_FILE)
    await db.sequelize.truncate({ cascade: true })

    await db.statement.bulkCreate([{
      statementId: 1,
      businessName: 'Business 1',
      postcode: 'SW1 1AA',
      filename: FILE_NAME,
      sbi: 123456789,
      frn: 1234567890,
      email: 'farmer1@farm.com',
      received: new Date(2022, 7, 5, 15, 30, 10, 120)
    }, {
      statementId: 2,
      businessName: 'Business 2',
      postcode: 'SW2 2AA',
      filename: FILE_NAME,
      sbi: 123456788,
      frn: 1234567898,
      email: 'farmer2@farm.com',
      received: new Date(2022, 7, 5, 15, 30, 10, 120)
    }])

    await db.delivery.bulkCreate([{
      deliveryId: 1,
      statementId: 1,
      reference: MOCK_REFERENCE,
      method: EMAIL,
      requested: new Date(2022, 7, 5, 15, 30, 10, 120),
      completed: null
    }, {
      deliveryId: 2,
      statementId: 2,
      reference: '88363cba-2093-4447-8812-697c09820617',
      method: EMAIL,
      requested: new Date(2022, 7, 5, 15, 30, 10, 120),
      completed: new Date(2022, 7, 5, 15, 30, 10, 120)
    }])

    mockSendEmail = jest.fn().mockResolvedValue({ data: { id: MOCK_REFERENCE } })
    mockPrepareUpload = jest.fn().mockReturnValue(MOCK_PREPARED_FILE)
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: DELIVERED } })
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('should check status of delivery once if only one delivery outstanding', async () => {
    await updateDeliveries()
    expect(mockGetNotificationById).toHaveBeenCalledTimes(1)
  })

  test('should check status of delivery for only outstanding delivery', async () => {
    await updateDeliveries()
    expect(mockGetNotificationById).toHaveBeenCalledWith(MOCK_REFERENCE)
  })

  test('should complete delivery if status delivered', async () => {
    await updateDeliveries()
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should not complete delivery if status sending', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: SENDING } })
    await updateDeliveries()
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toBeNull()
  })

  test('should not complete delivery if status created', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: CREATED } })
    await updateDeliveries()
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toBeNull()
  })

  test('should complete delivery if status temporary failure', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: TEMPORARY_FAILURE } })
    await updateDeliveries()
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should create failure if status temporary failure', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: TEMPORARY_FAILURE } })
    await updateDeliveries()
    const failure = await db.failure.findOne({ where: { deliveryId: 1 } })
    expect(failure).toBeDefined()
  })

  test('should create failure with reason if status temporary failure', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: TEMPORARY_FAILURE } })
    await updateDeliveries()
    const failure = await db.failure.findOne({ where: { deliveryId: 1 } })
    expect(failure.reason).toBe('inbox full or rejected as spam')
  })

  test('should create failure with date failed if status temporary failure', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: TEMPORARY_FAILURE } })
    await updateDeliveries()
    const failure = await db.failure.findOne({ where: { deliveryId: 1 } })
    expect(failure.failed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should complete delivery if status permanent failure', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: PERMANENT_FAILURE } })
    await updateDeliveries()
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should create failure if status permanent failure', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: PERMANENT_FAILURE } })
    await updateDeliveries()
    const failure = await db.failure.findOne({ where: { deliveryId: 1 } })
    expect(failure).toBeDefined()
  })

  test('should create failure with reason if status permanent failure', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: PERMANENT_FAILURE } })
    await updateDeliveries()
    const failure = await db.failure.findOne({ where: { deliveryId: 1 } })
    expect(failure.reason).toBe('invalid email address')
  })

  test('should create failure with date failed if status permanent failure', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: PERMANENT_FAILURE } })
    await updateDeliveries()
    const failure = await db.failure.findOne({ where: { deliveryId: 1 } })
    expect(failure.failed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should complete delivery if status technical failure', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: TECHNICAL_FAILURE } })
    await updateDeliveries()
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should create new delivery if status technical failure', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: TECHNICAL_FAILURE } })
    await updateDeliveries()
    const deliveries = await db.delivery.findAll({ where: { statementId: 1 } })
    expect(deliveries.length).toBe(2)
  })

  test('should create new delivery with requested date if status technical failure', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: TECHNICAL_FAILURE } })
    await updateDeliveries()
    const delivery = await db.delivery.findOne({ where: { statementId: 1, completed: null } })
    expect(delivery.requested).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should not create new statement if status technical failure', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: TECHNICAL_FAILURE } })
    await updateDeliveries()
    const statements = await db.statement.findAll()
    expect(statements.length).toBe(2)
  })

  test('should send email via Notify once if status technical failure', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: TECHNICAL_FAILURE } })
    await updateDeliveries()
    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })

  test('should send email to requested email address if status technical failure', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: TECHNICAL_FAILURE } })
    await updateDeliveries()
    expect(mockSendEmail.mock.calls[0][1]).toBe('farmer1@farm.com')
  })

  test('should send email with file link if status technical failure', async () => {
    mockGetNotificationById = jest.fn().mockResolvedValue({ data: { status: TECHNICAL_FAILURE } })
    await updateDeliveries()
    expect(mockSendEmail.mock.calls[0][2].personalisation.link_to_file).toBe(MOCK_PREPARED_FILE)
  })
})
