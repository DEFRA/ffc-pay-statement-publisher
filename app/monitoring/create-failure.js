const db = require('../data')

const createFailure = async (delivery, reason) => {
  const transaction = await db.sequelize.transaction()
  try {
    const statement = await db.statement.findOne({ where: { statementId: delivery.statementId } })
    console.error(`Unable to deliver statement ${statement.filename} to ${delivery.email}: ${reason}`)
    await db.delivery.update({ completed: new Date() }, { where: { deliveryId: delivery.deliveryId }, transaction })
    await db.failure.create({ deliveryId: delivery.deliveryId, reason, failed: new Date() }, { transaction })
    await transaction.commit()
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

module.exports = createFailure
