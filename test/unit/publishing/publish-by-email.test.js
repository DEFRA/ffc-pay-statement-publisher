const config = require('../../../app/config')

const { mockNotifyClient } = require('../../mocks/objects/notifications-node-client')

const publishByEmail = require('../../../app/publishing/publish-by-email')

const MOCK_PERSONALISATION = {
  schemeName: 'Test Scheme',
  schemeShortName: 'TS',
  schemeYear: '2021',
  schemeFrequency: 'Monthly',
  businessName: 'Test Business'
}
const EMAIL = require('../../mocks/components/email')
const file = 'dssffdgeggfgf'

describe('Publish by email', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When statement has valid email', () => {
    test('should call mockNotifyClient', async () => {
      await publishByEmail(EMAIL, file, MOCK_PERSONALISATION)
      expect(mockNotifyClient).toHaveBeenCalled()
    })

    test('should call mockNotifyClient once', async () => {
      await publishByEmail(EMAIL, file, MOCK_PERSONALISATION)
      expect(mockNotifyClient).toHaveBeenCalledTimes(1)
    })

    test('should call mockNotifyClient with config.notifyApiKey', async () => {
      await publishByEmail(EMAIL, file, MOCK_PERSONALISATION)
      expect(mockNotifyClient).toHaveBeenCalledWith(config.notifyApiKey)
    })

    test('should call mockNotifyClient.prepareUpload', async () => {
      await publishByEmail(EMAIL, file, MOCK_PERSONALISATION)
      expect(mockNotifyClient().prepareUpload).toHaveBeenCalled()
    })

    test('should call mockNotifyClient.prepareUpload once', async () => {
      await publishByEmail(EMAIL, file, MOCK_PERSONALISATION)
      expect(mockNotifyClient().prepareUpload).toHaveBeenCalledTimes(1)
    })

    test('should call mockNotifyClient.prepareUpload with file and { confirmEmailBeforeDownload: true }', async () => {
      await publishByEmail(EMAIL, file, MOCK_PERSONALISATION)
      expect(mockNotifyClient().prepareUpload).toHaveBeenCalledWith(file, { confirmEmailBeforeDownload: true })
    })

    test('should call mockNotifyClient.sendEmail', async () => {
      await publishByEmail(EMAIL, file, MOCK_PERSONALISATION)
      expect(mockNotifyClient().sendEmail).toHaveBeenCalled()
    })

    test('should call mockNotifyClient.sendEmail once', async () => {
      await publishByEmail(EMAIL, file, MOCK_PERSONALISATION)
      expect(mockNotifyClient().sendEmail).toHaveBeenCalledTimes(1)
    })

    test('should call mockNotifyClient.sendEmail with config.notifyEmailTemplateKey, EMAIL, personalisation: { link_to_file: mockNotifyClient.prepareUpload, ...MOCK_PERSONALISATION }}', async () => {
      await publishByEmail(EMAIL, file, MOCK_PERSONALISATION)

      expect(mockNotifyClient().sendEmail).toHaveBeenCalledWith(config.notifyEmailTemplateKey, EMAIL, {
        personalisation: {
          link_to_file: mockNotifyClient().prepareUpload(),
          ...MOCK_PERSONALISATION
        }
      })
    })

    test('should return mockNotifyClient.sendEmail', async () => {
      const result = await publishByEmail(EMAIL, file, MOCK_PERSONALISATION)
      expect(result).toBe(mockNotifyClient().sendEmail())
    })
  })
})
