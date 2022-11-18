const validateEmail = require('../../../app/publishing/validate-email')

describe('validate email', () => {
  test('returns true for valid email', () => {
    const email = 'test@test.com'
    expect(validateEmail(email)).toBe(true)
  })

  test('returns false for invalid email', () => {
    const email = 'test'
    expect(validateEmail(email)).toBe(false)
  })

  test('returns false for empty email', () => {
    const email = ''
    expect(validateEmail(email)).toBe(false)
  })

  test('returns false for null email', () => {
    const email = null
    expect(validateEmail(email)).toBe(false)
  })

  test('returns false for undefined email', () => {
    const email = undefined
    expect(validateEmail(email)).toBe(false)
  })

  test('returns false for empty object email', () => {
    const email = {}
    expect(validateEmail(email)).toBe(false)
  })

  test('returns false for array email', () => {
    const email = []
    expect(validateEmail(email)).toBe(false)
  })

  test('returns false for function email', () => {
    const email = () => {}
    expect(validateEmail(email)).toBe(false)
  })

  test('returns false for number email', () => {
    const email = 123
    expect(validateEmail(email)).toBe(false)
  })

  test('returns false for boolean email', () => {
    const email = true
    expect(validateEmail(email)).toBe(false)
  })

  test('returns false for object email', () => {
    const email = { email: 'test@test.com' }
    expect(validateEmail(email)).toBe(false)
  })
})
