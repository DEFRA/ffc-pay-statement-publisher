const createMessage = require('../../../../app/processing/crm/create-message')

let emailAddress
let errorMessage
let frn
let message

describe('Create CRM invalid email message from incoming message', () => {
  describe('When incoming message is valid', () => {
    beforeEach(() => {
      emailAddress = require('../../../mocks/components/email-address')
      errorMessage = 'bluh'
      frn = require('../../../mocks/components/frn')

      message = {
        emailAddress,
        errorMessage,
        frn
      }
    })

    test('should return an object', () => {
      const result = createMessage(message)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 3 keys', () => {
      const result = createMessage(message)
      expect(Object.keys(result)).toHaveLength(3)
    })

    test('should return an object with keys: "emailAddress", "errorMessage" and "frn"', () => {
      const result = createMessage(message)
      expect(Object.keys(result)).toStrictEqual(['emailAddress', 'errorMessage', 'frn'])
    })

    test('should return the emailAddress key with value emailAddress', () => {
      const result = createMessage(message)
      expect(result.emailAddress).toStrictEqual(emailAddress)
    })

    test('should return the errorMessage key with value errorMessage', () => {
      const result = createMessage(message)
      expect(result.errorMessage).toStrictEqual(errorMessage)
    })

    test('should return the frn key with value frn', () => {
      const result = createMessage(message)
      expect(result.frn).toStrictEqual(frn)
    })
  })

  describe('When incoming message is invalid', () => {
    beforeEach(() => {
      emailAddress = ''

      message = {
        emailAddress,
        errorMessage,
        frn
      }
    })

    test('should return an object', () => {
      const result = createMessage(message)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 3 keys', () => {
      const result = createMessage(message)
      expect(Object.keys(result)).toHaveLength(3)
    })

    test('should return an object with keys: "emailAddress", "errorMessage" and "frn"', () => {
      const result = createMessage(message)
      expect(Object.keys(result)).toStrictEqual(['emailAddress', 'errorMessage', 'frn'])
    })

    test('should return the emailAddress key with value emailAddress', () => {
      const result = createMessage(message)
      expect(result.emailAddress).toStrictEqual(emailAddress)
    })

    test('should return the errorMessage key with value errorMessage', () => {
      const result = createMessage(message)
      expect(result.errorMessage).toStrictEqual(errorMessage)
    })

    test('should return the frn key with value frn', () => {
      const result = createMessage(message)
      expect(result.frn).toStrictEqual(frn)
    })
  })
})
