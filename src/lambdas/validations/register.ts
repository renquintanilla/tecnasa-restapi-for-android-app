import * as Joi from 'joi';

export const RegisterSchema = Joi.object({
    fullName: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().required()
});