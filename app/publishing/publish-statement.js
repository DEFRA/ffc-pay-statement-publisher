const { EMPTY, INVALID } = require('../constants/failure-reasons')
const { EMAIL } = require('../constants/methods')

const getPersonalisation = require('./get-personalisation')
const publish = require('./publish')
const saveRequest = require('./save-request')
const validateEmail = require('./validate-email')

const publishStatement = async (request) => {
  let reason
  let response
  try {
    validateEmail(request.email)
    const personalisation = getPersonalisation(request.scheme.name, request.scheme.shortName, request.scheme.year, request.scheme.frequency, request.businessName)
    response = await publish(request.email, request.filename, personalisation)
    console.log(`Statement published: ${request.filename}`)
  } catch (err) {
    console.log(err.message)
    switch (err.message) {
      case ('Email is invalid: Email cannot be empty.'):
        reason = EMPTY
        break
      case ('Email is invalid: The email provided is invalid.'):
        reason = INVALID
        break
      default:
        reason = undefined
        break
    }
  } finally {
    try {
      await saveRequest(request, response?.data.id, EMAIL, reason)
    } catch {
      console.log('Could not save the request')
    }
  }
}

module.exports = publishStatement
