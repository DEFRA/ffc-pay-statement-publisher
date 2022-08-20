const db = require('../data')

const createFailure = async (deliveryId, reason) => {
  const transaction = await db.sequelize.transaction()
  try {
    await db.delivery.update({ completed: new Date() }, { where: { deliveryId }, transaction })
    await db.failure.create({ deliveryId, reason, failed: new Date() }, { transaction })
    await transaction.commit()
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

module.exports = createFailure
