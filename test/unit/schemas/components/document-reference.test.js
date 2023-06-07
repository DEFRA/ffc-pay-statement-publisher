const DOCUMENT_REFERENCE = require('../../../mocks/components/document-reference')

const schema = require('../../../../app/schemas/components/document-reference')

describe('document reference schema', () => {
  describe.each([
    { name: 'DOCUMENT_REFERENCE', documentReference: DOCUMENT_REFERENCE, expected: DOCUMENT_REFERENCE },
    { name: 'string DOCUMENT_REFERENCE', documentReference: String(DOCUMENT_REFERENCE), expected: DOCUMENT_REFERENCE },
    { name: 'undefined', documentReference: undefined, expected: undefined }
  ])('when document reference is $name', ({ name, documentReference, expected }) => {
    test('returns an object', () => {
      const result = schema.validate(documentReference)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('value')
    })

    test(`returns ${expected} for key "value"`, () => {
      const result = schema.validate(documentReference)
      expect(result.value).toBe(expected)
    })
  })

  describe.each([
    { name: '0', documentReference: 0, expected: 0 },
    { name: '"0"', documentReference: '0', expected: 0 },
    { name: '-1', documentReference: -1, expected: -1 },
    { name: '"-1"', documentReference: '-1', expected: -1 }
  ])('when document reference is $name', ({ name, documentReference, expected }) => {
    test('returns an object', () => {
      const result = schema.validate(documentReference)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('value')
    })

    test(`returns ${expected} for key "value"`, () => {
      const result = schema.validate(documentReference)
      expect(result.value).toBe(expected)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(documentReference)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "number.positive" for key "error.details[0].type"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].type).toBe('number.positive')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number greater than 0." for key "error.details[0].message"', () => {
      const result = schema.validate(documentReference)
      console.log(result)
      console.log(result.error)
      expect(result.error.details[0].message).toBe('The document reference must be a number greater than 0.')
    })
  })

  describe.each([
    { name: '"a"', documentReference: 'a', expected: 'a' },
    { name: 'null', documentReference: null, expected: null },
    { name: 'false', documentReference: false, expected: false },
    { name: 'true', documentReference: true, expected: true }
  ])('when document reference is $name', ({ name, documentReference, expected }) => {
    test('returns an object', () => {
      const result = schema.validate(documentReference)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('value')
    })

    test(`returns ${expected} for key "value"`, () => {
      const result = schema.validate(documentReference)
      expect(result.value).toBe(expected)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(documentReference)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "number.base" for key "error.details[0].type"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].type).toBe('number.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number." for key "error.details[0].message"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].message).toBe('The document reference must be a number.')
    })
  })

  describe.each([
    { name: '[]', documentReference: [], expected: [] },
    { name: '{}', documentReference: {}, expected: {} }
  ])('when document reference is $name', ({ name, documentReference, expected }) => {
    test('returns an object', () => {
      const result = schema.validate(documentReference)
      expect(result).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('value')
    })

    test(`returns ${expected} for key "value"`, () => {
      const result = schema.validate(documentReference)
      expect(result.value).toStrictEqual(expected)
    })

    test('returns an object with "error" key', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const result = schema.validate(documentReference)
      expect(result.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('type')
    })

    test('returns "number.base" for key "error.details[0].type"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].type).toBe('number.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const result = schema.validate(documentReference)
      expect(Object.keys(result.error.details[0])).toContain('message')
    })

    test('returns "The document reference must be a number." for key "error.details[0].message"', () => {
      const result = schema.validate(documentReference)
      expect(result.error.details[0].message).toBe('The document reference must be a number.')
    })
  })
})
