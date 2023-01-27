const schema = require('../../../../app/schemas/components/email-lenient')

let email

describe('Lenient email schema', () => {
  describe('When email is a valid email address', () => {
    beforeEach(() => {
      email = require('../../../mocks/components/email')
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 1 key', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('should return an object with keys: value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toStrictEqual(email)
    })

    test('should not return an object with key: error', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).not.toContain('error')
    })
  })

  describe('When email is Notify\'s test temporary failure email address', () => {
    beforeEach(() => {
      email = 'temp-fail@simulator.notify'
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 1 key', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('should return an object with keys: value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toStrictEqual(email)
    })

    test('should not return an object with key: error', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).not.toContain('error')
    })
  })

  describe('When email is Notify\'s test permanent failure email address', () => {
    beforeEach(() => {
      email = 'perm-fail@simulator.notify'
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 1 key', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('should return an object with keys: value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toStrictEqual(email)
    })

    test('should not return an object with key: error', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).not.toContain('error')
    })
  })

  describe('When email does not have a tld', () => {
    beforeEach(() => {
      email = 'email@domain'
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 1 key', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('should return an object with keys: value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toStrictEqual(email)
    })

    test('should not return an object with key: error', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).not.toContain('error')
    })
  })

  describe('When email does not have a valid tld', () => {
    beforeEach(() => {
      email = 'email@domain.invalidtld'
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 1 key', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('should return an object with keys: value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toStrictEqual(email)
    })

    test('should not return an object with key: error', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).not.toContain('error')
    })
  })

  describe('When email does not have a domain', () => {
    beforeEach(() => {
      email = 'email@.com'
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 1 key', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('should return an object with keys: value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toStrictEqual(email)
    })

    test('should not return an object with key: error', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).not.toContain('error')
    })
  })

  describe('When email does not have a valid domain', () => {
    beforeEach(() => {
      email = 'email@invaliddomain.com'
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 1 key', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('should return an object with keys: value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toStrictEqual(email)
    })

    test('should not return an object with key: error', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).not.toContain('error')
    })
  })

  describe('When email does not have a username', () => {
    beforeEach(() => {
      email = '@gov.com'
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 1 key', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('should return an object with keys: value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toStrictEqual(email)
    })

    test('should not return an object with key: error', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).not.toContain('error')
    })
  })

  describe('When email does not have a valid username', () => {
    beforeEach(() => {
      email = 'inv@lidusern@me@gov.com'
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 1 key', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('should return an object with keys: value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toStrictEqual(email)
    })

    test('should not return an object with key: error', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).not.toContain('error')
    })
  })

  describe('When email is not given', () => {
    test('should return an object with 2 keys', () => {
      const result = schema.validate()
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with keys: error and value', () => {
      const result = schema.validate()
      expect(Object.keys(result)).toStrictEqual(['value', 'error'])
    })

    test('should return undefined as value for key: value', () => {
      const result = schema.validate()
      expect(result.value).toBeUndefined()
    })

    test('should return "any.required" as value for key: error.details[0].type', () => {
      const result = schema.validate()
      expect(result.error.details[0].type).toBe('any.required')
    })

    test('should return "Email must be provided." as value for key: error.details[0].message', () => {
      const result = schema.validate()
      expect(result.error.details[0].message).toBe('Email must be provided.')
    })
  })

  describe('When email is ""', () => {
    beforeEach(() => {
      email = ''
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 1 key', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('should return an object with keys: value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toStrictEqual(email)
    })

    test('should not return an object with key: error', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).not.toContain('error')
    })
  })

  describe('When email is 1', () => {
    beforeEach(() => {
      email = 1
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 2 keys', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('should return an object with keys: error and value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value', 'error'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toBe(email)
    })

    test('should return "string.base" as value for key: error.details[0].type', () => {
      const result = schema.validate(email)
      expect(result.error.details[0].type).toBe('string.base')
    })

    test('should return "Email must be a string." as value for key: error.details[0].message', () => {
      const result = schema.validate(email)
      expect(result.error.details[0].message).toBe('Email must be a string.')
    })
  })

  describe('When email is []', () => {
    beforeEach(() => {
      email = []
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 2 keys', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('should return an object with keys: error and value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value', 'error'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toBe(email)
    })

    test('should return "string.base" as value for key: error.details[0].type', () => {
      const result = schema.validate(email)
      expect(result.error.details[0].type).toBe('string.base')
    })

    test('should return "Email must be a string." as value for key: error.details[0].message', () => {
      const result = schema.validate(email)
      expect(result.error.details[0].message).toBe('Email must be a string.')
    })
  })

  describe('When email is {}', () => {
    beforeEach(() => {
      email = []
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 2 keys', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('should return an object with keys: error and value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value', 'error'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toBe(email)
    })

    test('should return "string.base" as value for key: error.details[0].type', () => {
      const result = schema.validate(email)
      expect(result.error.details[0].type).toBe('string.base')
    })

    test('should return "Email must be a string." as value for key: error.details[0].message when frnEmptyString', () => {
      const result = schema.validate(email)
      expect(result.error.details[0].message).toBe('Email must be a string.')
    })
  })

  describe('When email is null', () => {
    beforeEach(() => {
      email = null
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 2 keys', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('should return an object with keys: error and value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value', 'error'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toBe(email)
    })

    test('should return "string.base" as value for key: error.details[0].type', () => {
      const result = schema.validate(email)
      expect(result.error.details[0].type).toBe('string.base')
    })

    test('should return "Email must be a string." as value for key: error.details[0].message when frnEmptyString', () => {
      const result = schema.validate(email)
      expect(result.error.details[0].message).toBe('Email must be a string.')
    })
  })

  describe('When email is undefined', () => {
    beforeEach(() => {
      email = undefined
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 2 keys', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('should return an object with keys: error and value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value', 'error'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toBe(email)
    })

    test('should return "any.required" as value for key: error.details[0].type', () => {
      const result = schema.validate(email)
      expect(result.error.details[0].type).toBe('any.required')
    })

    test('should return "Email must be provided." as value for key: error.details[0].message when frnEmptyString', () => {
      const result = schema.validate(email)
      expect(result.error.details[0].message).toBe('Email must be provided.')
    })
  })

  describe('When email is true', () => {
    beforeEach(() => {
      email = true
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 2 keys', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('should return an object with keys: error and value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value', 'error'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toBe(email)
    })

    test('should return "string.base" as value for key: error.details[0].type', () => {
      const result = schema.validate(email)
      expect(result.error.details[0].type).toBe('string.base')
    })

    test('should return "Email must be a string." as value for key: error.details[0].message when frnEmptyString', () => {
      const result = schema.validate(email)
      expect(result.error.details[0].message).toBe('Email must be a string.')
    })
  })

  describe('When email is NaN', () => {
    beforeEach(() => {
      email = NaN
    })

    test('should return an object', async () => {
      const result = schema.validate(email)
      expect(result).toBeInstanceOf(Object)
    })

    test('should return an object with 2 keys', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('should return an object with keys: error and value', () => {
      const result = schema.validate(email)
      expect(Object.keys(result)).toStrictEqual(['value', 'error'])
    })

    test('should return email as value for key: value', () => {
      const result = schema.validate(email)
      expect(result.value).toBe(email)
    })

    test('should return "string.base" as value for key: error.details[0].type', () => {
      const result = schema.validate(email)
      expect(result.error.details[0].type).toBe('string.base')
    })

    test('should return "Email must be a string." as value for key: error.details[0].message when frnEmptyString', () => {
      const result = schema.validate(email)
      expect(result.error.details[0].message).toBe('Email must be a string.')
    })
  })
})
