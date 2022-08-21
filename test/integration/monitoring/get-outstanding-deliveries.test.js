const db = require('../../../app/data')
const getOutstandingDeliveries = require('../../../app/monitoring/get-outstanding-deliveries')
let mockDelivery1
let mockDelivery2
let mockStatement1
let mockStatement2

describe('get outstanding deliveries', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))

    mockStatement1 = JSON.parse(JSON.stringify(require('../../mocks/statement').mockStatement1))
    mockStatement2 = JSON.parse(JSON.stringify(require('../../mocks/statement').mockStatement2))
    mockDelivery1 = JSON.parse(JSON.stringify(require('../../mocks/delivery').mockDelivery1))
    mockDelivery2 = JSON.parse(JSON.stringify(require('../../mocks/delivery').mockDelivery2))

    await db.sequelize.truncate({ cascade: true })
    await db.statement.bulkCreate([mockStatement1, mockStatement2])
    await db.delivery.bulkCreate([mockDelivery1, mockDelivery2])
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('returns correct number of outstanding deliveries', async () => {
    const result = await getOutstandingDeliveries()
    expect(result.length).toBe(1)
  })

  test('returns correct outstanding delivery', async () => {
    const result = await getOutstandingDeliveries()
    expect(result[0].deliveryId).toBe(mockDelivery1.deliveryId)
  })
})
