const { confirmEmail } = require('./notify-link-to-file')

const mockPrepareUpload = jest.fn().mockReturnValue(confirmEmail)
const mockSendEmail = jest.fn()

const mockNotifyClient = jest.fn().mockImplementation(() => {
  return {
    prepareUpload: mockPrepareUpload,
    sendEmail: mockSendEmail
  }
})

jest.mock('notifications-node-client', () => {
  return {
    NotifyClient: mockNotifyClient
  }
})

module.exports = {
  mockNotifyClient
}