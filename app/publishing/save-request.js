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

const saveStatement = async (statement, timestamp, transaction) => {
  const existingStatement = await db.statement.findOne({ where: { filename: statement.filename }, transaction })
  console.log('existingStatement', existingStatement)
  if (existingStatement) {
    return existingStatement
  }
  return db.statement.create({
    ...statement,
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
