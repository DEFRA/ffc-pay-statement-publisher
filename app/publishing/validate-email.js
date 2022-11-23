const schema = require('./schema')

const validateEmail = (email) => {
  const { error } = schema.validate(email)
  if (error) {
    return false
  }
  return true
}

module.exports = validateEmail
