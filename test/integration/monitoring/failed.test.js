const { mockMessageSender } = require('../../mocks/objects/ffc-messaging')

const db = require('../../../app/data')

const failed = require('../../../app/monitoring/failed')

const { mockStatement1: statement } = require('../../mocks/statement')
const { mockDelivery1: delivery } = require('../../mocks/delivery')

const { INVALID, REJECTED } = require('../../../app/constants/failure-reasons')

let mockMessage

describe('Notify failed to deliver', () => {
  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))

    mockMessage = JSON.parse(JSON.stringify(require('../../mocks/objects/message').CRM))

    await db.statement.create(statement)
    await db.delivery.create(delivery)
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await db.sequelize.truncate({ cascade: true })
  })

  afterAll(async () => {
    await db.sequelize.close()
  })

  describe('When reason is INVALID', () => {
    test('should send message to CRM', async () => {
      await failed(delivery, INVALID)

      expect(mockMessageSender().sendMessage).toHaveBeenCalled()
      expect(mockMessageSender().closeConnection).toHaveBeenCalled()
    })

    test('should send 1 message to CRM', async () => {
      await failed(delivery, INVALID)

      expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
      expect(mockMessageSender().closeConnection).toHaveBeenCalled()
    })

    test('should send message to CRM with mockMessage', async () => {
      await failed(delivery, INVALID)

      expect(mockMessageSender().sendMessage).toHaveBeenCalledWith(mockMessage)
      expect(mockMessageSender().closeConnection).toHaveBeenCalled()
    })

    test('should update delivery completed date', async () => {
      const deliveryBefore = await db.delivery.findByPk(delivery.deliveryId)

      await failed(delivery, INVALID)

      const deliveryAfter = await db.delivery.findByPk(delivery.deliveryId)
      expect(deliveryBefore.completed).toBeNull()
      expect(deliveryAfter.completed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
    })

    test('should create one failure', async () => {
      await failed(delivery, INVALID)

      const failures = await db.failure.findAll({ where: { deliveryId: delivery.deliveryId } })
      expect(failures.length).toBe(1)
    })

    test('should create failure with INVALID reason', async () => {
      await failed(delivery, INVALID)

      const failure = await db.failure.findOne({ where: { deliveryId: delivery.deliveryId } })
      expect(failure.reason).toBe(INVALID)
    })

    test('should create failure with date', async () => {
      await failed(delivery, INVALID)

      const failure = await db.failure.findOne({ where: { deliveryId: delivery.deliveryId } })
      expect(failure.failed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
    })
  })

  describe('When reason is REJECTED', () => {
    test('should send message to CRM', async () => {
      await failed(delivery, REJECTED)

      expect(mockMessageSender().sendMessage).toHaveBeenCalled()
      expect(mockMessageSender().closeConnection).toHaveBeenCalled()
    })

    test('should send 1 message to CRM', async () => {
      await failed(delivery, REJECTED)

      expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
      expect(mockMessageSender().closeConnection).toHaveBeenCalled()
    })

    test('should send message to CRM with mockMessage', async () => {
      await failed(delivery, REJECTED)

      expect(mockMessageSender().sendMessage).toHaveBeenCalledWith(mockMessage)
      expect(mockMessageSender().closeConnection).toHaveBeenCalled()
    })

    test('should update delivery completed date', async () => {
      const deliveryBefore = await db.delivery.findByPk(delivery.deliveryId)

      await failed(delivery, REJECTED)

      const deliveryAfter = await db.delivery.findByPk(delivery.deliveryId)
      expect(deliveryBefore.completed).toBeNull()
      expect(deliveryAfter.completed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
    })

    test('should create one failure', async () => {
      await failed(delivery, REJECTED)

      const failures = await db.failure.findAll({ where: { deliveryId: delivery.deliveryId } })
      expect(failures.length).toBe(1)
    })

    test('should create failure with REJECTED reason', async () => {
      await failed(delivery, REJECTED)

      const failure = await db.failure.findOne({ where: { deliveryId: delivery.deliveryId } })
      expect(failure.reason).toBe(REJECTED)
    })

    test('should create failure with date', async () => {
      await failed(delivery, REJECTED)

      const failure = await db.failure.findOne({ where: { deliveryId: delivery.deliveryId } })
      expect(failure.failed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
    })
  })
})
