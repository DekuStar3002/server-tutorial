const Joi = require('joi');

const checkBody = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required()
  });
  const { error } = schema.validate(req.body);
  if(error) {
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};

const checkParams = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().required()
  });
  const { error } = schema.validate(req.params);
  if(error) {
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};

const checkPutObject = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    isCompleted: Joi.boolean().required(),
  });
  const { error } = schema.validate(req.body);
  if(error) {
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};

const checkPatchObject = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string(),
    isCompleted: Joi.boolean(),
  });
  const { error } = schema.validate(req.body);
  if(error) {
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};

module.exports = { checkBody, checkParams, checkPutObject, checkPatchObject };