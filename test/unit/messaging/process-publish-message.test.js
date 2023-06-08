jest.mock('../../../app/messaging/validate-request')
const validateRequest = require('../../../app/messaging/validate-request')

jest.mock('../../../app/publishing/publish-statement')
const publishStatement = require('../../../app/publishing/publish-statement')

const { mockMessageReceiver } = require('../../mocks/modules/ffc-messaging')

const { VALIDATION } = require('../../../app/constants/errors')

const processPublishMessage = require('../../../app/messaging/process-publish-message')

let message
let receiver

describe('Process publish message', () => {
  beforeEach(() => {
    receiver = mockMessageReceiver()
    publishStatement.mockResolvedValue(undefined)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe.each([
    { name: 'statement', request: JSON.parse(JSON.stringify(require('../../mocks/messages/publish').STATEMENT_REQUEST)) },
    { name: 'schedule', request: JSON.parse(JSON.stringify(require('../../mocks/messages/publish').SCHEDULE_REQUEST)) }
  ])('When message is a $name', ({ name, request, expected }) => {
    beforeEach(async () => {
      message = {
        body: request
      }

      validateRequest.mockReturnValue({ value: message })
    })

    describe('When successful', () => {
      test('should call validateRequest', async () => {
        await processPublishMessage(message, receiver)
        expect(validateRequest).toHaveBeenCalled()
      })

      test('should call validateRequest once', async () => {
        await processPublishMessage(message, receiver)
        expect(validateRequest).toHaveBeenCalledTimes(1)
      })

      test('should call validateRequest with message.body', async () => {
        await processPublishMessage(message, receiver)
        expect(validateRequest).toHaveBeenCalledWith(message.body)
      })

      test('should call publishStatement', async () => {
        await processPublishMessage(message, receiver)
        expect(publishStatement).toHaveBeenCalled()
      })

      test('should call publishStatement once', async () => {
        await processPublishMessage(message, receiver)
        expect(publishStatement).toHaveBeenCalledTimes(1)
      })

      test('should call publishStatement with message.body', async () => {
        await processPublishMessage(message, receiver)
        expect(publishStatement).toHaveBeenCalledWith(message.body)
      })

      test('should call completeMessage', async () => {
        await processPublishMessage(message, receiver)
        expect(receiver.completeMessage).toHaveBeenCalled()
      })

      test('should call completeMessage once', async () => {
        await processPublishMessage(message, receiver)
        expect(receiver.completeMessage).toHaveBeenCalledTimes(1)
      })

      test('should call completeMessage with message', async () => {
        await processPublishMessage(message, receiver)
        expect(receiver.completeMessage).toHaveBeenCalledWith(message)
      })

      test('should not call deadLetterMessage', async () => {
        await processPublishMessage(message, receiver)
        expect(receiver.deadLetterMessage).not.toHaveBeenCalled()
      })
    })

    describe('When unsuccessful and a non-validation issue', () => {
      beforeEach(() => {
        publishStatement.mockRejectedValue(new Error('Issue publishing statement'))
      })

      test('should call validateRequest', async () => {
        await processPublishMessage(message, receiver)
        expect(validateRequest).toHaveBeenCalled()
      })

      test('should call validateRequest once', async () => {
        await processPublishMessage(message, receiver)
        expect(validateRequest).toHaveBeenCalledTimes(1)
      })

      test('should call validateRequest with message.body', async () => {
        await processPublishMessage(message, receiver)
        expect(validateRequest).toHaveBeenCalledWith(message.body)
      })

      test('should call publishStatement', async () => {
        await processPublishMessage(message, receiver)
        expect(publishStatement).toHaveBeenCalled()
      })

      test('should call publishStatement once', async () => {
        await processPublishMessage(message, receiver)
        expect(publishStatement).toHaveBeenCalledTimes(1)
      })

      test('should call publishStatement with message.body', async () => {
        await processPublishMessage(message, receiver)
        expect(publishStatement).toHaveBeenCalledWith(message.body)
      })

      test('should not call completeMessage', async () => {
        await processPublishMessage(message, receiver)
        expect(receiver.completeMessage).not.toHaveBeenCalled()
      })

      test('should not call deadLetterMessage', async () => {
        await processPublishMessage(message, receiver)
        expect(receiver.deadLetterMessage).not.toHaveBeenCalled()
      })
    })

    describe('When unsuccessful and a validation issue', () => {
      beforeEach(() => {
        const error = new Error('Invalid request')
        error.category = VALIDATION
        validateRequest.mockImplementation(() => { throw error })
      })

      test('should call validateRequest', async () => {
        await processPublishMessage(message, receiver)
        expect(validateRequest).toHaveBeenCalled()
      })

      test('should call validateRequest once', async () => {
        await processPublishMessage(message, receiver)
        expect(validateRequest).toHaveBeenCalledTimes(1)
      })

      test('should call validateRequest with message.body', async () => {
        await processPublishMessage(message, receiver)
        expect(validateRequest).toHaveBeenCalledWith(message.body)
      })

      test('should not call publishStatement', async () => {
        await processPublishMessage(message, receiver)
        expect(publishStatement).not.toHaveBeenCalled()
      })

      test('should call deadLetterMessage', async () => {
        await processPublishMessage(message, receiver)
        expect(receiver.deadLetterMessage).toHaveBeenCalled()
      })

      test('should call deadLetterMessage once', async () => {
        await processPublishMessage(message, receiver)
        expect(receiver.deadLetterMessage).toHaveBeenCalledTimes(1)
      })

      test('should call deadLetterMessage with message', async () => {
        await processPublishMessage(message, receiver)
        expect(receiver.deadLetterMessage).toHaveBeenCalledWith(message)
      })

      test('should not call completeMessage', async () => {
        await processPublishMessage(message, receiver)
        expect(receiver.completeMessage).not.toHaveBeenCalled()
      })
    })
  })
})
