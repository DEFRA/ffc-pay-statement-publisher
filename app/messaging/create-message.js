const createMessage = (body, type, source) => {
  return {
    body,
    type,
    source
  }
}

module.exports = createMessage
