const Joi = require('joi')
const mqConfig = require('./message')
const dbConfig = require('./database')
const storageConfig = require('./storage')

// Define config schema
const schema = Joi.object({
  env: Joi.string().valid('development', 'test', 'production').default('development'),
  deliveryCheckInterval: Joi.number().default(5000),
  notifyApiKey: Joi.string().allow(''),
  notifyEmailTemplateKey: Joi.string().allow('')
})

// Build config
const config = {
  env: process.env.NODE_ENV,
  deliveryCheckInterval: process.env._INTERVAL,
  notifyApiKey: process.env.NOTIFY_API_KEY,
  notifyEmailTemplateKey: process.env.NOTIFY_EMAIL_TEMPLATE_KEY
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the Joi validated value
const value = result.value

// Add some helper props
value.isDev = value.env === 'development'
value.isTest = value.env === 'test'
value.isProd = value.env === 'production'
value.publishSubscription = mqConfig.publishSubscription
value.dbConfig = dbConfig
value.storageConfig = storageConfig

module.exports = value
