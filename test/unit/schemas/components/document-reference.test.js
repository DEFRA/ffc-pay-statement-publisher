const DOCUMENT_REFERENCE = require('../../../mocks/components/document-reference')

const schema = require('../../../../app/schemas/components/document-reference')

let documentReference

describe('document reference schema', () => {
  describe('when document reference is DOCUMENT_REFERENCE', () => {
    beforeEach(() => {
      documentReference = DOCUMENT_REFERENCE
    })

    test('returns an object', () => {
      const res = schema.validate(documentReference)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const res = schema.validate(documentReference)
      expect(res.value).toBe(documentReference)
    })
  })

  describe('when document reference is string DOCUMENT_REFERENCE', () => {
    beforeEach(() => {
      documentReference = String(DOCUMENT_REFERENCE)
    })

    test('returns an object', () => {
      const res = schema.validate(documentReference)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns Number(documentReference) for key "value"', () => {
      const res = schema.validate(documentReference)
      expect(res.value).toBe(Number(documentReference))
    })
  })

  describe('when document reference is undefined', () => {
    beforeEach(() => {
      documentReference = undefined
    })

    test('returns an object', () => {
      const res = schema.validate(documentReference)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const res = schema.validate(documentReference)
      expect(res.value).toBe(documentReference)
    })
  })

  describe('when document reference is 0', () => {
    beforeEach(() => {
      documentReference = 0
    })

    test('returns an object', () => {
      const res = schema.validate(documentReference)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const res = schema.validate(documentReference)
      expect(res.value).toBe(documentReference)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(documentReference)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "number.positive" for key "error.details[0].type"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].type).toBe('number.positive')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number greater than 0." for key "error.details[0].message"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].message).toBe('The document reference must be a number greater than 0.')
    })
  })

  describe('when document reference is "0"', () => {
    beforeEach(() => {
      documentReference = '0'
    })

    test('returns an object', () => {
      const res = schema.validate(documentReference)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns Number(documentReference) for key "value"', () => {
      const res = schema.validate(documentReference)
      expect(res.value).toBe(Number(documentReference))
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(documentReference)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "number.positive" for key "error.details[0].type"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].type).toBe('number.positive')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number greater than 0." for key "error.details[0].message"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].message).toBe('The document reference must be a number greater than 0.')
    })
  })

  describe('when document reference is -1', () => {
    beforeEach(() => {
      documentReference = -1
    })

    test('returns an object', () => {
      const res = schema.validate(documentReference)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const res = schema.validate(documentReference)
      expect(res.value).toBe(documentReference)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(documentReference)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "number.positive" for key "error.details[0].type"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].type).toBe('number.positive')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number greater than 0." for key "error.details[0].message"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].message).toBe('The document reference must be a number greater than 0.')
    })
  })

  describe('when document reference is "-1"', () => {
    beforeEach(() => {
      documentReference = '-1'
    })

    test('returns an object', () => {
      const res = schema.validate(documentReference)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns Number(documentReference) for key "value"', () => {
      const res = schema.validate(documentReference)
      expect(res.value).toBe(Number(documentReference))
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(documentReference)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "number.positive" for key "error.details[0].type"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].type).toBe('number.positive')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number greater than 0." for key "error.details[0].message"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].message).toBe('The document reference must be a number greater than 0.')
    })
  })

  describe('when document reference is "a"', () => {
    beforeEach(() => {
      documentReference = 'a'
    })

    test('returns an object', () => {
      const res = schema.validate(documentReference)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const res = schema.validate(documentReference)
      expect(res.value).toBe(documentReference)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(documentReference)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "number.base" for key "error.details[0].type"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].type).toBe('number.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number." for key "error.details[0].message"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].message).toBe('The document reference must be a number.')
    })
  })

  describe('when document reference is null', () => {
    beforeEach(() => {
      documentReference = null
    })

    test('returns an object', () => {
      const res = schema.validate(documentReference)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const res = schema.validate(documentReference)
      expect(res.value).toBe(documentReference)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(documentReference)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "number.base" for key "error.details[0].type"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].type).toBe('number.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number." for key "error.details[0].message"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].message).toBe('The document reference must be a number.')
    })
  })

  describe('when document reference is {}', () => {
    beforeEach(() => {
      documentReference = {}
    })

    test('returns an object', () => {
      const res = schema.validate(documentReference)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const res = schema.validate(documentReference)
      expect(res.value).toBe(documentReference)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(documentReference)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "number.base" for key "error.details[0].type"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].type).toBe('number.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number." for key "error.details[0].message"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].message).toBe('The document reference must be a number.')
    })
  })

  describe('when document reference is []', () => {
    beforeEach(() => {
      documentReference = []
    })

    test('returns an object', () => {
      const res = schema.validate(documentReference)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns documentReference for key "value"', () => {
      const res = schema.validate(documentReference)
      expect(res.value).toBe(documentReference)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(documentReference)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "number.base" for key "error.details[0].type"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].type).toBe('number.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(documentReference)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number." for key "error.details[0].message"', () => {
      const res = schema.validate(documentReference)
      expect(res.error.details[0].message).toBe('The document reference must be a number.')
    })
  })
})
