import Joi from 'joi';

export const userCreateSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
  role: Joi.string().valid('USER', 'ADMIN').optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().required(),
});
