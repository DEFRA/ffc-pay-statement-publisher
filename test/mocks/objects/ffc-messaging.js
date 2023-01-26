const sendMessage = jest.fn()
const closeConnection = jest.fn()

const messageSender = jest.fn().mockImplementation(() => {
  return {
    sendMessage,
    closeConnection
  }
})

jest.mock('ffc-messaging', () => {
  return {
    MessageSender: messageSender
  }
})

module.exports = {
  messageSender
}
