jest.mock('../../../app/processing/publish/get-exisiting-document')
const getExistingDocument = require('../../../app/processing/publish/get-exisiting-document')
getExistingDocument.mockResolvedValue(null)

const SYSTEM_TIME = require('../../mocks/components/system-time')
jest.useFakeTimers().setSystemTime(SYSTEM_TIME)

const { mockNotifyClient } = require('../../mocks/modules/notifications-node-client')

const { mockMessageReceiver } = require('../../mocks/modules/ffc-messaging')

const { BlobServiceClient } = require('@azure/storage-blob')
const { storageConfig, notifyApiKey } = require('../../../app/config')

const db = require('../../../app/data')

const processPublishMessage = require('../../../app/messaging/process-publish-message')

const path = require('path')

const { EMAIL } = require('../../../app/constants/methods')

const TEST_FILE = path.resolve(__dirname, '../../files/test.pdf')

let container
let request
let receiver
let message

describe('Publish document', () => {
  beforeEach(async () => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(storageConfig.connectionStr)
    container = blobServiceClient.getContainerClient(storageConfig.container)
    await container.deleteIfExists()
    await container.createIfNotExists()

    receiver = mockMessageReceiver()
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await db.sequelize.truncate({ cascade: true })
  })

  afterAll(async () => {
    await db.sequelize.close()
  })

  describe('When document is a statement', () => {
    beforeEach(async () => {
      request = JSON.parse(JSON.stringify(require('../../mocks/messages/publish').STATEMENT_REQUEST))
      message = {
        body: request
      }

      const blockBlobClient = container.getBlockBlobClient(`${storageConfig.folder}/${request.filename}`)
      await blockBlobClient.uploadFile(TEST_FILE)
    })

    test('should use API key in Notify connection', async () => {
      await processPublishMessage(message, receiver)

      expect(mockNotifyClient).toHaveBeenCalledWith(notifyApiKey)
    })

    test('should send email via Notify once', async () => {
      await processPublishMessage(message, receiver)

      expect(mockNotifyClient().sendEmail).toHaveBeenCalledTimes(1)
    })

    test('should send email to requested email address', async () => {
      await processPublishMessage(message, receiver)
      expect(mockNotifyClient().sendEmail.mock.calls[0][1]).toBe(request.email)
    })

    test('should send email with file link', async () => {
      await processPublishMessage(message, receiver)
      expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.link_to_file).toBe(mockNotifyClient().prepareUpload())
    })

    test('should send email with scheme name', async () => {
      await processPublishMessage(message, receiver)
      expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.schemeName).toBe(request.scheme.name)
    })

    test('should send email with scheme short name', async () => {
      await processPublishMessage(message, receiver)
      expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.schemeShortName).toBe(request.scheme.shortName)
    })

    test('should send email with scheme frequency', async () => {
      await processPublishMessage(message, receiver)
      expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.schemeFrequency).toBe(request.scheme.frequency.toLowerCase())
    })

    test('should send email with scheme year', async () => {
      await processPublishMessage(message, receiver)
      expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.schemeYear).toBe(request.scheme.year)
    })

    test('should send email with business name', async () => {
      await processPublishMessage(message, receiver)
      expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.businessName).toBe(request.businessName)
    })

    test('saves one statement', async () => {
      await processPublishMessage(message, receiver)
      const statement = await db.statement.findAll()
      expect(statement.length).toBe(1)
    })

    test('saves statement with business name', async () => {
      await processPublishMessage(message, receiver)
      const statement = await db.statement.findOne()
      expect(statement.businessName).toBe(request.businessName)
    })

    test('saves statement with sbi', async () => {
      await processPublishMessage(message, receiver)
      const statement = await db.statement.findOne()
      expect(statement.sbi).toBe(request.sbi)
    })

    test('saves statement with frn', async () => {
      await processPublishMessage(message, receiver)
      const statement = await db.statement.findOne()
      expect(statement.frn).toBe(request.frn.toString())
    })

    test('saves statement with email', async () => {
      await processPublishMessage(message, receiver)
      const statement = await db.statement.findOne()
      expect(statement.email).toBe(request.email)
    })

    test('saves statement with filename', async () => {
      await processPublishMessage(message, receiver)
      const statement = await db.statement.findOne()
      expect(statement.filename).toBe(request.filename)
    })

    test('saves statement with address line 1', async () => {
      await processPublishMessage(message, receiver)
      const statement = await db.statement.findOne()
      expect(statement.addressLine1).toBe(request.address.line1)
    })

    test('saves statement with address line 2', async () => {
      await processPublishMessage(message, receiver)
      const statement = await db.statement.findOne()
      expect(statement.addressLine2).toBe(request.address.line2)
    })

    test('saves statement with address line 3', async () => {
      await processPublishMessage(message, receiver)
      const statement = await db.statement.findOne()
      expect(statement.addressLine3).toBe(request.address.line3)
    })

    test('saves statement with address line 4', async () => {
      await processPublishMessage(message, receiver)
      const statement = await db.statement.findOne()
      expect(statement.addressLine4).toBe(request.address.line4)
    })

    test('saves statement with address line 5', async () => {
      await processPublishMessage(message, receiver)
      const statement = await db.statement.findOne()
      expect(statement.addressLine5).toBe(request.address.line5)
    })

    test('saves statement with address postcode', async () => {
      await processPublishMessage(message, receiver)
      const statement = await db.statement.findOne()
      expect(statement.postcode).toBe(request.address.postcode)
    })

    test('saves one delivery', async () => {
      await processPublishMessage(message, receiver)
      const delivery = await db.delivery.findAll()
      expect(delivery.length).toBe(1)
    })

    test('saves delivery with statement id', async () => {
      await processPublishMessage(message, receiver)
      const statement = await db.statement.findOne()
      const delivery = await db.delivery.findOne()
      expect(delivery.statementId).toBe(statement.statementId)
    })

    test('saves delivery with email method', async () => {
      await processPublishMessage(message, receiver)
      const delivery = await db.delivery.findOne()
      expect(delivery.method).toBe(EMAIL)
    })

    test('saves delivery with requested date', async () => {
      await processPublishMessage(message, receiver)
      const delivery = await db.delivery.findOne()
      expect(delivery.requested).toStrictEqual(SYSTEM_TIME)
    })

    test('saves delivery with null completed date', async () => {
      await processPublishMessage(message, receiver)
      const delivery = await db.delivery.findOne()
      expect(delivery.completed).toBeNull()
    })

    test('completes message if successful', async () => {
      await processPublishMessage(message, receiver)
      expect(receiver.completeMessage).toHaveBeenCalledWith(message)
    })

    test('completes message once if successful', async () => {
      await processPublishMessage(message, receiver)
      expect(receiver.completeMessage).toHaveBeenCalledTimes(1)
    })

    test('does not dead letter if message completed', async () => {
      await processPublishMessage(message, receiver)
      expect(receiver.deadLetterMessage).not.toHaveBeenCalled()
    })
  })
})
