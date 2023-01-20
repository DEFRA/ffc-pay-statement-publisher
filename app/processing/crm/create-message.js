const createMessage = (message) => {
  return {
    emailAddress: message?.emailAddress,
    errorMessage: message?.errorMessage,
    frn: message?.frn
  }
}

module.exports = createMessage
