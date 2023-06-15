jest.mock('../../../app/processing/publish/get-exisiting-document')
const getExistingDocument = require('../../../app/processing/publish/get-exisiting-document')

jest.mock('../../../app/publishing/validate-email')
const validateEmail = require('../../../app/publishing/validate-email')

jest.mock('../../../app/publishing/get-personalisation')
const getPersonalisation = require('../../../app/publishing/get-personalisation')

jest.mock('../../../app/publishing/publish')
const publish = require('../../../app/publishing/publish')

jest.mock('../../../app/publishing/handle-publish-reasoning')
const handlePublishReasoning = require('../../../app/publishing/handle-publish-reasoning')

jest.mock('../../../app/publishing/save-request')
const saveRequest = require('../../../app/publishing/save-request')

const publishStatement = require('../../../app/publishing/publish-statement')

const { EMPTY, INVALID } = require('../../../app/constants/failure-reasons')
const { EMAIL } = require('../../../app/constants/methods')

const NOTIFY_RESPONSE = JSON.parse(JSON.stringify(require('../../mocks/objects/notify-response').NOTIFY_RESPONSE_DELIVERED))
const NOTIFY_ID = NOTIFY_RESPONSE.data.id
const MOCK_PERSONALISATION = {
  schemeName: 'Test Scheme',
  schemeShortName: 'TS',
  schemeYear: '2021',
  schemeFrequency: 'Monthly',
  businessName: 'Test Business'
}

let error

describe('Publish document', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe.each([
    { name: 'statement', request: JSON.parse(JSON.stringify(require('../../mocks/messages/publish').STATEMENT_MESSAGE)).body },
    { name: 'schedule', request: JSON.parse(JSON.stringify(require('../../mocks/messages/publish').SCHEDULE_MESSAGE)).body }
  ])('When request is a $name', ({ name, request }) => {
    describe('When it is a duplicate', () => {
      beforeEach(async () => {
        getExistingDocument.mockResolvedValue(true)
      })

      test('should call getExistingDocument', async () => {
        await publishStatement(request)
        expect(getExistingDocument).toHaveBeenCalled()
      })

      test('should call getExistingDocument once', async () => {
        await publishStatement(request)
        expect(getExistingDocument).toHaveBeenCalledTimes(1)
      })

      test('should call getExistingDocument with request.documentReference', async () => {
        await publishStatement(request)
        expect(getExistingDocument).toHaveBeenCalledWith(request.documentReference)
      })

      test('should not call validateEmail', async () => {
        await publishStatement(request)
        expect(validateEmail).not.toHaveBeenCalled()
      })

      test('should not call getPersonalisation', async () => {
        await publishStatement(request)
        expect(getPersonalisation).not.toHaveBeenCalled()
      })

      test('should not call publish', async () => {
        await publishStatement(request)
        expect(publish).not.toHaveBeenCalled()
      })

      test('should not call saveRequest', async () => {
        await publishStatement(request)
        expect(saveRequest).not.toHaveBeenCalled()
      })

      test('should not call handlePublishReasoning', async () => {
        await publishStatement(request)
        expect(handlePublishReasoning).not.toHaveBeenCalled()
      })

      test('should not call saveRequest', async () => {
        await publishStatement(request)
        expect(saveRequest).not.toHaveBeenCalled()
      })

      test('should not throw', async () => {
        const wrapper = async () => { await publishStatement(request) }
        expect(wrapper).not.toThrow()
      })

      test('should return undefined', async () => {
        const result = await publishStatement(request)
        expect(result).toBeUndefined()
      })

      describe('When getExistingDocument throws', () => {
        beforeEach(() => {
          error = new Error('Issue retrieving document.')

          getExistingDocument.mockRejectedValue(error)
        })

        test('should call getExistingDocument', async () => {
          await publishStatement(request)
          expect(getExistingDocument).toHaveBeenCalled()
        })

        test('should call getExistingDocument once', async () => {
          await publishStatement(request)
          expect(getExistingDocument).toHaveBeenCalledTimes(1)
        })

        test('should call getExistingDocument with request.documentReference', async () => {
          await publishStatement(request)
          expect(getExistingDocument).toHaveBeenCalledWith(request.documentReference)
        })

        test('should not call validateEmail', async () => {
          try { await publishStatement(request) } catch {}
          expect(validateEmail).not.toHaveBeenCalled()
        })

        test('should not call getPersonalisation', async () => {
          await publishStatement(request)
          expect(getPersonalisation).not.toHaveBeenCalled()
        })

        test('should not call publish', async () => {
          await publishStatement(request)
          expect(publish).not.toHaveBeenCalled()
        })

        test('should not call handlePublishReasoning', async () => {
          try { await publishStatement(request) } catch {}
          expect(handlePublishReasoning).not.toHaveBeenCalled()
        })

        test('should not call saveRequest', async () => {
          try { await publishStatement(request) } catch {}
          expect(saveRequest).not.toHaveBeenCalled()
        })

        test('should not throw', async () => {
          const wrapper = async () => { await publishStatement(request) }
          expect(wrapper).not.toThrow()
        })

        test('should return undefined', async () => {
          const result = await publishStatement(request)
          expect(result).toBeUndefined()
        })
      })
    })

    describe('When it is not a duplicate', () => {
      beforeEach(() => {
        getExistingDocument.mockResolvedValue(null)
        validateEmail.mockReturnValue({ value: request.email })
        getPersonalisation.mockReturnValue(MOCK_PERSONALISATION)
        handlePublishReasoning.mockReturnValue(undefined)
        publish.mockResolvedValue(NOTIFY_RESPONSE)
        saveRequest.mockResolvedValue(undefined)
      })

      describe('When it has a valid email', () => {
        beforeEach(() => {
          error = undefined
        })

        test('should call getExistingDocument', async () => {
          await publishStatement(request)
          expect(getExistingDocument).toHaveBeenCalled()
        })

        test('should call getExistingDocument once', async () => {
          await publishStatement(request)
          expect(getExistingDocument).toHaveBeenCalledTimes(1)
        })

        test('should call getExistingDocument with request.documentReference', async () => {
          await publishStatement(request)
          expect(getExistingDocument).toHaveBeenCalledWith(request.documentReference)
        })

        test('should call validateEmail', async () => {
          await publishStatement(request)
          expect(validateEmail).toHaveBeenCalled()
        })

        test('should call validateEmail once', async () => {
          await publishStatement(request)
          expect(validateEmail).toHaveBeenCalledTimes(1)
        })

        test('should call validateEmail with request.email', async () => {
          await publishStatement(request)
          expect(validateEmail).toHaveBeenCalledWith(request.email)
        })

        test('should call getPersonalisation', async () => {
          await publishStatement(request)
          expect(getPersonalisation).toHaveBeenCalled()
        })

        test('should call getPersonalisation once', async () => {
          await publishStatement(request)
          expect(getPersonalisation).toHaveBeenCalledTimes(1)
        })

        test('should call getPersonalisation with request.scheme.name, request.scheme.shortName, request.scheme.year, request.scheme.frequency and request.businessName', async () => {
          await publishStatement(request)
          expect(getPersonalisation).toHaveBeenCalledWith(request.scheme.name, request.scheme.shortName, request.scheme.year, request.scheme.frequency, request.businessName)
        })

        test('should call publish', async () => {
          await publishStatement(request)
          expect(publish).toHaveBeenCalled()
        })

        test('should call publish once', async () => {
          await publishStatement(request)
          expect(publish).toHaveBeenCalledTimes(1)
        })

        test('should call publish with request.email, request.filename and MOCK_PERSONALISATION', async () => {
          await publishStatement(request)
          expect(publish).toHaveBeenCalledWith(request.email, request.filename, MOCK_PERSONALISATION)
        })

        test('should call saveRequest', async () => {
          await publishStatement(request)
          expect(saveRequest).toHaveBeenCalled()
        })

        test('should call saveRequest once', async () => {
          await publishStatement(request)
          expect(saveRequest).toHaveBeenCalledTimes(1)
        })

        test('should call saveRequest with request, NOTIFY_ID, EMAIL and handlePublishReasoning', async () => {
          await publishStatement(request)
          expect(saveRequest).toHaveBeenCalledWith(request, NOTIFY_ID, EMAIL, handlePublishReasoning())
        })

        test('should not call handlePublishReasoning', async () => {
          await publishStatement(request)
          expect(handlePublishReasoning).not.toHaveBeenCalled()
        })

        test('should not throw', async () => {
          const wrapper = async () => { await publishStatement(request) }
          expect(wrapper).not.toThrow()
        })

        test('should return undefined', async () => {
          const result = await publishStatement(request)
          expect(result).toBeUndefined()
        })
      })

      describe.each([
        { errorMessage: 'Email is invalid: Email cannot be empty.', reason: EMPTY },
        { errorMessage: 'Email is invalid: The email provided is invalid.', reason: INVALID },
        { errorMessage: 'This is not a known validation error message.', reason: undefined }
      ])('When validateEmail throws error with message "$errorMessage"', ({ errorMessage, reason }) => {
        beforeEach(() => {
          error = new Error(errorMessage)

          validateEmail.mockImplementation(() => { throw error })
          handlePublishReasoning.mockReturnValue(reason)
        })

        test('should call getExistingDocument', async () => {
          await publishStatement(request)
          expect(getExistingDocument).toHaveBeenCalled()
        })

        test('should call getExistingDocument once', async () => {
          await publishStatement(request)
          expect(getExistingDocument).toHaveBeenCalledTimes(1)
        })

        test('should call getExistingDocument with request.documentReference', async () => {
          await publishStatement(request)
          expect(getExistingDocument).toHaveBeenCalledWith(request.documentReference)
        })

        test('should call validateEmail', async () => {
          try { await publishStatement(request) } catch {}
          expect(validateEmail).toHaveBeenCalled()
        })

        test('should call validateEmail once', async () => {
          try { await publishStatement(request) } catch {}
          expect(validateEmail).toHaveBeenCalledTimes(1)
        })

        test('should call validateEmail with request.email', async () => {
          try { await publishStatement(request) } catch {}
          expect(validateEmail).toHaveBeenCalledWith(request.email)
        })

        test('should not call getPersonalisation', async () => {
          try { await publishStatement(request) } catch {}
          expect(getPersonalisation).not.toHaveBeenCalled()
        })

        test('should not call publish', async () => {
          try { await publishStatement(request) } catch {}
          expect(publish).not.toHaveBeenCalled()
        })

        test('should call handlePublishReasoning', async () => {
          try { await publishStatement(request) } catch {}
          expect(handlePublishReasoning).toHaveBeenCalled()
        })

        test('should call handlePublishReasoning once', async () => {
          try { await publishStatement(request) } catch {}
          expect(handlePublishReasoning).toHaveBeenCalledTimes(1)
        })

        test('should call handlePublishReasoning with error', async () => {
          try { await publishStatement(request) } catch {}
          expect(handlePublishReasoning).toHaveBeenCalledWith(error)
        })

        test('should call saveRequest', async () => {
          try { await publishStatement(request) } catch {}
          expect(saveRequest).toHaveBeenCalled()
        })

        test('should call saveRequest once', async () => {
          try { await publishStatement(request) } catch {}
          expect(saveRequest).toHaveBeenCalledTimes(1)
        })

        test('should call saveRequest with request, undefined, EMAIL and handlePublishReasoning', async () => {
          try { await publishStatement(request) } catch {}
          expect(saveRequest).toHaveBeenCalledWith(request, undefined, EMAIL, handlePublishReasoning())
        })

        test('should not throw', async () => {
          const wrapper = async () => { await publishStatement(request) }
          expect(wrapper).not.toThrow()
        })

        test('should return undefined', async () => {
          const result = await publishStatement(request)
          expect(result).toBeUndefined()
        })
      })
    })
  })
})
