const schema = require('../schemas/components/email')

const validateEmail = (email) => {
  console.log('before:', email)

  const result = schema.validate(email, {
    abortEarly: false
  })

  console.log('after:', result.error)

  if (result.error) {
    throw new Error(`Email is invalid: ${result.error.message}`)
  }

  return result.value
}

module.exports = validateEmail
