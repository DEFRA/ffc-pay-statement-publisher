const validateRequest = require('../../../app/messaging/validate-request')

let request

describe('Validate request', () => {
  beforeEach(() => {
    request = JSON.parse(JSON.stringify(require('../../mocks/messages/publish')))
  })

  describe.each([
    { name: 'statement', value: JSON.parse(JSON.stringify(require('../../mocks/messages/publish').STATEMENT_REQUEST)), expected: undefined },
    { name: 'schedule', value: JSON.parse(JSON.stringify(require('../../mocks/messages/publish').SCHEDULE_REQUEST)), expected: undefined }
  ])('When request is $name', ({ name, value, expected }) => {
    test(`returns ${expected}`, async () => {
      const result = validateRequest(value)
      expect(result).toBe(expected)
    })
  })

  describe('When request is undefined', () => {
    beforeEach(() => {
      request = undefined
    })

    test('throws', async () => {
      expect(() => validateRequest(request)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(request)).toThrow(Error)
    })

    test('throws error which starts "Statement request is invalid"', async () => {
      expect(() => validateRequest(request)).toThrow(/^Statement request is invalid/)
    })

    test('throws error with category key', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error).toHaveProperty('category')
      }
    })

    test('throws error with category value "validation"', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error.category).toBe('validation')
      }
    })
  })

  describe('When request is not given', () => {
    test('throws', async () => {
      expect(() => validateRequest()).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(request)).toThrow(Error)
    })

    test('throws error which starts "Statement request is invalid"', async () => {
      expect(() => validateRequest(request)).toThrow(/^Statement request is invalid/)
    })

    test('throws error with category key', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error).toHaveProperty('category')
      }
    })

    test('throws error with category value "validation"', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error.category).toBe('validation')
      }
    })
  })

  describe('When request is {}', () => {
    beforeEach(() => {
      request = {}
    })

    test('throws', async () => {
      expect(() => validateRequest(request)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(request)).toThrow(Error)
    })

    test('throws error which starts "Statement request is invalid"', async () => {
      expect(() => validateRequest(request)).toThrow(/^Statement request is invalid/)
    })

    test('throws error with category key', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error).toHaveProperty('category')
      }
    })

    test('throws error with category value "validation"', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error.category).toBe('validation')
      }
    })
  })

  describe('When request is []', () => {
    beforeEach(() => {
      request = []
    })

    test('throws', async () => {
      expect(() => validateRequest([])).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(request)).toThrow(Error)
    })

    test('throws error which starts "Statement request is invalid"', async () => {
      expect(() => validateRequest(request)).toThrow(/^Statement request is invalid/)
    })

    test('throws error with category key', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error).toHaveProperty('category')
      }
    })

    test('throws error with category value "validation"', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error.category).toBe('validation')
      }
    })
  })

  describe('When request is true', () => {
    beforeEach(() => {
      request = true
    })

    test('throws', async () => {
      expect(() => validateRequest(true)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(request)).toThrow(Error)
    })

    test('throws error which starts "Statement request is invalid"', async () => {
      expect(() => validateRequest(request)).toThrow(/^Statement request is invalid/)
    })

    test('throws error with category key', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error).toHaveProperty('category')
      }
    })

    test('throws error with category value "validation"', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error.category).toBe('validation')
      }
    })
  })

  describe('When request is false', () => {
    beforeEach(() => {
      request = false
    })

    test('throws', async () => {
      expect(() => validateRequest(request)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(request)).toThrow(Error)
    })

    test('throws error which starts "Statement request is invalid"', async () => {
      expect(() => validateRequest(request)).toThrow(/^Statement request is invalid/)
    })

    test('throws error with category key', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error).toHaveProperty('category')
      }
    })

    test('throws error with category value "validation"', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error.category).toBe('validation')
      }
    })
  })

  describe('When request is 0', () => {
    beforeEach(() => {
      request = 0
    })

    test('throws', async () => {
      expect(() => validateRequest(request)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(request)).toThrow(Error)
    })

    test('throws error which starts "Statement request is invalid"', async () => {
      expect(() => validateRequest(request)).toThrow(/^Statement request is invalid/)
    })

    test('throws error with category key', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error).toHaveProperty('category')
      }
    })

    test('throws error with category value "validation"', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error.category).toBe('validation')
      }
    })
  })

  describe('When request is 1', () => {
    beforeEach(() => {
      request = 1
    })

    test('throws', async () => {
      expect(() => validateRequest(request)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(request)).toThrow(Error)
    })

    test('throws error which starts "Statement request is invalid"', async () => {
      expect(() => validateRequest(request)).toThrow(/^Statement request is invalid/)
    })

    test('throws error with category key', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error).toHaveProperty('category')
      }
    })

    test('throws error with category value "validation"', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error.category).toBe('validation')
      }
    })
  })

  describe('When request is ""', () => {
    beforeEach(() => {
      request = ''
    })

    test('throws', async () => {
      expect(() => validateRequest(request)).toThrow()
    })

    test('throws Error', async () => {
      expect(() => validateRequest(request)).toThrow(Error)
    })

    test('throws error which starts "Statement request is invalid"', async () => {
      expect(() => validateRequest(request)).toThrow(/^Statement request is invalid/)
    })

    test('throws error with category key', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error).toHaveProperty('category')
      }
    })

    test('throws error with category value "validation"', async () => {
      try {
        validateRequest(request)
      } catch (error) {
        expect(error.category).toBe('validation')
      }
    })
  })
})
