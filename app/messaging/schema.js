const Joi = require('joi')

module.exports = Joi.object({
  filename: Joi.string().required(),
  businessName: Joi.string().required(),
  frn: Joi.number().integer().min(1000000000).max(9999999999).required(),
  sbi: Joi.number().integer().min(105000000).max(999999999).required(),
  email: Joi.string().email().optional(),
  address: Joi.object({
    line1: Joi.string().optional().allow(''),
    line2: Joi.string().optional().allow(''),
    line3: Joi.string().optional().allow(''),
    line4: Joi.string().optional().allow(''),
    line5: Joi.string().optional().allow(''),
    postcode: Joi.string().required()
  }).required()
}).required()
