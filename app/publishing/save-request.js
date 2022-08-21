const db = require('../data')

const saveRequest = async (statement, reference, method) => {
  const transaction = await db.sequelize.transaction()
  try {
    const timestamp = new Date()
    const savedStatement = await saveStatement(statement, timestamp, transaction)
    await saveDelivery(savedStatement.statementId, method, reference, timestamp, transaction)
    await transaction.commit()
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

const saveStatement = async (statement, timestamp, transaction) => {
  const existingStatement = await db.statement.findOne({ where: { filename: statement.filename }, transaction })
  if (existingStatement) {
    return existingStatement
  }
  return db.statement.create({
    ...statement,
    received: timestamp
  }, { transaction })
}

const saveDelivery = async (statementId, method, reference, timestamp, transaction) => {
  try {
    await db.delivery.create({
      statementId,
      method,
      reference,
      requested: timestamp
    }, { transaction })
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = saveRequest
