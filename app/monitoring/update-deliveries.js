const checkDeliveryStatus = require('./check-delivery-status')
const getOutstandingDeliveries = require('./get-outstanding-deliveries')
const updateDeliveryFromResponse = require('./update-delivery-from-response')

const util = require('util')

const updateDeliveries = async () => {
  const outstanding = await getOutstandingDeliveries()
  for (const delivery of outstanding) {
    const response = await checkDeliveryStatus(delivery.reference)
    for (const x in Object.keys(response)) {
      console.log('key: ', response[x], util.inspect(response[x], false, null, true))
    }
    await updateDeliveryFromResponse(delivery, response)
  }
}

module.exports = updateDeliveries
