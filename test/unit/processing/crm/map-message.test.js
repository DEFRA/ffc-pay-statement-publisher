jest.mock('../../../../app/processing/crm/map-crm-error-message')
const mapCrmErrorMessage = require('../../../../app/processing/crm/map-crm-error-message')

const mapMessage = require('../../../../app/processing/crm/map-message')

const { INVALID } = require('../../../../app/constants/crm-error-messages')

let email
let errorMessage
let frn
let message

describe('Create CRM invalid email message from incoming message', () => {
  beforeEach(() => {
    mapCrmErrorMessage.mockReturnValue(INVALID)

    errorMessage = 'We failed to send the statement because the email address provided was invalid.'
    frn = require('../../../mocks/components/frn')
  })

  describe('When email couldn\'t be delivered and email is valid', () => {
    beforeEach(() => {
      mapCrmErrorMessage.mockReturnValue(INVALID)

      email = require('../../../mocks/components/email')

      message = {
        email,
        errorMessage,
        frn
      }
    })

    test('should return an object', () => {
      const result = mapMessage(message)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 3 keys', () => {
      const result = mapMessage(message)
      expect(Object.keys(result)).toHaveLength(3)
    })

    test('should return an object with keys: "email", "errorMessage" and "frn"', () => {
      const result = mapMessage(message)
      expect(Object.keys(result)).toStrictEqual(['email', 'errorMessage', 'frn'])
    })

    test('should return the email key with value email', () => {
      const result = mapMessage(message)
      expect(result.email).toStrictEqual(email)
    })

    test('should return the errorMessage key with value errorMessage', () => {
      const result = mapMessage(message)
      expect(result.errorMessage).toStrictEqual(errorMessage)
    })

    test('should return the frn key with value frn', () => {
      const result = mapMessage(message)
      expect(result.frn).toStrictEqual(frn)
    })
  })

  describe('When email couldn\'t be delivered and email is valid', () => {
    beforeEach(() => {
      email = ''

      message = {
        email,
        errorMessage,
        frn
      }
    })

    test('should return an object', () => {
      const result = mapMessage(message)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 3 keys', () => {
      const result = mapMessage(message)
      expect(Object.keys(result)).toHaveLength(3)
    })

    test('should return an object with keys: "email", "errorMessage" and "frn"', () => {
      const result = mapMessage(message)
      expect(Object.keys(result)).toStrictEqual(['email', 'errorMessage', 'frn'])
    })

    test('should return the email key with value email', () => {
      const result = mapMessage(message)
      expect(result.email).toStrictEqual(email)
    })

    test('should return the errorMessage key with value errorMessage', () => {
      const result = mapMessage(message)
      expect(result.errorMessage).toStrictEqual(errorMessage)
    })

    test('should return the frn key with value frn', () => {
      const result = mapMessage(message)
      expect(result.frn).toStrictEqual(frn)
    })
  })

  describe('When email couldn\'t be delivered and email is invalid', () => {
    beforeEach(() => {
      email = 'not-valid'

      message = {
        email,
        errorMessage,
        frn
      }
    })

    test('should return an object', () => {
      const result = mapMessage(message)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 3 keys', () => {
      const result = mapMessage(message)
      expect(Object.keys(result)).toHaveLength(3)
    })

    test('should return an object with keys: "email", "errorMessage" and "frn"', () => {
      const result = mapMessage(message)
      expect(Object.keys(result)).toStrictEqual(['email', 'errorMessage', 'frn'])
    })

    test('should return the email key with value email', () => {
      const result = mapMessage(message)
      expect(result.email).toStrictEqual(email)
    })

    test('should return the errorMessage key with value errorMessage', () => {
      const result = mapMessage(message)
      expect(result.errorMessage).toStrictEqual(errorMessage)
    })

    test('should return the frn key with value frn', () => {
      const result = mapMessage(message)
      expect(result.frn).toStrictEqual(frn)
    })
  })
})
