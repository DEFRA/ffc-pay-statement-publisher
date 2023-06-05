const validateRequest = require('../../../app/messaging/validate-request')

let request

describe('Validate request', () => {
  beforeEach(() => {
    request = JSON.parse(JSON.stringify(require('../../mocks/messages/publish')))
  })

  describe('When request is a statement', () => {
    beforeEach(() => {
      request = JSON.parse(JSON.stringify(require('../../mocks/messages/publish')))
    })

    test('does not throw', async () => {
      expect(() => validateRequest(request)).not.toThrow()
    })
  })

  describe('When request is undefined', () => {
    beforeEach(() => {
      request = undefined
    })

    test('throws', async () => {
      expect(() => validateRequest(request)).toThrow()
    })
  })

  describe('When request is not given', () => {
    test('throws', async () => {
      expect(() => validateRequest()).toThrow()
    })
  })

  describe('When request is {}', () => {
    beforeEach(() => {
      request = {}
    })

    test('throws', async () => {
      expect(() => validateRequest(request)).toThrow()
    })
  })

  describe('When request is []', () => {
    beforeEach(() => {
      request = []
    })

    test('throws', async () => {
      expect(() => validateRequest([])).toThrow()
    })
  })

  describe('When request is true', () => {
    beforeEach(() => {
      request = true
    })

    test('throws on true request', async () => {
      expect(() => validateRequest(true)).toThrow()
    })
  })

  describe('When request is false', () => {
    beforeEach(() => {
      request = false
    })

    test('throws on false request', async () => {
      expect(() => validateRequest(request)).toThrow()
    })
  })

  describe('When request is 0', () => {
    beforeEach(() => {
      request = 0
    })

    test('throws', async () => {
      expect(() => validateRequest(request)).toThrow()
    })
  })

  describe('When request is 1', () => {
    beforeEach(() => {
      request = 1
    })

    test('throws', async () => {
      expect(() => validateRequest(request)).toThrow()
    })
  })

  describe('When request is ""', () => {
    beforeEach(() => {
      request = ''
    })

    test('throws', async () => {
      expect(() => validateRequest(request)).toThrow()
    })
  })

  describe('When request is "request"', () => {
    beforeEach(() => {
      request = 'request'
    })

    test('throws', async () => {
      expect(() => validateRequest(request)).toThrow()
    })
  })
})
