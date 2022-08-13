jest.mock('ffc-messaging')
jest.mock('../../../app/data')
const processPublishMessage = require('../../../app/messaging/process-publish-message')
let receiver
let message

describe('process statement message', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    receiver = {
      completeMessage: jest.fn(),
      deadLetterMessage: jest.fn()
    }
    message = {
      body: {
        filename: 'test.pdf'
      }
    }
  })

  test('completes message on success', async () => {
    await processPublishMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledWith(message)
  })

  test('completes message on success only once', async () => {
    await processPublishMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledTimes(1)
  })
})
