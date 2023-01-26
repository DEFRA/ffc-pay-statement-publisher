jest.mock('../../../../app/processing/crm/map-message')
const mapMessage = require('../../../../app/processing/crm/map-message')

jest.mock('../../../../app/processing/crm/validate-message')
const validateMessage = require('../../../../app/processing/crm/validate-message')

const getMessage = require('../../../../app/processing/crm/get-message')

const { EMPTY, INVALID } = require('../../../mocks/messages/crm')

let email
let frn
let reason
let errorMessage

let mappedMessage

describe('Create CRM invalid email message from incoming message', () => {
  beforeEach(() => {
    email = require('../../../mocks/components/email')
    frn = require('../../../mocks/components/frn')
    reason = require('../../../../app/constants/failure-reasons').INVALID
    errorMessage = require('../../../../app/constants/crm-error-messages').ERRONEOUS

    mappedMessage = {
      email,
      errorMessage,
      frn
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When incoming message is valid', () => {
    beforeEach(() => {
      mapMessage.mockReturnValue(mappedMessage)
      validateMessage.mockReturnValue(mappedMessage)
    })

    test('should call mapMessage', () => {
      getMessage(email, frn, reason)
      expect(mapMessage).toHaveBeenCalled()
    })

    test('should call mapMessage once', () => {
      getMessage(email, frn, reason)
      expect(mapMessage).toHaveBeenCalledTimes(1)
    })

    test('should call mapMessage with email, frn and reason', () => {
      getMessage(email, frn, reason)
      expect(mapMessage).toHaveBeenCalledWith(email, frn, reason)
    })

    test('should call validateMessage', () => {
      getMessage(email, frn, reason)
      expect(validateMessage).toHaveBeenCalled()
    })

    test('should call validateMessage once', () => {
      getMessage(email, frn, reason)
      expect(validateMessage).toHaveBeenCalledTimes(1)
    })

    test('should call validateMessage with mapMessage return value', () => {
      const message = mapMessage()
      getMessage(email, frn, reason)
      expect(validateMessage).toHaveBeenCalledWith(message)
    })

    test('should not throw', () => {
      const wrapper = () => { getMessage(email, frn, reason) }
      expect(wrapper).not.toThrow()
    })

    test('should return an object', () => {
      const result = getMessage(email, frn, reason)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 3 keys', () => {
      const result = getMessage(email, frn, reason)
      expect(Object.keys(result)).toHaveLength(3)
    })

    test('should return an object with keys: "email", "errorMessage" and "frn"', () => {
      const result = getMessage(email, frn, reason)
      expect(Object.keys(result)).toStrictEqual(['email', 'errorMessage', 'frn'])
    })

    test('should return the email key with value email', () => {
      const result = getMessage(email, frn, reason)
      expect(result.email).toStrictEqual(email)
    })

    test('should return the errorMessage key with value errorMessage', () => {
      const result = getMessage(email, frn, reason)
      expect(result.errorMessage).toStrictEqual(errorMessage)
    })

    test('should return the frn key with value frn', () => {
      const result = getMessage(email, frn, reason)
      expect(result.frn).toStrictEqual(frn)
    })

    test('should return mappedMessage', () => {
      const result = getMessage(email, frn, reason)
      expect(result).toStrictEqual(mappedMessage)
    })
  })

  describe('When validateMessage throws', () => {
    beforeEach(() => {
      validateMessage.mockImplementation(() => { throw new Error('Invalid message') })
    })

    test('should call mapMessage', () => {
      try { getMessage(email, frn, reason) } catch {}
      expect(mapMessage).toHaveBeenCalled()
    })

    test('should call mapMessage once', () => {
      try { getMessage(email, frn, reason) } catch {}
      expect(mapMessage).toHaveBeenCalledTimes(1)
    })

    test('should call mapMessage with email, frn and reason', () => {
      try { getMessage(email, frn, reason) } catch {}
      expect(mapMessage).toHaveBeenCalledWith(email, frn, reason)
    })

    test('should call validateMessage', () => {
      try { getMessage(email, frn, reason) } catch {}
      expect(validateMessage).toHaveBeenCalled()
    })

    test('should call validateMessage once', () => {
      try { getMessage(email, frn, reason) } catch {}
      expect(validateMessage).toHaveBeenCalledTimes(1)
    })

    test('should call validateMessage with mapMessage return value', () => {
      const message = mapMessage()
      try { getMessage(email, frn, reason) } catch {}
      expect(validateMessage).toHaveBeenCalledWith(message)
    })

    test('should throw', () => {
      const wrapper = () => { getMessage(email, frn, reason) }
      expect(wrapper).toThrow()
    })

    test('should throw Error', () => {
      const wrapper = () => { getMessage(email, frn, reason) }
      expect(wrapper).toThrow(Error)
    })

    test('should throw error "Invalid message"', () => {
      const wrapper = () => { getMessage(email, frn, reason) }
      expect(wrapper).toThrow(/^Invalid message$/)
    })
  })
})
