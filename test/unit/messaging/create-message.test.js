const createMessage = require('../../../app/messaging/create-message')

const body = 'hello'
const type = 'message'

describe('create message', () => {
  test('should return an object', () => {
    const result = createMessage(body, type)
    expect(result).toBeInstanceOf(Object)
  })

  test('should return an object with 3 keys', () => {
    const result = createMessage(body, type)
    expect(Object.keys(result)).toHaveLength(3)
  })

  test('should return an object with keys: "body", "type" and "source"', () => {
    const result = createMessage(body, type)
    expect(Object.keys(result)).toStrictEqual(['body', 'type', 'source'])
  })

  test('should return the body key with value body', () => {
    const result = createMessage(body, type)
    expect(result.body).toStrictEqual(body)
  })

  test('should return the type key with value type', () => {
    const result = createMessage(body, type)
    expect(result.type).toStrictEqual(type)
  })
})
