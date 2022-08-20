const MOCK_REFERENCE = '78363cba-2093-4447-8812-697c09820614'
const mockSendEmail = jest.fn().mockResolvedValue({ data: { id: MOCK_REFERENCE } })
const MOCK_PREPARED_FILE = 'mock-prepared-file'
const mockPrepareUpload = jest.fn().mockReturnValue(MOCK_PREPARED_FILE)
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
const config = require('../../app/config/storage')
const db = require('../../app/data')
const mockRequest = require('../mocks/request')
const processPublishMessage = require('../../app/messaging/process-publish-message')
const path = require('path')

const FILE_NAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'
const TEST_FILE = path.resolve(__dirname, '../files/test.pdf')

let blobServiceClient
let container
let receiver
let message

describe('publish statement', () => {
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

    receiver = {
      completeMessage: jest.fn(),
      deadLetterMessage: jest.fn()
    }

    message = {
      body: mockRequest
    }
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('should send email via Notify once', async () => {
    await processPublishMessage(message, receiver)

    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })

  test('should send email to requested email address', async () => {
    await processPublishMessage(message, receiver)
    expect(mockSendEmail.mock.calls[0][1]).toBe(mockRequest.email)
  })

  test('should send email with file link', async () => {
    await processPublishMessage(message, receiver)
    expect(mockSendEmail.mock.calls[0][2].personalisation.link_to_file).toBe(MOCK_PREPARED_FILE)
  })

  test('saves one statement', async () => {
    await processPublishMessage(message, receiver)
    const statement = await db.statement.findAll()
    expect(statement.length).toBe(1)
  })

  test('saves statement with business name', async () => {
    await processPublishMessage(message, receiver)
    const statement = await db.statement.findOne()
    expect(statement.businessName).toBe(mockRequest.businessName)
  })

  test('saves statement with sbi', async () => {
    await processPublishMessage(message, receiver)
    const statement = await db.statement.findOne()
    expect(statement.sbi).toBe(mockRequest.sbi)
  })

  test('saves statement with frn', async () => {
    await processPublishMessage(message, receiver)
    const statement = await db.statement.findOne()
    expect(statement.frn).toBe(mockRequest.frn.toString())
  })

  test('saves statement with email', async () => {
    await processPublishMessage(message, receiver)
    const statement = await db.statement.findOne()
    expect(statement.email).toBe(mockRequest.email)
  })

  test('saves statement with address line 1', async () => {
    await processPublishMessage(message, receiver)
    const statement = await db.statement.findOne()
    expect(statement.addressLine1).toBe(mockRequest.address.line1)
  })

  test('saves one delivery', async () => {
    await processPublishMessage(message, receiver)
    const delivery = await db.delivery.findAll()
    expect(delivery.length).toBe(1)
  })

  // test('saves log entry with statement data', async () => {
  //   await processPublishMessage(message, receiver)
  //   const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
  //   expect(log.statementData).toStrictEqual(mockRequest)
  // })

  // test('saves log entry with generation date', async () => {
  //   await processPublishMessage(message, receiver)
  //   const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
  //   expect(log.dateGenerated).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  // })

  test('completes message', async () => {
    await processPublishMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalled()
  })
})
