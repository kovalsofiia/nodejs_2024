const Joi = require("joi");

const SignInSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).max(10).required(),
});

module.exports = {
  SignInSchema,
};
