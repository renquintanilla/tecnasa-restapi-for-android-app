import * as Joi from 'joi';

export const LoginSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
});