jest.mock('../../../app/publishing/get-personalisation')
const getPersonalisation = require('../../../app/publishing/get-personalisation')

jest.mock('../../../app/publishing/publish')
const publish = require('../../../app/publishing/publish')

jest.mock('../../../app/publishing/save-request')
const saveRequest = require('../../../app/publishing/save-request')

jest.mock('../../../app/publishing/validate-email')
const validateEmail = require('../../../app/publishing/validate-email')

const publishStatement = require('../../../app/publishing')

const { EMAIL } = require('../../../app/constants/methods')
const MOCK_ID = 'c8363cba-2093-4447-8812-697c09820614'
const MOCK_PERSONALISATION = {
  schemeName: 'Test Scheme',
  schemeShortName: 'TS',
  schemeYear: '2021',
  schemeFrequency: 'Monthly',
  businessName: 'Test Business'
}

let request

describe('Publish incoming statement', () => {
  beforeEach(() => {
    request = JSON.parse(JSON.stringify(require('../../mocks/request')))
    publish.mockResolvedValue({ data: { id: MOCK_ID } })
    getPersonalisation.mockReturnValue(MOCK_PERSONALISATION)
    validateEmail.mockReturnValue({ value: request.email })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When statement has valid email', () => {
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

    test('should call saveRequest with request, MOCK_ID and EMAIL', async () => {
      await publishStatement(request)
      expect(saveRequest).toHaveBeenCalledWith(request, MOCK_ID, EMAIL)
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

  describe('When validateEmail throws', () => {
    beforeEach(() => {
      validateEmail.mockImplementation(() => { throw new Error('Invalid email address.') })
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

    test('should call saveRequest', async () => {
      try { await publishStatement(request) } catch {}
      expect(saveRequest).toHaveBeenCalled()
    })

    test('should call saveRequest once', async () => {
      try { await publishStatement(request) } catch {}
      expect(saveRequest).toHaveBeenCalledTimes(1)
    })

    test('should call saveRequest with request, undefined and EMAIL', async () => {
      try { await publishStatement(request) } catch {}
      expect(saveRequest).toHaveBeenCalledWith(request, undefined, EMAIL)
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

  describe('When publish throws', () => {
    beforeEach(() => {
      publish.mockImplementation(() => { throw new Error('Issue publishing statement.') })
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
      try { await publishStatement(request) } catch {}
      expect(saveRequest).toHaveBeenCalled()
    })

    test('should call saveRequest once', async () => {
      try { await publishStatement(request) } catch {}
      expect(saveRequest).toHaveBeenCalledTimes(1)
    })

    test('should call saveRequest with request, undefined and EMAIL', async () => {
      try { await publishStatement(request) } catch {}
      expect(saveRequest).toHaveBeenCalledWith(request, undefined, EMAIL)
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

  describe('When saveRequest throws', () => {
    beforeEach(() => {
      saveRequest.mockRejectedValue(new Error('Issue saving down request.'))
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
      try { await publishStatement(request) } catch {}
      expect(saveRequest).toHaveBeenCalled()
    })

    test('should call saveRequest once', async () => {
      try { await publishStatement(request) } catch {}
      expect(saveRequest).toHaveBeenCalledTimes(1)
    })

    test('should call saveRequest with request, MOCK_ID and EMAIL', async () => {
      try { await publishStatement(request) } catch {}
      expect(saveRequest).toHaveBeenCalledWith(request, MOCK_ID, EMAIL)
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
