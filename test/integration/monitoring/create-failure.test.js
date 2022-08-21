const db = require('../../../app/data')
const createFailure = require('../../../app/monitoring/create-failure')
const { mockDelivery2 } = require('../../mocks/mock-delivery')
const { mockStatement2 } = require('../../mocks/mock-statement')
const MOCK_FAIL_REASON = 'some failure reason'

describe('create failure', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))

    await db.sequelize.truncate({ cascade: true })
    await db.statement.bulkCreate([mockStatement2])
    await db.delivery.bulkCreate([mockDelivery2])
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('sets delivery complete', async () => {
    await createFailure(mockDelivery2, MOCK_FAIL_REASON)
    const delivery = await db.delivery.findByPk(mockDelivery2.deliveryId)
    expect(delivery.completed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('creates one failure', async () => {
    await createFailure(mockDelivery2, MOCK_FAIL_REASON)
    const failures = await db.failure.findAll({ where: { deliveryId: mockDelivery2.deliveryId } })
    expect(failures.length).toBe(1)
  })

  test('creates failure with reason', async () => {
    await createFailure(mockDelivery2, MOCK_FAIL_REASON)
    const failure = await db.failure.findOne({ where: { deliveryId: mockDelivery2.deliveryId } })
    expect(failure.reason).toBe(MOCK_FAIL_REASON)
  })

  test('creates failure with date', async () => {
    await createFailure(mockDelivery2, MOCK_FAIL_REASON)
    const failure = await db.failure.findOne({ where: { deliveryId: mockDelivery2.deliveryId } })
    expect(failure.failed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })
})
