import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().required(),

  DATABASE_URL: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),

  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .required(),
});