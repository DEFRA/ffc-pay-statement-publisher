jest.mock('ffc-messaging')
jest.mock('../../../app/data')
const mockPublish = jest.fn()
jest.mock('../../../app/publishing', () => {
  return mockPublish
})
const mockValidation = jest.fn()
jest.mock('../../../app/messaging/validate-request', () => {
  return mockValidation
})
const processPublishMessage = require('../../../app/messaging/process-publish-message')
const mockRequest = require('../../mocks/request')
const { VALIDATION } = require('../../../app/errors')
let receiver

const mockValidationImplementation = () => {
  const err = new Error('Validation error')
  err.category = VALIDATION
  throw err
}

describe('process publish message', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    receiver = {
      completeMessage: jest.fn(),
      deadLetterMessage: jest.fn()
    }
  })

  test('completes message on success', async () => {
    const message = {
      body: mockRequest
    }
    await processPublishMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledWith(message)
  })

  test('completes message on success only once', async () => {
    const message = {
      body: mockRequest
    }
    await processPublishMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledTimes(1)
  })

  test('calls validate request', async () => {
    const message = {
      body: mockRequest
    }
    await processPublishMessage(message, receiver)
    expect(mockValidation).toHaveBeenCalledWith(message.body)
  })

  test('calls validate request only once', async () => {
    const message = {
      body: mockRequest
    }
    await processPublishMessage(message, receiver)
    expect(mockValidation).toHaveBeenCalledTimes(1)
  })

  test('calls publish with statement', async () => {
    const message = {
      body: mockRequest
    }
    await processPublishMessage(message, receiver)
    expect(mockPublish).toHaveBeenCalledWith(message.body)
  })

  test('calls publish with request only once', async () => {
    const message = {
      body: mockRequest
    }
    await processPublishMessage(message, receiver)
    expect(mockPublish).toHaveBeenCalledTimes(1)
  })

  test('does not complete message on error', async () => {
    const message = {
      body: mockRequest
    }
    mockPublish.mockImplementation(() => { throw new Error('Unable to generate') })
    await processPublishMessage(message, receiver)
    expect(receiver.completeMessage).not.toHaveBeenCalled()
  })

  test('does not dead letter message on non-validation error', async () => {
    const message = {
      body: mockRequest
    }
    mockPublish.mockImplementation(() => { throw new Error('Unable to publish') })
    await processPublishMessage(message, receiver)
    expect(receiver.deadLetterMessage).not.toHaveBeenCalled()
  })

  test('dead letters message if validation error', async () => {
    const message = {
      body: mockRequest
    }
    mockValidation.mockImplementation(() => mockValidationImplementation())
    await processPublishMessage(message, receiver)
    expect(receiver.deadLetterMessage).toHaveBeenCalledWith(message)
  })

  test('dead letters message only once if validation error', async () => {
    const message = {
      body: mockRequest
    }
    mockValidation.mockImplementation(() => mockValidationImplementation())
    await processPublishMessage(message, receiver)
    expect(receiver.deadLetterMessage).toHaveBeenCalledTimes(1)
  })

  test('does not complete message if validation error', async () => {
    const message = {
      body: mockRequest
    }
    mockValidation.mockImplementation(() => mockValidationImplementation())
    await processPublishMessage(message, receiver)
    expect(receiver.completeMessage).not.toHaveBeenCalled()
  })

  test('does not dead letter message on non-validation error', async () => {
    const message = {
      body: mockRequest
    }
    mockPublish.mockImplementation(() => {
      throw new Error('A publish error')
    })
    await processPublishMessage(message, receiver)
    expect(receiver.deadLetterMessage).not.toHaveBeenCalled()
  })

  test('does not complete message on non-validation error', async () => {
    const message = {
      body: mockRequest
    }
    mockPublish.mockImplementation(() => {
      throw new Error('A publish error')
    })
    await processPublishMessage(message, receiver)
    expect(receiver.completeMessage).not.toHaveBeenCalled()
  })
})
