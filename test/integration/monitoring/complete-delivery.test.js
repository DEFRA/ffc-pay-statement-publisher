const db = require('../../../app/data')
const completeDelivery = require('../../../app/monitoring/complete-delivery')
const { mockDelivery2 } = require('../../mocks/mock-delivery')
const { mockStatement2 } = require('../../mocks/mock-statement')

describe('complete delivery', () => {
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
    await completeDelivery(mockDelivery2.deliveryId)
    const delivery = await db.delivery.findByPk(mockDelivery2.deliveryId)
    expect(delivery.completed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })
})
