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

describe('publish statement', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    request = JSON.parse(JSON.stringify(require('../../mocks/request')))
    publish.mockResolvedValue({ data: { id: MOCK_ID } })
    getPersonalisation.mockReturnValue(MOCK_PERSONALISATION)
    validateEmail.mockReturnValue(true)
  })

  test('calls get personalisation once if valid email', async () => {
    await publishStatement(request)
    expect(getPersonalisation).toHaveBeenCalledTimes(1)
  })

  test('calls get personalisation with correct arguments if valid email', async () => {
    await publishStatement(request)
    expect(getPersonalisation).toHaveBeenCalledWith(request.scheme.name, request.scheme.shortName, request.scheme.year, request.scheme.frequency, request.businessName)
  })

  test('calls publish once if valid email', async () => {
    await publishStatement(request)
    expect(publish).toHaveBeenCalledTimes(1)
  })

  test('calls publish with correct arguments if valid email', async () => {
    await publishStatement(request)
    expect(publish).toHaveBeenCalledWith(request.email, request.filename, MOCK_PERSONALISATION)
  })

  test('calls save request once if valid email', async () => {
    await publishStatement(request)
    expect(saveRequest).toHaveBeenCalledTimes(1)
  })

  test('calls save request with correct arguments if valid email', async () => {
    await publishStatement(request)
    expect(saveRequest).toHaveBeenCalledWith(request, MOCK_ID, EMAIL)
  })

  test('does not call get personalisation if invalid email', async () => {
    validateEmail.mockReturnValue(false)
    await publishStatement(request)
    expect(getPersonalisation).not.toHaveBeenCalled()
  })

  test('does not call publish if invalid email', async () => {
    validateEmail.mockReturnValue(false)
    await publishStatement(request)
    expect(publish).not.toHaveBeenCalled()
  })

  test('calls save request if invalid email', async () => {
    validateEmail.mockReturnValue(false)
    await publishStatement(request)
    expect(saveRequest).toHaveBeenCalledTimes(1)
  })

  test('calls save request with correct arguments if invalid email', async () => {
    validateEmail.mockReturnValue(false)
    await publishStatement(request)
    expect(saveRequest).toHaveBeenCalledWith(request, undefined, EMAIL)
  })
})
