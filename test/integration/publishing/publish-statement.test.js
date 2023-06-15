const SYSTEM_TIME = require('../../mocks/components/system-time')
jest.useFakeTimers().setSystemTime(SYSTEM_TIME)

const { mockNotifyClient } = require('../../mocks/modules/notifications-node-client')

const { mockMessageReceiver } = require('../../mocks/modules/ffc-messaging')

const { BlobServiceClient } = require('@azure/storage-blob')
const { storageConfig, notifyApiKey } = require('../../../app/config')

const db = require('../../../app/data')

const saveStatement = require('../../../app/publishing/save-statement')

const path = require('path')

const { EMAIL } = require('../../../app/constants/methods')

const TEST_FILE = path.resolve(__dirname, '../../files/test.pdf')

const publishStatement = require('../../../app/publishing/publish-statement')

let container

describe('Publish request', () => {
  beforeEach(async () => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(storageConfig.connectionStr)
    container = blobServiceClient.getContainerClient(storageConfig.container)
    await container.deleteIfExists()
    await container.createIfNotExists()
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await db.sequelize.truncate({ cascade: true })
  })

  afterAll(async () => {
    await db.sequelize.close()
  })

  // describe.each([
  //   { name: 'statement', request: JSON.parse(JSON.stringify(require('../../mocks/messages/publish').STATEMENT_REQUEST)) },
  //   { name: 'schedule', request: JSON.parse(JSON.stringify(require('../../mocks/messages/publish').SCHEDULE_REQUEST)) }
  // ])('When request is a $name', ({ name, request }) => {
  //   beforeEach(async () => {
  //     const blockBlobClient = container.getBlockBlobClient(`${storageConfig.folder}/${request.filename}`)
  //     await blockBlobClient.uploadFile(TEST_FILE)
  //   })

  //   test('should use API key in Notify connection', async () => {
  //     await publishStatement(request)
  //     expect(mockNotifyClient).toHaveBeenCalledWith(notifyApiKey)
  //   })

  //   test('should send email via Notify once', async () => {
  //     await publishStatement(request)
  //     expect(mockNotifyClient().sendEmail).toHaveBeenCalledTimes(1)
  //   })

  //   test('should send email to requested email address', async () => {
  //     await publishStatement(request)
  //     expect(mockNotifyClient().sendEmail.mock.calls[0][1]).toBe(request.email)
  //   })

  //   test('should send email with file link', async () => {
  //     await publishStatement(request)
  //     expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.link_to_file).toBe(mockNotifyClient().prepareUpload())
  //   })

  //   test('should send email with scheme name', async () => {
  //     await publishStatement(request)
  //     expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.schemeName).toBe(request.scheme.name)
  //   })

  //   test('should send email with scheme short name', async () => {
  //     await publishStatement(request)
  //     expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.schemeShortName).toBe(request.scheme.shortName)
  //   })

  //   test('should send email with scheme frequency', async () => {
  //     await publishStatement(request)
  //     expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.schemeFrequency).toBe(request.scheme.frequency.toLowerCase())
  //   })

  //   test('should send email with scheme year', async () => {
  //     await publishStatement(request)
  //     expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.schemeYear).toBe(request.scheme.year)
  //   })

  //   test('should send email with business name', async () => {
  //     await publishStatement(request)
  //     expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.businessName).toBe(request.businessName)
  //   })

  //   test('should save one statement', async () => {
  //     await publishStatement(request)

  //     const statement = await db.statement.findAll()
  //     expect(statement.length).toBe(1)
  //   })

  //   test('should save statement with business name', async () => {
  //     await publishStatement(request)

  //     const statement = await db.statement.findOne()
  //     expect(statement.businessName).toBe(request.businessName)
  //   })

  //   test('should save statement with sbi', async () => {
  //     await publishStatement(request)

  //     const statement = await db.statement.findOne()
  //     expect(statement.sbi).toBe(request.sbi)
  //   })

  //   test('should save statement with frn', async () => {
  //     await publishStatement(request)

  //     const statement = await db.statement.findOne()
  //     expect(statement.frn).toBe(request.frn.toString())
  //   })

  //   test('should save statement with email', async () => {
  //     await publishStatement(request)

  //     const statement = await db.statement.findOne()
  //     expect(statement.email).toBe(request.email)
  //   })

  //   test('should save statement with filename', async () => {
  //     await publishStatement(request)

  //     const statement = await db.statement.findOne()
  //     expect(statement.filename).toBe(request.filename)
  //   })

  //   test('should save statement with address line 1', async () => {
  //     await publishStatement(request)

  //     const statement = await db.statement.findOne()
  //     expect(statement.addressLine1).toBe(request.address.line1)
  //   })

  //   test('should save statement with address line 2', async () => {
  //     await publishStatement(request)

  //     const statement = await db.statement.findOne()
  //     expect(statement.addressLine2).toBe(request.address.line2)
  //   })

  //   test('should save statement with address line 3', async () => {
  //     await publishStatement(request)

  //     const statement = await db.statement.findOne()
  //     expect(statement.addressLine3).toBe(request.address.line3)
  //   })

  //   test('should save statement with address line 4', async () => {
  //     await publishStatement(request)

  //     const statement = await db.statement.findOne()
  //     expect(statement.addressLine4).toBe(request.address.line4)
  //   })

  //   test('should save statement with address line 5', async () => {
  //     await publishStatement(request)

  //     const statement = await db.statement.findOne()
  //     expect(statement.addressLine5).toBe(request.address.line5)
  //   })

  //   test('should save statement with address postcode', async () => {
  //     await publishStatement(request)

  //     const statement = await db.statement.findOne()
  //     expect(statement.postcode).toBe(request.address.postcode)
  //   })

  //   test('should save one delivery', async () => {
  //     await publishStatement(request)

  //     const delivery = await db.delivery.findAll()
  //     expect(delivery.length).toBe(1)
  //   })

  //   test('should save delivery with statement id', async () => {
  //     await publishStatement(request)

  //     const statement = await db.statement.findOne()
  //     const delivery = await db.delivery.findOne()
  //     expect(delivery.statementId).toBe(statement.statementId)
  //   })

  //   test('should save delivery with email method', async () => {
  //     await publishStatement(request)

  //     const delivery = await db.delivery.findOne()
  //     expect(delivery.method).toBe(EMAIL)
  //   })

  //   test('should save delivery with requested date', async () => {
  //     await publishStatement(request)

  //     const delivery = await db.delivery.findOne()
  //     expect(delivery.requested).toStrictEqual(SYSTEM_TIME)
  //   })

  //   test('should save delivery with null completed date', async () => {
  //     await publishStatement(request)

  //     const delivery = await db.delivery.findOne()
  //     expect(delivery.completed).toBeNull()
  //   })
  // })

  describe.each([
    { name: 'statement', request: JSON.parse(JSON.stringify(require('../../mocks/messages/publish').STATEMENT_REQUEST)) },
    { name: 'schedule', request: JSON.parse(JSON.stringify(require('../../mocks/messages/publish').SCHEDULE_REQUEST)) }
  ])('When $name request is a duplicate', ({ name, request }) => {
    beforeEach(async () => {
      const blockBlobClient = container.getBlockBlobClient(`${storageConfig.folder}/${request.filename}`)
      await blockBlobClient.uploadFile(TEST_FILE)

      const transaction = await db.sequelize.transaction()
      await saveStatement(request, new Date(), transaction)
      await transaction.commit()
    })

    test('should not save the duplicate request', async () => {
      const statementBefore = await db.statement.findAll()
      
      await publishStatement(request)

      const statementAfter = await db.statement.findAll()
      expect(statementBefore.length).toBe(1)
      expect(statementAfter.length).toBe(1)
    })

    test('should not send an email via Notify', async () => {
      await publishStatement(request)
      expect(mockNotifyClient().sendEmail).not.toHaveBeenCalled()
    })

    // test('should send email to requested email address', async () => {
    //   await publishStatement(request)
    //   expect(mockNotifyClient().sendEmail.mock.calls[0][1]).toBe(request.email)
    // })

    // test('should send email with file link', async () => {
    //   await publishStatement(request)
    //   expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.link_to_file).toBe(mockNotifyClient().prepareUpload())
    // })

    // test('should send email with scheme name', async () => {
    //   await publishStatement(request)
    //   expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.schemeName).toBe(request.scheme.name)
    // })

    // test('should send email with scheme short name', async () => {
    //   await publishStatement(request)
    //   expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.schemeShortName).toBe(request.scheme.shortName)
    // })

    // test('should send email with scheme frequency', async () => {
    //   await publishStatement(request)
    //   expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.schemeFrequency).toBe(request.scheme.frequency.toLowerCase())
    // })

    // test('should send email with scheme year', async () => {
    //   await publishStatement(request)
    //   expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.schemeYear).toBe(request.scheme.year)
    // })

    // test('should send email with business name', async () => {
    //   await publishStatement(request)
    //   expect(mockNotifyClient().sendEmail.mock.calls[0][2].personalisation.businessName).toBe(request.businessName)
    // })

    test('should save one statement', async () => {
      await publishStatement(request)

      const statement = await db.statement.findAll()
      expect(statement.length).toBe(1)
    })

    // test('should save statement with business name', async () => {
    //   await publishStatement(request)

    //   const statement = await db.statement.findOne()
    //   expect(statement.businessName).toBe(request.businessName)
    // })

    // test('should save statement with sbi', async () => {
    //   await publishStatement(request)

    //   const statement = await db.statement.findOne()
    //   expect(statement.sbi).toBe(request.sbi)
    // })

    // test('should save statement with frn', async () => {
    //   await publishStatement(request)

    //   const statement = await db.statement.findOne()
    //   expect(statement.frn).toBe(request.frn.toString())
    // })

    // test('should save statement with email', async () => {
    //   await publishStatement(request)

    //   const statement = await db.statement.findOne()
    //   expect(statement.email).toBe(request.email)
    // })

    // test('should save statement with filename', async () => {
    //   await publishStatement(request)

    //   const statement = await db.statement.findOne()
    //   expect(statement.filename).toBe(request.filename)
    // })

    // test('should save statement with address line 1', async () => {
    //   await publishStatement(request)

    //   const statement = await db.statement.findOne()
    //   expect(statement.addressLine1).toBe(request.address.line1)
    // })

    // test('should save statement with address line 2', async () => {
    //   await publishStatement(request)

    //   const statement = await db.statement.findOne()
    //   expect(statement.addressLine2).toBe(request.address.line2)
    // })

    // test('should save statement with address line 3', async () => {
    //   await publishStatement(request)

    //   const statement = await db.statement.findOne()
    //   expect(statement.addressLine3).toBe(request.address.line3)
    // })

    // test('should save statement with address line 4', async () => {
    //   await publishStatement(request)

    //   const statement = await db.statement.findOne()
    //   expect(statement.addressLine4).toBe(request.address.line4)
    // })

    // test('should save statement with address line 5', async () => {
    //   await publishStatement(request)

    //   const statement = await db.statement.findOne()
    //   expect(statement.addressLine5).toBe(request.address.line5)
    // })

    // test('should save statement with address postcode', async () => {
    //   await publishStatement(request)

    //   const statement = await db.statement.findOne()
    //   expect(statement.postcode).toBe(request.address.postcode)
    // })

    test('should save one delivery', async () => {
      await publishStatement(request)

      const delivery = await db.delivery.findAll()
      expect(delivery.length).toBe(1)
    })

    // test('should save delivery with statement id', async () => {
    //   await publishStatement(request)

    //   const statement = await db.statement.findOne()
    //   const delivery = await db.delivery.findOne()
    //   expect(delivery.statementId).toBe(statement.statementId)
    // })

    // test('should save delivery with email method', async () => {
    //   await publishStatement(request)

    //   const delivery = await db.delivery.findOne()
    //   expect(delivery.method).toBe(EMAIL)
    // })

    // test('should save delivery with requested date', async () => {
    //   await publishStatement(request)

    //   const delivery = await db.delivery.findOne()
    //   expect(delivery.requested).toStrictEqual(SYSTEM_TIME)
    // })

    // test('should save delivery with null completed date', async () => {
    //   await publishStatement(request)

    //   const delivery = await db.delivery.findOne()
    //   expect(delivery.completed).toBeNull()
    // })
  })
})
