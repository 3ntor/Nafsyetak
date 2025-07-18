const Joi = require('joi');

module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Validation error', details: error.details });
  }
  next();
};