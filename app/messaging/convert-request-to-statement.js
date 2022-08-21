const convertRequestToStatement = (request) => {
  return {
    ...request,
    addressLine1: request.address.line1,
    addressLine2: request.address.line2,
    addressLine3: request.address.line3,
    addressLine4: request.address.line4,
    addressLine5: request.address.line5,
    postcode: request.address.postcode
  }
}

module.exports = convertRequestToStatement
