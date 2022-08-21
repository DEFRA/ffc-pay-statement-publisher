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
const rescheduleDelivery = require('../../../app/monitoring/reschedule-delivery')
const path = require('path')

const FILE_NAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'
const TEST_FILE = path.resolve(__dirname, '../../files/test.pdf')

let blobServiceClient
let container

let mockDelivery1
let mockDelivery2
let mockStatement1
let mockStatement2

describe('reschedule deliveries', () => {
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
    mockStatement2 = JSON.parse(JSON.stringify(require('../../mocks/statement').mockStatement2))
    mockDelivery1 = JSON.parse(JSON.stringify(require('../../mocks/delivery').mockDelivery1))
    mockDelivery2 = JSON.parse(JSON.stringify(require('../../mocks/delivery').mockDelivery2))

    await db.sequelize.truncate({ cascade: true })
    await db.statement.bulkCreate([mockStatement1, mockStatement2])
    await db.delivery.bulkCreate([mockDelivery1, mockDelivery2])

    mockSendEmail = jest.fn().mockResolvedValue({ data: { id: mockDelivery1.reference } })
    mockPrepareUpload = jest.fn().mockReturnValue(MOCK_PREPARED_FILE)
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('should complete delivery', async () => {
    await rescheduleDelivery(mockDelivery1)
    const delivery = await db.delivery.findByPk(1)
    expect(delivery.completed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should create new delivery', async () => {
    await rescheduleDelivery(mockDelivery1)
    const deliveries = await db.delivery.findAll({ where: { statementId: 1 } })
    expect(deliveries.length).toBe(2)
  })

  test('should create new delivery with requested date', async () => {
    await rescheduleDelivery(mockDelivery1)
    const delivery = await db.delivery.findOne({ where: { statementId: 1, completed: null } })
    expect(delivery.requested).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('should not create new statement', async () => {
    await rescheduleDelivery(mockDelivery1)
    const statements = await db.statement.findAll()
    expect(statements.length).toBe(2)
  })

  test('should send email via Notify once', async () => {
    await rescheduleDelivery(mockDelivery1)
    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })

  test('should send email to requested email address', async () => {
    await rescheduleDelivery(mockDelivery1)
    expect(mockSendEmail.mock.calls[0][1]).toBe('farmer1@farm.com')
  })

  test('should send email with file link', async () => {
    await rescheduleDelivery(mockDelivery1)
    expect(mockSendEmail.mock.calls[0][2].personalisation.link_to_file).toBe(MOCK_PREPARED_FILE)
  })
})
