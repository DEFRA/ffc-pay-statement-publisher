const db = require('../data')

const completeDelivery = async (deliveryId) => {
  await db.delivery.update({ completed: new Date() }, { where: { deliveryId } })
}

module.exports = completeDelivery
