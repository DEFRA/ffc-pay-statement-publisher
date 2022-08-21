const db = require('../data')
const publishStatement = require('../publishing')

const rescheduleDelivery = async (delivery) => {
  const statement = await db.statement.findOne({ where: { statementId: delivery.statementId } })
  await publishStatement(statement)
  await db.delivery.update({ completed: new Date() }, { where: { deliveryId: delivery.deliveryId } })
}

module.exports = rescheduleDelivery
