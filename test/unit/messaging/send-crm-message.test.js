const mockConfig = { crmTopic: 'mockCRMTopic' }
jest.mock('../../../app/config', () => {
  return mockConfig
})

jest.mock('../../../app/processing/crm/get-message')
const getMessage = require('../../../app/processing/crm/get-message')

jest.mock('../../../app/messaging/send-message')
const sendMessage = require('../../../app/messaging/send-message')

const sendCrmMessage = require('../../../app/messaging/send-crm-message')

const { CRM: CRM_MESSAGE_TYPE } = require('../../../app/constants/message-types')
const SOURCE = require('../../../app/constants/message-source')

const outgoingMessage = require('../../mocks/messages/crm')

let incomingMessage

describe('Send invalid email message to CRM', () => {
  beforeEach(() => {
    incomingMessage = JSON.parse(JSON.stringify(require('../../mocks/objects/invalid-email')))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When incoming message is valid', () => {
    beforeEach(() => {
      getMessage.mockReturnValue(outgoingMessage)
      sendMessage.mockResolvedValue(undefined)
    })

    test('should call getMessage', async () => {
      await sendCrmMessage(incomingMessage)
      expect(getMessage).toHaveBeenCalled()
    })

    test('should call getMessage once', async () => {
      await sendCrmMessage(incomingMessage)
      expect(getMessage).toHaveBeenCalledTimes(1)
    })

    test('should call getMessage with incomingMessage', async () => {
      await sendCrmMessage(incomingMessage)
      expect(getMessage).toHaveBeenCalledWith(incomingMessage)
    })

    test('should call sendMessage', async () => {
      await sendCrmMessage(incomingMessage)
      expect(sendMessage).toHaveBeenCalled()
    })

    test('should call sendMessage once', async () => {
      await sendCrmMessage(incomingMessage)
      expect(sendMessage).toHaveBeenCalledTimes(1)
    })

    test('should call sendMessage with getMessage return value, CRM_MESSAGE_TYPE and object with mockConfig.crmTopic and SOURCE', async () => {
      const message = getMessage()
      await sendCrmMessage(incomingMessage)
      expect(sendMessage).toHaveBeenCalledWith(message, CRM_MESSAGE_TYPE, { ...mockConfig.crmTopic, source: SOURCE })
    })

    test('should not throw', async () => {
      const wrapper = async () => { try { await sendCrmMessage(incomingMessage) } catch {} }
      wrapper()
      expect(wrapper).not.toThrow()
    })

    test('should return undefined', async () => {
      const result = await sendCrmMessage(incomingMessage)
      expect(result).toBeUndefined()
    })
  })

  describe('When incoming message is invalid', () => {
    beforeEach(() => {
      incomingMessage = {
        ...incomingMessage,
        frn: 1
      }

      getMessage.mockImplementation(() => { throw new Error('ffd') })
      sendMessage.mockResolvedValue(undefined)
    })

    test('should call getMessage', async () => {
      try { await sendCrmMessage(incomingMessage) } catch {}
      expect(getMessage).toHaveBeenCalled()
    })

    test('should call getMessage once', async () => {
      try { await sendCrmMessage(incomingMessage) } catch {}
      expect(getMessage).toHaveBeenCalledTimes(1)
    })

    test('should call getMessage with incomingMessage', async () => {
      try { await sendCrmMessage(incomingMessage) } catch {}
      expect(getMessage).toHaveBeenCalledWith(incomingMessage)
    })

    test('should not call sendMessage', async () => {
      try { await sendCrmMessage(incomingMessage) } catch {}
      expect(sendMessage).not.toHaveBeenCalled()
    })

    test('should throw when getMessage throws', async () => {
      const wrapper = async () => { await sendCrmMessage(incomingMessage) }
      expect(wrapper).rejects.toThrow()
    })

    test('should throw Error when getMessage throws Error', async () => {
      const wrapper = async () => { await sendCrmMessage(incomingMessage) }
      expect(wrapper).rejects.toThrow(Error)
    })

    test('should throw error "" when getMessage throws error ""', async () => {
      const wrapper = async () => { await sendCrmMessage(incomingMessage) }
      expect(wrapper).rejects.toThrow('')
    })
  })

  describe('When Service Bus fails to send', () => {
    beforeEach(() => {
      getMessage.mockReturnValue(outgoingMessage)
      sendMessage.mockRejectedValue(new Error('Issue sending the message via Service Bus'))
    })

    test('should call getMessage', async () => {
      try { await sendCrmMessage(incomingMessage) } catch {}
      expect(getMessage).toHaveBeenCalled()
    })

    test('should call getMessage once', async () => {
      try { await sendCrmMessage(incomingMessage) } catch {}
      expect(getMessage).toHaveBeenCalledTimes(1)
    })

    test('should call getMessage with incomingMessage', async () => {
      try { await sendCrmMessage(incomingMessage) } catch {}
      expect(getMessage).toHaveBeenCalledWith(incomingMessage)
    })

    test('should call sendMessage', async () => {
      try { await sendCrmMessage(incomingMessage) } catch {}
      expect(sendMessage).toHaveBeenCalled()
    })

    test('should call sendMessage once', async () => {
      try { await sendCrmMessage(incomingMessage) } catch {}
      expect(sendMessage).toHaveBeenCalledTimes(1)
    })

    test('should call sendMessage with getMessage return value, CRM_MESSAGE_TYPE and object with mockConfig.crmTopic and SOURCE', async () => {
      const message = getMessage()
      try { await sendCrmMessage(incomingMessage) } catch {}
      expect(sendMessage).toHaveBeenCalledWith(message, CRM_MESSAGE_TYPE, { ...mockConfig.crmTopic, source: SOURCE })
    })

    test('should throw when sendMessage throws', async () => {
      const wrapper = async () => { await sendCrmMessage(incomingMessage) }
      expect(wrapper).rejects.toThrow()
    })

    test('should throw Error when sendMessage throws Error', async () => {
      const wrapper = async () => { await sendCrmMessage(incomingMessage) }
      expect(wrapper).rejects.toThrow(Error)
    })

    test('should throw error "" when sendMessage throws error ""', async () => {
      const wrapper = async () => { await sendCrmMessage(incomingMessage) }
      expect(wrapper).rejects.toThrow('')
    })
  })
})
