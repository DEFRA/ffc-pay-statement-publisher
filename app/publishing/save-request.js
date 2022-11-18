const db = require('../data')

const saveRequest = async (request, reference, method) => {
  const transaction = await db.sequelize.transaction()
  try {
    const timestamp = new Date()
    const statement = await saveStatement(request, timestamp, transaction)
    const delivery = await saveDelivery(statement.statementId, method, reference, timestamp, transaction)
    if (!reference) {
      const reason = 'No valid email address provided'
      console.log(`Unable to deliver statement ${statement.filename}: ${reason}`)
      await saveFailure(delivery.deliveryId, reason, transaction)
    }
    await transaction.commit()
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

const saveStatement = async (request, timestamp, transaction) => {
  return db.statement.create({
    ...request,
    addressLine1: request.address.line1,
    addressLine2: request.address.line2,
    addressLine3: request.address.line3,
    addressLine4: request.address.line4,
    addressLine5: request.address.line5,
    postcode: request.address.postcode,
    schemeName: request.scheme.name,
    schemeShortName: request.scheme.shortName,
    schemeYear: request.scheme.year,
    schemeFrequency: request.scheme.frequency,
    received: timestamp
  }, { transaction })
}

const saveDelivery = async (statementId, method, reference, timestamp, transaction) => {
  return db.delivery.create({
    statementId,
    method,
    reference,
    requested: timestamp
  }, { transaction })
}

const saveFailure = async (deliveryId, reason, transaction) => {
  await db.failure.create({ deliveryId, reason, failed: new Date() }, { transaction })
}

module.exports = saveRequest
