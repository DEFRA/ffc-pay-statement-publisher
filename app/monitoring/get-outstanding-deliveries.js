const db = require('../data')

const getOutstandingDeliveries = async () => {
  return db.delivery.findAll({ where: { completed: null } })
}

module.exports = getOutstandingDeliveries
