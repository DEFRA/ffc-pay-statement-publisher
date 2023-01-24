jest.mock('../../../../app/processing/crm/map-message')
const mapMessage = require('../../../../app/processing/crm/map-message')

jest.mock('../../../../app/processing/crm/validate-message')
const validateMessage = require('../../../../app/processing/crm/validate-message')

const getMessage = require('../../../../app/processing/crm/get-message')

const outgoingMessage = require('../../../mocks/messages/crm')

let incomingMessage

describe('Create CRM invalid email message from incoming message', () => {
  beforeEach(() => {
    incomingMessage = JSON.parse(JSON.stringify(require('../../../mocks/objects/invalid-email')))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When incoming message is valid', () => {
    beforeEach(() => {
      mapMessage.mockReturnValue(incomingMessage)
      validateMessage.mockReturnValue(outgoingMessage)
    })

    test('should call mapMessage', () => {
      getMessage(incomingMessage)
      expect(mapMessage).toHaveBeenCalled()
    })

    test('should call mapMessage once', () => {
      getMessage(incomingMessage)
      expect(mapMessage).toHaveBeenCalledTimes(1)
    })

    test('should call mapMessage with incomingMessage', () => {
      getMessage(incomingMessage)
      expect(mapMessage).toHaveBeenCalledWith(incomingMessage)
    })

    test('should call validateMessage', () => {
      getMessage(incomingMessage)
      expect(validateMessage).toHaveBeenCalled()
    })

    test('should call validateMessage once', () => {
      getMessage(incomingMessage)
      expect(validateMessage).toHaveBeenCalledTimes(1)
    })

    test('should call validateMessage with mapMessage return value', () => {
      const message = mapMessage()
      getMessage(incomingMessage)
      expect(validateMessage).toHaveBeenCalledWith(message)
    })

    test('should not throw', () => {
      const wrapper = () => { getMessage(incomingMessage) }
      expect(wrapper).not.toThrow()
    })

    test('should return an object', () => {
      const result = getMessage(incomingMessage)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 3 keys', () => {
      const result = getMessage(incomingMessage)
      expect(Object.keys(result)).toHaveLength(3)
    })

    test('should return an object with keys: "email", "errorMessage" and "frn"', () => {
      const result = getMessage(incomingMessage)
      expect(Object.keys(result)).toStrictEqual(['email', 'errorMessage', 'frn'])
    })

    test('should return the email key with value incomingMessage.email', () => {
      const result = getMessage(incomingMessage)
      expect(result.email).toStrictEqual(incomingMessage.email)
    })

    test('should return the errorMessage key with value incomingMessage.errorMessage', () => {
      const result = getMessage(incomingMessage)
      expect(result.errorMessage).toStrictEqual(incomingMessage.errorMessage)
    })

    test('should return the frn key with value incomingMessage.frn', () => {
      const result = getMessage(incomingMessage)
      expect(result.frn).toStrictEqual(incomingMessage.frn)
    })

    test('should return outgoingMessage', () => {
      const result = getMessage(incomingMessage)
      expect(result).toStrictEqual(outgoingMessage)
    })
  })

  describe('When incoming incomingMessage is invalid', () => {
    beforeEach(() => {
      incomingMessage = {
        ...incomingMessage,
        frn: 1
      }

      mapMessage.mockReturnValue(incomingMessage)
      validateMessage.mockImplementation(() => { throw new Error('') })
    })

    test('should call mapMessage', () => {
      try { getMessage(incomingMessage) } catch {}
      expect(mapMessage).toHaveBeenCalled()
    })

    test('should call mapMessage once', () => {
      try { getMessage(incomingMessage) } catch {}
      expect(mapMessage).toHaveBeenCalledTimes(1)
    })

    test('should call mapMessage with incomingMessage', () => {
      try { getMessage(incomingMessage) } catch {}
      expect(mapMessage).toHaveBeenCalledWith(incomingMessage)
    })

    test('should call validateMessage', () => {
      try { getMessage(incomingMessage) } catch {}
      expect(validateMessage).toHaveBeenCalled()
    })

    test('should call validateMessage once', () => {
      try { getMessage(incomingMessage) } catch {}
      expect(validateMessage).toHaveBeenCalledTimes(1)
    })

    test('should call validateMessage with mapMessage return value', () => {
      const message = mapMessage()
      try { getMessage(incomingMessage) } catch {}
      expect(validateMessage).toHaveBeenCalledWith(message)
    })

    test('should throw when validateMessage throws', () => {
      const wrapper = () => { getMessage(incomingMessage) }
      expect(wrapper).toThrow()
    })

    test('should throw Error when validateMessage throws Error', () => {
      const wrapper = () => { getMessage(incomingMessage) }
      expect(wrapper).toThrow(Error)
    })

    test('should throw error "" when validateMessage throws error ""', () => {
      const wrapper = () => { getMessage(incomingMessage) }
      expect(wrapper).toThrow('')
    })
  })
})
