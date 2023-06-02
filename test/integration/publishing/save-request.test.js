const db = require('../../../app/data')

const { mockMessageSender } = require('../../mocks/objects/ffc-messaging')

const saveRequest = require('../../../app/publishing/save-request')

const REFERENCE = JSON.parse(JSON.stringify(require('../../mocks/objects/notify-response').NOTIFY_RESPONSE_DELIVERED)).data.id
const { EMAIL } = require('../../../app/constants/methods')
const { EMPTY, INVALID, REJECTED } = require('../../../app/constants/failure-reasons')
const { EMPTY: EMPTY_ERROR, INVALID: INVALID_ERROR } = require('../../../app/constants/crm-error-messages')

const SYSTEM_TIME = require('../../mocks/components/system-time')

const MESSAGE = require('../../mocks/objects/message')

let request
let reference
let method
let reason

describe('Save statement and delivery and send to CRM and save failure if so', () => {
  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(SYSTEM_TIME)

    reference = REFERENCE
    method = EMAIL
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await db.sequelize.truncate({ cascade: true })
  })

  afterAll(async () => {
    await db.sequelize.close()
  })

  describe('When request is a statement', () => {
    beforeEach(async () => {
      request = JSON.parse(JSON.stringify(require('../../mocks/messages/request-statement')))
    })

    describe('When successful', () => {
      beforeEach(async () => {
        reason = undefined
      })

      test('should save 1 statement', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findAll()
        expect(statement.length).toBe(1)
      })

      test('should save statement with business name', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.businessName).toBe(request.businessName)
      })

      test('should save statement with sbi', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.sbi).toBe(request.sbi)
      })

      test('should save statement with frn', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.frn).toBe(request.frn.toString())
      })

      test('should save statement with method', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.method).toBe(request.method)
      })

      test('should save statement with filename', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.filename).toBe(request.filename)
      })

      test('should save statement with address line 1', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine1).toBe(request.address.line1)
      })

      test('should save statement with address line 2', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine2).toBe(request.address.line2)
      })

      test('should save statement with address line 3', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine3).toBe(request.address.line3)
      })

      test('should save statement with address line 4', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine4).toBe(request.address.line4)
      })

      test('should save statement with address line 5', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine5).toBe(request.address.line5)
      })

      test('should save statement with address postcode', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.postcode).toBe(request.address.postcode)
      })

      test('should save statement with document reference', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.documentReference).toBe(request.documentReference)
      })

      test('should save 1 delivery', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findAll()
        expect(delivery.length).toBe(1)
      })

      test('should save delivery with statement id', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        const delivery = await db.delivery.findOne()
        expect(delivery.statementId).toBe(statement.statementId)
      })

      test('should save delivery with method method', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.method).toBe(method)
      })

      test('should save delivery with SYSTEM_TIME', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.requested).toStrictEqual(SYSTEM_TIME)
      })

      test('should save delivery with null completed date', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.completed).toBeNull()
      })

      test('should save delivery with reference if reference', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBe(reference)
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = null

        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = undefined

        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should not save failure', async () => {
        await saveRequest(request, reference, method, reason)

        const failure = await db.failure.findAll()
        expect(failure.length).toBe(0)
      })

      test('should not send message to CRM', async () => {
        await saveRequest(request, reference, method, reason)

        expect(mockMessageSender().sendMessage).not.toHaveBeenCalled()
        expect(mockMessageSender().closeConnection).not.toHaveBeenCalled()
      })
    })

    describe('When failure reason is EMPTY', () => {
      beforeEach(async () => {
        reason = EMPTY
      })

      test('should save 1 statement', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findAll()
        expect(statement.length).toBe(1)
      })

      test('should save statement with business name', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.businessName).toBe(request.businessName)
      })

      test('should save statement with sbi', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.sbi).toBe(request.sbi)
      })

      test('should save statement with frn', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.frn).toBe(request.frn.toString())
      })

      test('should save statement with method', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.method).toBe(request.method)
      })

      test('should save statement with filename', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.filename).toBe(request.filename)
      })

      test('should save statement with address line 1', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine1).toBe(request.address.line1)
      })

      test('should save statement with address line 2', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine2).toBe(request.address.line2)
      })

      test('should save statement with address line 3', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine3).toBe(request.address.line3)
      })

      test('should save statement with address line 4', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine4).toBe(request.address.line4)
      })

      test('should save statement with address line 5', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine5).toBe(request.address.line5)
      })

      test('should save statement with address postcode', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.postcode).toBe(request.address.postcode)
      })

      test('should save statement with document reference', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.documentReference).toBe(request.documentReference)
      })

      test('should save 1 delivery', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findAll()
        expect(delivery.length).toBe(1)
      })

      test('should save delivery with statement id', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        const delivery = await db.delivery.findOne()
        expect(delivery.statementId).toBe(statement.statementId)
      })

      test('should save delivery with method method', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.method).toBe(method)
      })

      test('should save delivery with SYSTEM_TIME', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.requested).toStrictEqual(SYSTEM_TIME)
      })

      test('should save delivery with null completed date', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.completed).toBeNull()
      })

      test('should save delivery with reference if reference', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBe(reference)
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = null

        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = undefined

        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should save 1 failure', async () => {
        await saveRequest(request, reference, method, reason)

        const failure = await db.failure.findAll()
        expect(failure.length).toBe(1)
      })

      test('should save failure with deliveryId', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        const failure = await db.failure.findOne()
        expect(failure.deliveryId).toBe(delivery.deliveryId)
      })

      test('should save failure with reason as EMPTY', async () => {
        await saveRequest(request, reference, method, reason)

        const failure = await db.failure.findOne()
        expect(failure.reason).toBe(EMPTY)
      })

      test('should save failure with failed as SYSTEM_TIME', async () => {
        await saveRequest(request, reference, method, reason)

        const failure = await db.failure.findOne()
        expect(failure.failed).toStrictEqual(SYSTEM_TIME)
      })

      test('should send message to CRM', async () => {
        await saveRequest(request, reference, method, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalled()
        expect(mockMessageSender().closeConnection).toHaveBeenCalled()
      })

      test('should send 1 message to CRM', async () => {
        await saveRequest(request, reference, method, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
        expect(mockMessageSender().closeConnection).toHaveBeenCalledTimes(1)
      })

      test('should send message to CRM with correct content', async () => {
        await saveRequest(request, reference, method, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalledWith({
          ...MESSAGE,
          body: {
            email: request.email,
            errorMessage: EMPTY_ERROR,
            frn: request.frn
          }
        })
      })
    })

    describe('When failure reason is INVALID', () => {
      beforeEach(async () => {
        reason = INVALID
      })

      test('should save 1 statement', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findAll()
        expect(statement.length).toBe(1)
      })

      test('should save statement with business name', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.businessName).toBe(request.businessName)
      })

      test('should save statement with sbi', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.sbi).toBe(request.sbi)
      })

      test('should save statement with frn', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.frn).toBe(request.frn.toString())
      })

      test('should save statement with method', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.method).toBe(request.method)
      })

      test('should save statement with filename', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.filename).toBe(request.filename)
      })

      test('should save statement with address line 1', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine1).toBe(request.address.line1)
      })

      test('should save statement with address line 2', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine2).toBe(request.address.line2)
      })

      test('should save statement with address line 3', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine3).toBe(request.address.line3)
      })

      test('should save statement with address line 4', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine4).toBe(request.address.line4)
      })

      test('should save statement with address line 5', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine5).toBe(request.address.line5)
      })

      test('should save statement with address postcode', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.postcode).toBe(request.address.postcode)
      })

      test('should save statement with document reference', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.documentReference).toBe(request.documentReference)
      })

      test('should save 1 delivery', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findAll()
        expect(delivery.length).toBe(1)
      })

      test('should save delivery with statement id', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        const delivery = await db.delivery.findOne()
        expect(delivery.statementId).toBe(statement.statementId)
      })

      test('should save delivery with email method', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.method).toBe(EMAIL)
      })

      test('should save delivery with SYSTEM_TIME', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.requested).toStrictEqual(SYSTEM_TIME)
      })

      test('should save delivery with null completed date', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.completed).toBeNull()
      })

      test('should save delivery with reference if reference', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBe(reference)
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = null

        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = undefined

        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should save 1 failure', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const failure = await db.failure.findAll()
        expect(failure.length).toBe(1)
      })

      test('should save failure with deliveryId', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        const failure = await db.failure.findOne()
        expect(failure.deliveryId).toBe(delivery.deliveryId)
      })

      test('should save failure with reason as INVALID', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const failure = await db.failure.findOne()
        expect(failure.reason).toBe(INVALID)
      })

      test('should save failure with failed as SYSTEM_TIME', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const failure = await db.failure.findOne()
        expect(failure.failed).toStrictEqual(SYSTEM_TIME)
      })

      test('should send message to CRM', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalled()
        expect(mockMessageSender().closeConnection).toHaveBeenCalled()
      })

      test('should send 1 message to CRM', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
        expect(mockMessageSender().closeConnection).toHaveBeenCalledTimes(1)
      })

      test('should send message to CRM with correct content', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalledWith({
          ...MESSAGE,
          body: {
            email: request.email,
            errorMessage: INVALID_ERROR,
            frn: request.frn
          }
        })
      })
    })

    describe('When failure reason is REJECTED', () => {
      beforeEach(async () => {
        reason = REJECTED
      })

      test('should save 1 statement', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findAll()
        expect(statement.length).toBe(1)
      })

      test('should save statement with business name', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.businessName).toBe(request.businessName)
      })

      test('should save statement with sbi', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.sbi).toBe(request.sbi)
      })

      test('should save statement with frn', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.frn).toBe(request.frn.toString())
      })

      test('should save statement with email', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.email).toBe(request.email)
      })

      test('should save statement with filename', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.filename).toBe(request.filename)
      })

      test('should save statement with address line 1', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine1).toBe(request.address.line1)
      })

      test('should save statement with address line 2', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine2).toBe(request.address.line2)
      })

      test('should save statement with address line 3', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine3).toBe(request.address.line3)
      })

      test('should save statement with address line 4', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine4).toBe(request.address.line4)
      })

      test('should save statement with address line 5', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine5).toBe(request.address.line5)
      })

      test('should save statement with address postcode', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.postcode).toBe(request.address.postcode)
      })

      test('should save statement with document reference', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.documentReference).toBe(request.documentReference)
      })

      test('should save 1 delivery', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findAll()
        expect(delivery.length).toBe(1)
      })

      test('should save delivery with statement id', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        const delivery = await db.delivery.findOne()
        expect(delivery.statementId).toBe(statement.statementId)
      })

      test('should save delivery with email method', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.method).toBe(EMAIL)
      })

      test('should save delivery with SYSTEM_TIME', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.requested).toStrictEqual(SYSTEM_TIME)
      })

      test('should save delivery with null completed date', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.completed).toBeNull()
      })

      test('should save delivery with reference if reference', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBe(reference)
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = null

        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = undefined

        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should save 1 failure', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const failure = await db.failure.findAll()
        expect(failure.length).toBe(1)
      })

      test('should save failure with deliveryId', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        const failure = await db.failure.findOne()
        expect(failure.deliveryId).toBe(delivery.deliveryId)
      })

      test('should save failure with reason as REJECTED', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const failure = await db.failure.findOne()
        expect(failure.reason).toBe(REJECTED)
      })

      test('should save failure with failed as SYSTEM_TIME', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const failure = await db.failure.findOne()
        expect(failure.failed).toStrictEqual(SYSTEM_TIME)
      })

      test('should send message to CRM', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalled()
        expect(mockMessageSender().closeConnection).toHaveBeenCalled()
      })

      test('should send 1 message to CRM', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
        expect(mockMessageSender().closeConnection).toHaveBeenCalledTimes(1)
      })

      test('should send message to CRM with correct content', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalledWith({
          ...MESSAGE,
          body: {
            email: request.email,
            errorMessage: INVALID_ERROR,
            frn: request.frn
          }
        })
      })
    })

    describe('When failure reason is "Not known failure reason"', () => {
      beforeEach(async () => {
        reason = 'Not known failure reason'
      })

      test('should not save statement', async () => {
        try { await saveRequest(request, reference, EMAIL, reason) } catch {}

        const statement = await db.statement.findAll()
        expect(statement.length).toBe(0)
      })

      test('should not save delivery', async () => {
        try { await saveRequest(request, reference, EMAIL, reason) } catch {}

        const delivery = await db.delivery.findAll()
        expect(delivery.length).toBe(0)
      })

      test('should not save failure', async () => {
        try { await saveRequest(request, reference, EMAIL, reason) } catch {}

        const failure = await db.failure.findAll()
        expect(failure.length).toBe(0)
      })

      test('should not send message to CRM', async () => {
        try { await saveRequest(request, reference, EMAIL, reason) } catch {}

        expect(mockMessageSender().sendMessage).not.toHaveBeenCalled()
        expect(mockMessageSender().closeConnection).not.toHaveBeenCalled()
      })
    })
  })

  describe('When request is a schedule', () => {
    beforeEach(async () => {
      request = JSON.parse(JSON.stringify(require('../../mocks/messages/request-schedule')))
    })

    describe('When successful', () => {
      beforeEach(async () => {
        reason = undefined
      })

      test('should save 1 statement', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findAll()
        expect(statement.length).toBe(1)
      })

      test('should save statement with business name', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.businessName).toBe(request.businessName)
      })

      test('should save statement with sbi', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.sbi).toBe(request.sbi)
      })

      test('should save statement with frn', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.frn).toBe(request.frn.toString())
      })

      test('should save statement with method', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.method).toBe(request.method)
      })

      test('should save statement with filename', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.filename).toBe(request.filename)
      })

      test('should save statement with address line 1', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine1).toBe(request.address.line1)
      })

      test('should save statement with address line 2', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine2).toBe(request.address.line2)
      })

      test('should save statement with address line 3', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine3).toBe(request.address.line3)
      })

      test('should save statement with address line 4', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine4).toBe(request.address.line4)
      })

      test('should save statement with address line 5', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine5).toBe(request.address.line5)
      })

      test('should save statement with address postcode', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.postcode).toBe(request.address.postcode)
      })

      test('should save statement with document reference', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.documentReference).toBe(request.documentReference)
      })

      test('should save 1 delivery', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findAll()
        expect(delivery.length).toBe(1)
      })

      test('should save delivery with statement id', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        const delivery = await db.delivery.findOne()
        expect(delivery.statementId).toBe(statement.statementId)
      })

      test('should save delivery with method method', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.method).toBe(method)
      })

      test('should save delivery with SYSTEM_TIME', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.requested).toStrictEqual(SYSTEM_TIME)
      })

      test('should save delivery with null completed date', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.completed).toBeNull()
      })

      test('should save delivery with reference if reference', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBe(reference)
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = null

        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = undefined

        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should not save failure', async () => {
        await saveRequest(request, reference, method, reason)

        const failure = await db.failure.findAll()
        expect(failure.length).toBe(0)
      })

      test('should not send message to CRM', async () => {
        await saveRequest(request, reference, method, reason)

        expect(mockMessageSender().sendMessage).not.toHaveBeenCalled()
        expect(mockMessageSender().closeConnection).not.toHaveBeenCalled()
      })
    })

    describe('When failure reason is EMPTY', () => {
      beforeEach(async () => {
        reason = EMPTY
      })

      test('should save 1 statement', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findAll()
        expect(statement.length).toBe(1)
      })

      test('should save statement with business name', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.businessName).toBe(request.businessName)
      })

      test('should save statement with sbi', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.sbi).toBe(request.sbi)
      })

      test('should save statement with frn', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.frn).toBe(request.frn.toString())
      })

      test('should save statement with method', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.method).toBe(request.method)
      })

      test('should save statement with filename', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.filename).toBe(request.filename)
      })

      test('should save statement with address line 1', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine1).toBe(request.address.line1)
      })

      test('should save statement with address line 2', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine2).toBe(request.address.line2)
      })

      test('should save statement with address line 3', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine3).toBe(request.address.line3)
      })

      test('should save statement with address line 4', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine4).toBe(request.address.line4)
      })

      test('should save statement with address line 5', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine5).toBe(request.address.line5)
      })

      test('should save statement with address postcode', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.postcode).toBe(request.address.postcode)
      })

      test('should save statement with document reference', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.documentReference).toBe(request.documentReference)
      })

      test('should save 1 delivery', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findAll()
        expect(delivery.length).toBe(1)
      })

      test('should save delivery with statement id', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        const delivery = await db.delivery.findOne()
        expect(delivery.statementId).toBe(statement.statementId)
      })

      test('should save delivery with method method', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.method).toBe(method)
      })

      test('should save delivery with SYSTEM_TIME', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.requested).toStrictEqual(SYSTEM_TIME)
      })

      test('should save delivery with null completed date', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.completed).toBeNull()
      })

      test('should save delivery with reference if reference', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBe(reference)
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = null

        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = undefined

        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should save 1 failure', async () => {
        await saveRequest(request, reference, method, reason)

        const failure = await db.failure.findAll()
        expect(failure.length).toBe(1)
      })

      test('should save failure with deliveryId', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findOne()
        const failure = await db.failure.findOne()
        expect(failure.deliveryId).toBe(delivery.deliveryId)
      })

      test('should save failure with reason as EMPTY', async () => {
        await saveRequest(request, reference, method, reason)

        const failure = await db.failure.findOne()
        expect(failure.reason).toBe(EMPTY)
      })

      test('should save failure with failed as SYSTEM_TIME', async () => {
        await saveRequest(request, reference, method, reason)

        const failure = await db.failure.findOne()
        expect(failure.failed).toStrictEqual(SYSTEM_TIME)
      })

      test('should send message to CRM', async () => {
        await saveRequest(request, reference, method, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalled()
        expect(mockMessageSender().closeConnection).toHaveBeenCalled()
      })

      test('should send 1 message to CRM', async () => {
        await saveRequest(request, reference, method, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
        expect(mockMessageSender().closeConnection).toHaveBeenCalledTimes(1)
      })

      test('should send message to CRM with correct content', async () => {
        await saveRequest(request, reference, method, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalledWith({
          ...MESSAGE,
          body: {
            email: request.email,
            errorMessage: EMPTY_ERROR,
            frn: request.frn
          }
        })
      })
    })

    describe('When failure reason is INVALID', () => {
      beforeEach(async () => {
        reason = INVALID
      })

      test('should save 1 statement', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findAll()
        expect(statement.length).toBe(1)
      })

      test('should save statement with business name', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.businessName).toBe(request.businessName)
      })

      test('should save statement with sbi', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.sbi).toBe(request.sbi)
      })

      test('should save statement with frn', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.frn).toBe(request.frn.toString())
      })

      test('should save statement with method', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.method).toBe(request.method)
      })

      test('should save statement with filename', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.filename).toBe(request.filename)
      })

      test('should save statement with address line 1', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine1).toBe(request.address.line1)
      })

      test('should save statement with address line 2', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine2).toBe(request.address.line2)
      })

      test('should save statement with address line 3', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine3).toBe(request.address.line3)
      })

      test('should save statement with address line 4', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine4).toBe(request.address.line4)
      })

      test('should save statement with address line 5', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine5).toBe(request.address.line5)
      })

      test('should save statement with address postcode', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.postcode).toBe(request.address.postcode)
      })

      test('should save statement with document reference', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        expect(statement.documentReference).toBe(request.documentReference)
      })

      test('should save 1 delivery', async () => {
        await saveRequest(request, reference, method, reason)

        const delivery = await db.delivery.findAll()
        expect(delivery.length).toBe(1)
      })

      test('should save delivery with statement id', async () => {
        await saveRequest(request, reference, method, reason)

        const statement = await db.statement.findOne()
        const delivery = await db.delivery.findOne()
        expect(delivery.statementId).toBe(statement.statementId)
      })

      test('should save delivery with email method', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.method).toBe(EMAIL)
      })

      test('should save delivery with SYSTEM_TIME', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.requested).toStrictEqual(SYSTEM_TIME)
      })

      test('should save delivery with null completed date', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.completed).toBeNull()
      })

      test('should save delivery with reference if reference', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBe(reference)
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = null

        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = undefined

        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should save 1 failure', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const failure = await db.failure.findAll()
        expect(failure.length).toBe(1)
      })

      test('should save failure with deliveryId', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        const failure = await db.failure.findOne()
        expect(failure.deliveryId).toBe(delivery.deliveryId)
      })

      test('should save failure with reason as INVALID', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const failure = await db.failure.findOne()
        expect(failure.reason).toBe(INVALID)
      })

      test('should save failure with failed as SYSTEM_TIME', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const failure = await db.failure.findOne()
        expect(failure.failed).toStrictEqual(SYSTEM_TIME)
      })

      test('should send message to CRM', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalled()
        expect(mockMessageSender().closeConnection).toHaveBeenCalled()
      })

      test('should send 1 message to CRM', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
        expect(mockMessageSender().closeConnection).toHaveBeenCalledTimes(1)
      })

      test('should send message to CRM with correct content', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalledWith({
          ...MESSAGE,
          body: {
            email: request.email,
            errorMessage: INVALID_ERROR,
            frn: request.frn
          }
        })
      })
    })

    describe('When failure reason is REJECTED', () => {
      beforeEach(async () => {
        reason = REJECTED
      })

      test('should save 1 statement', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findAll()
        expect(statement.length).toBe(1)
      })

      test('should save statement with business name', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.businessName).toBe(request.businessName)
      })

      test('should save statement with sbi', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.sbi).toBe(request.sbi)
      })

      test('should save statement with frn', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.frn).toBe(request.frn.toString())
      })

      test('should save statement with email', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.email).toBe(request.email)
      })

      test('should save statement with filename', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.filename).toBe(request.filename)
      })

      test('should save statement with address line 1', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine1).toBe(request.address.line1)
      })

      test('should save statement with address line 2', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine2).toBe(request.address.line2)
      })

      test('should save statement with address line 3', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine3).toBe(request.address.line3)
      })

      test('should save statement with address line 4', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine4).toBe(request.address.line4)
      })

      test('should save statement with address line 5', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.addressLine5).toBe(request.address.line5)
      })

      test('should save statement with address postcode', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.postcode).toBe(request.address.postcode)
      })

      test('should save statement with document reference', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        expect(statement.documentReference).toBe(request.documentReference)
      })

      test('should save 1 delivery', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findAll()
        expect(delivery.length).toBe(1)
      })

      test('should save delivery with statement id', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const statement = await db.statement.findOne()
        const delivery = await db.delivery.findOne()
        expect(delivery.statementId).toBe(statement.statementId)
      })

      test('should save delivery with email method', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.method).toBe(EMAIL)
      })

      test('should save delivery with SYSTEM_TIME', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.requested).toStrictEqual(SYSTEM_TIME)
      })

      test('should save delivery with null completed date', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.completed).toBeNull()
      })

      test('should save delivery with reference if reference', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBe(reference)
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = null

        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should save delivery with null reference when reference is null', async () => {
        reference = undefined

        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        expect(delivery.reference).toBeNull()
      })

      test('should save 1 failure', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const failure = await db.failure.findAll()
        expect(failure.length).toBe(1)
      })

      test('should save failure with deliveryId', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const delivery = await db.delivery.findOne()
        const failure = await db.failure.findOne()
        expect(failure.deliveryId).toBe(delivery.deliveryId)
      })

      test('should save failure with reason as REJECTED', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const failure = await db.failure.findOne()
        expect(failure.reason).toBe(REJECTED)
      })

      test('should save failure with failed as SYSTEM_TIME', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        const failure = await db.failure.findOne()
        expect(failure.failed).toStrictEqual(SYSTEM_TIME)
      })

      test('should send message to CRM', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalled()
        expect(mockMessageSender().closeConnection).toHaveBeenCalled()
      })

      test('should send 1 message to CRM', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
        expect(mockMessageSender().closeConnection).toHaveBeenCalledTimes(1)
      })

      test('should send message to CRM with correct content', async () => {
        await saveRequest(request, reference, EMAIL, reason)

        expect(mockMessageSender().sendMessage).toHaveBeenCalledWith({
          ...MESSAGE,
          body: {
            email: request.email,
            errorMessage: INVALID_ERROR,
            frn: request.frn
          }
        })
      })
    })

    describe('When failure reason is "Not known failure reason"', () => {
      beforeEach(async () => {
        reason = 'Not known failure reason'
      })

      test('should not save statement', async () => {
        try { await saveRequest(request, reference, EMAIL, reason) } catch {}

        const statement = await db.statement.findAll()
        expect(statement.length).toBe(0)
      })

      test('should not save delivery', async () => {
        try { await saveRequest(request, reference, EMAIL, reason) } catch {}

        const delivery = await db.delivery.findAll()
        expect(delivery.length).toBe(0)
      })

      test('should not save failure', async () => {
        try { await saveRequest(request, reference, EMAIL, reason) } catch {}

        const failure = await db.failure.findAll()
        expect(failure.length).toBe(0)
      })

      test('should not send message to CRM', async () => {
        try { await saveRequest(request, reference, EMAIL, reason) } catch {}

        expect(mockMessageSender().sendMessage).not.toHaveBeenCalled()
        expect(mockMessageSender().closeConnection).not.toHaveBeenCalled()
      })
    })
  })
})
