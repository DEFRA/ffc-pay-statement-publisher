const db = require('../../../app/data')
const completeDelivery = require('../../../app/monitoring/complete-delivery')
let mockStatement1
let mockDelivery1

describe('complete delivery', () => {
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
    await completeDelivery(mockDelivery1.deliveryId)
    const delivery = await db.delivery.findByPk(mockDelivery1.deliveryId)
    expect(delivery.completed).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })
})
