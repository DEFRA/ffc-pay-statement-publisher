const db = require('../../../app/data')
const createFailure = require('../../../app/monitoring/create-failure')
let mockStatement1
let mockDelivery1
const MOCK_FAIL_REASON = 'some failure reason'

describe('create failure', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))

    mockStatement1 = JSON.parse(JSON.stringify(require('../../mocks/statement').mockStatement1))
    mockDelivery1 = JSON.parse(JSON.stringify(require('../../mocks/delivery').mockDelivery1))

    await db.sequelize.truncate({ cascade: true })
    await db.statement.bulkCreate([mockStatement1])
    await db.delivery.bulkCreate([mockDelivery1])
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('sets delivery complete', async () => {
    await createFailure(mockDelivery1, MOCK_FAIL_REASON)
    const delivery = await db.delivery.findByPk(mockDelivery1.deliveryId)
    expect(delivery.completed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('creates one failure', async () => {
    await createFailure(mockDelivery1, MOCK_FAIL_REASON)
    const failures = await db.failure.findAll({ where: { deliveryId: mockDelivery1.deliveryId } })
    expect(failures.length).toBe(1)
  })

  test('creates failure with reason', async () => {
    await createFailure(mockDelivery1, MOCK_FAIL_REASON)
    const failure = await db.failure.findOne({ where: { deliveryId: mockDelivery1.deliveryId } })
    expect(failure.reason).toBe(MOCK_FAIL_REASON)
  })

  test('creates failure with date', async () => {
    await createFailure(mockDelivery1, MOCK_FAIL_REASON)
    const failure = await db.failure.findOne({ where: { deliveryId: mockDelivery1.deliveryId } })
    expect(failure.failed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })
})
