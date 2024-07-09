const Joi = require('joi');

const UserValidations = Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(30)
        .required(),
    lastName: Joi.string()
        .min(5)
        .max(30)
        .required(),
    mobile: Joi.string() 
        .pattern(/^[0-9]+$/) 
        .min(10)
        .max(15) 
        .required(),
    email: Joi.string()
        .min(5)
        .max(50)
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .max(30) 
        .required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required(),
    birthday: Joi.string().optional(),
    country: Joi.string().optional(),
    gender: Joi.string().optional(),
    balance: Joi.number().optional() 
}).with('password', 'confirmPassword');

module.exports = UserValidations;
