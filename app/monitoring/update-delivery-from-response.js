const { DELIVERED, PERMANENT_FAILURE, TEMPORARY_FAILURE, TECHNICAL_FAILURE } = require('../statuses')
const completeDelivery = require('./complete-delivery')
const createFailure = require('./create-failure')
const rescheduleDelivery = require('./reschedule-delivery')

const updateDeliveryFromResponse = async (delivery, response) => {
  switch (response.data?.status) {
    case DELIVERED:
      await completeDelivery(delivery.deliveryId)
      break
    case PERMANENT_FAILURE:
      await createFailure(delivery, 'invalid email address')
      break
    case TEMPORARY_FAILURE:
      await createFailure(delivery, 'inbox full or rejected as spam')
      break
    case TECHNICAL_FAILURE:
      await createFailure(delivery, 'Notify service failure')
      await rescheduleDelivery(delivery)
      break
    default:
      break
  }
}

module.exports = updateDeliveryFromResponse
