let sendSBMessage = jest.fn()
let closeConnection = jest.fn()
jest.mock('ffc-messaging', () => {
  return {
    MessageSender: jest.fn().mockImplementation(() => {
      return {
        sendSBMessage,
        closeConnection
      }
    })
  }
})

jest.mock('../../../app/messaging/create-message')
const createMessage = require('../../../app/messaging/create-message')

const { CRM: CRM_MESSAGE_TYPE } = require('../../../app/constants/message-types')
const SOURCE = require('../../../app/constants/message-source')

const sendMessage = require('../../../app/messaging/send-message')

const body = 'Hello World!'
const config = {}

describe('Send message', () => {
  beforeEach(() => {
    sendSBMessage = jest.fn()
    closeConnection = jest.fn()

    createMessage.mockReturnValue({
      body,
      CRM_MESSAGE_TYPE,
      source: SOURCE
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call createMessage', async () => {
    await sendMessage(body, CRM_MESSAGE_TYPE, config)
    expect(createMessage).toHaveBeenCalled()
  })

  test('should call createMessage once', async () => {
    await sendMessage(body, CRM_MESSAGE_TYPE, config)
    expect(createMessage).toHaveBeenCalledTimes(1)
  })

  test('should call createMessage with body and CRM_MESSAGE_TYPE', async () => {
    await sendMessage(body, CRM_MESSAGE_TYPE, config)
    expect(createMessage).toHaveBeenCalledWith(body, CRM_MESSAGE_TYPE)
  })

  test('should call sendSBMessage', async () => {
    await sendMessage(body, CRM_MESSAGE_TYPE, config)
    expect(sendSBMessage).toHaveBeenCalled()
  })

  test('should call sendSBMessage once', async () => {
    await sendMessage(body, CRM_MESSAGE_TYPE, config)
    expect(sendSBMessage).toHaveBeenCalledTimes(1)
  })

  test('should call sendSBMessage with createMessage return value', async () => {
    const message = createMessage()
    await sendMessage(body, CRM_MESSAGE_TYPE, config)
    expect(sendSBMessage).toHaveBeenCalledWith(message)
  })

  test('should call closeConnection', async () => {
    await sendMessage(body, CRM_MESSAGE_TYPE, config)
    expect(closeConnection).toHaveBeenCalled()
  })

  test('should call closeConnection once', async () => {
    await sendMessage(body, CRM_MESSAGE_TYPE, config)
    expect(closeConnection).toHaveBeenCalledTimes(1)
  })

  test('should return undefined', async () => {
    const result = await sendMessage(body, CRM_MESSAGE_TYPE, config)
    expect(result).toBeUndefined()
  })

  test('should throw error when sendSBMessage throws error ', async () => {
    sendSBMessage.mockRejectedValue(new Error('FFC Messaging issue sending message'))

    const wrapper = async () => {
      await sendMessage(body, CRM_MESSAGE_TYPE, config)
    }

    expect(wrapper).rejects.toThrow()
  })

  test('should throw Error when sendSBMessage throws Error', async () => {
    sendSBMessage.mockRejectedValue(new Error('FFC Messaging issue sending message'))

    const wrapper = async () => {
      await sendMessage(body, CRM_MESSAGE_TYPE, config)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw error with "FFC Messaging issue sending message" when sendSBMessage throws error with "FFC Messaging issue sending message"', async () => {
    sendSBMessage.mockRejectedValue(new Error('FFC Messaging issue sending message'))

    const wrapper = async () => {
      await sendMessage(body, CRM_MESSAGE_TYPE, config)
    }

    expect(wrapper).rejects.toThrow(/^FFC Messaging issue sending message$/)
  })

  test('should throw error when closeConnection throws error ', async () => {
    closeConnection.mockRejectedValue(new Error('FFC Messaging issue closing connection'))

    const wrapper = async () => {
      await sendMessage(body, CRM_MESSAGE_TYPE, config)
    }

    expect(wrapper).rejects.toThrow()
  })

  test('should throw error with "FFC Messaging issue closing connection" when closeConnection throws error with "FFC Messaging issue closing connection"', async () => {
    closeConnection.mockRejectedValue(new Error('FFC Messaging issue closing connection'))

    const wrapper = async () => {
      await sendMessage(body, CRM_MESSAGE_TYPE, config)
    }

    expect(wrapper).rejects.toThrow(/^FFC Messaging issue closing connection$/)
  })
})
