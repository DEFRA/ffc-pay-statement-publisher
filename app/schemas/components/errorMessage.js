const Joi = require('joi')

module.exports = {
  errorMessage: Joi.string().required()
    .messages({
      '*': 'BLUUUHHH.'
    })
}
