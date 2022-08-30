const db = require('../data')
const publish = require('../publishing/publish')

const rescheduleDelivery = async (delivery) => {
  const transaction = await db.sequelize.transaction()
  try {
    const timestamp = new Date()
    const statement = await db.statement.findOne({ where: { statementId: delivery.statementId }, transaction })
    const personalisation = { schemeName: statement.schemeName, schemeShortName: statement.schemeShortName, schemeYear: statement.schemeYear, schemeFrequency: statement.schemeFrequency, businessName: statement.businessName }
    const response = await publish(statement.email, statement.filename, personalisation)
    await db.delivery.create({ statementId: delivery.statementId, method: delivery.method, reference: response.data.id, requested: timestamp }, { transaction })
    await db.delivery.update({ completed: timestamp }, { where: { deliveryId: delivery.deliveryId }, transaction })
    await transaction.commit()
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

module.exports = rescheduleDelivery
