const mapMessage = (message) => {
  return {
    email: message?.email,
    errorMessage: message?.errorMessage,
    frn: message?.frn
  }
}

module.exports = mapMessage
