const db = require('../data')

const saveDelivery = async (request, response, method) => {
  await db.delivery.create({
    statementId: request.statementId,
    method,
    reference: response.id,
    requested: new Date()
  })
}

module.exports = saveDelivery
