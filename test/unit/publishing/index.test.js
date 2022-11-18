jest.mock('../../../app/publishing/get-personalisation')
const getPersonalisation = require('../../../app/publishing/get-personalisation')

jest.mock('../../../app/publishing/publish')
const publish = require('../../../app/publishing/publish')

jest.mock('../../../app/publishing/save-request')
const saveRequest = require('../../../app/publishing/save-request')

const publishStatement = require('../../../app/publishing')

const { EMAIL } = require('../../../app/methods')
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
  })

  test('calls get personalisation once if email address', async () => {
    await publishStatement(request)
    expect(getPersonalisation).toHaveBeenCalledTimes(1)
  })

  test('calls get personalisation with correct arguments if email address', async () => {
    await publishStatement(request)
    expect(getPersonalisation).toHaveBeenCalledWith(request.scheme.name, request.scheme.shortName, request.scheme.year, request.scheme.frequency, request.businessName)
  })

  test('calls publish once if email address', async () => {
    await publishStatement(request)
    expect(publish).toHaveBeenCalledTimes(1)
  })

  test('calls publish with correct arguments if email address', async () => {
    await publishStatement(request)
    expect(publish).toHaveBeenCalledWith(request.email, request.filename, MOCK_PERSONALISATION)
  })

  test('calls save request once if email address', async () => {
    await publishStatement(request)
    expect(saveRequest).toHaveBeenCalledTimes(1)
  })

  test('calls save request with correct arguments if email address', async () => {
    await publishStatement(request)
    expect(saveRequest).toHaveBeenCalledWith(request, MOCK_ID, EMAIL)
  })

  test('does not call get personalisation if no email address', async () => {
    request.email = undefined
    await publishStatement(request)
    expect(getPersonalisation).not.toHaveBeenCalled()
  })

  test('does not call publish if no email address', async () => {
    request.email = undefined
    await publishStatement(request)
    expect(publish).not.toHaveBeenCalled()
  })

  test('calls save request if no email address', async () => {
    request.email = undefined
    await publishStatement(request)
    expect(saveRequest).toHaveBeenCalledTimes(1)
  })

  test('calls save request with correct arguments if no email address', async () => {
    request.email = undefined
    await publishStatement(request)
    expect(saveRequest).toHaveBeenCalledWith(request, undefined, EMAIL)
  })
})
