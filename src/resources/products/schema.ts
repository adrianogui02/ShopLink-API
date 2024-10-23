import Joi from 'joi';

export const productCreateSchema = Joi.object({
  nome: Joi.string().required(),
  descricao: Joi.string().required(),
  preco: Joi.number().required(),
  //imagemUrl: Joi.string().uri().required(),
});

export const productUpdateSchema = Joi.object({
  nome: Joi.string(),
  descricao: Joi.string(),
  preco: Joi.number(),
  //imagemUrl: Joi.string().uri(),
});
