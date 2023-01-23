const db = require('../data')

const createFailure = async (deliveryId, reason, transaction) => {
  await db.failures.create({
    deliveryId,
    reason
  }, { transaction })
}

module.exports = createFailure
