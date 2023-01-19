const { INVALID, REJECTED } = require('../constants/failure-reasons')
const { DELIVERED, PERMANENT_FAILURE, TEMPORARY_FAILURE, TECHNICAL_FAILURE } = require('../constants/statuses')
const completeDelivery = require('./complete-delivery')
const createFailure = require('./create-failure')
const rescheduleDelivery = require('./reschedule-delivery')

const updateDeliveryFromResponse = async (delivery, response) => {
  switch (response.data?.status) {
    case DELIVERED:
      await completeDelivery(delivery.deliveryId)
      break
    case PERMANENT_FAILURE:
      await createFailure(delivery, INVALID)
      break
    case TEMPORARY_FAILURE:
      await createFailure(delivery, REJECTED)
      break
    case TECHNICAL_FAILURE:
      await rescheduleDelivery(delivery)
      break
    default:
      break
  }
}

module.exports = updateDeliveryFromResponse
