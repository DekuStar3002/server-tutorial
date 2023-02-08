const { default: axios } = require('axios');
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

const validateUser = async (req, res, next) => {
  console.log(req.cookies);
  const response = await axios.get('http://localhost:5000/user/validation', {
    headers: {
      Cookie: 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlciI6InVzZXJuYXNzYXNkYW1lczEiLCJpYXQiOjE2NzU4MzczMTB9.OKQzHDZ-IHSwtJCa_zSH137DjiC2OPCzUj8wB2QpzbI'
    }
  });
  if(response.status !== 200) {
    res.status(response.status).json({ error: response.data.error });
    return;
  }
  req.user = response.data.user;
  next();
};

module.exports = { checkBody, checkParams, checkPutObject, checkPatchObject, validateUser };