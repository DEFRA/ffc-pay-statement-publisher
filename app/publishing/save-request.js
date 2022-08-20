const db = require('../data')

const saveRequest = async (request, reference, method) => {
  const transaction = await db.sequelize.transaction()
  try {
    const timestamp = new Date()
    const statement = await saveStatement(request, timestamp, transaction)
    await saveDelivery(statement.statementId, method, reference, timestamp, transaction)
    await transaction.commit()
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

const saveStatement = async (request, timestamp, transaction) => {
  return db.statement.create({
    businessName: request.businessName,
    sbi: request.sbi,
    frn: request.frn,
    addressLine1: request.address.line1,
    addressLine2: request.address.line2,
    addressLine3: request.address.line3,
    addressLine4: request.address.line4,
    addressLine5: request.address.line5,
    postcode: request.address.postcode,
    email: request.email,
    filename: request.filename,
    received: timestamp
  }, { transaction })
}

const saveDelivery = async (statementId, method, reference, timestamp, transaction) => {
  await db.delivery.create({
    statementId,
    method,
    reference,
    requested: timestamp
  }, { transaction })
}

module.exports = saveRequest
