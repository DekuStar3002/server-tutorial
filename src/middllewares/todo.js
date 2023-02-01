const Joi = require('joi');

const checkBody = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required()
  });
  const {error, value} = schema.validate(req.body);
  if(error) {
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};

module.exports = { checkBody };