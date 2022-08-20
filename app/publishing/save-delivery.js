const db = require('../data')

const saveDelivery = async (request, reference, method) => {
  await db.delivery.create({
    statementId: request.statementId,
    method,
    reference,
    requested: new Date()
  })
}

module.exports = saveDelivery
