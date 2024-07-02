const Joi = require('joi');
const UserValidations = Joi.object({
    firstName:Joi.string()
    .min(2)
    .max(30)
    .required(),
    lastName: Joi.string()
    .min(5)
    .max(30)
    .required(),
    mobile:Joi.number()
    .integer(),
    email:Joi.string()
    .min(5)
    .max(30).email()
    .required(),
    password: Joi.string()
    .min(4).max(10)
    .required(),
    confirmPassword: Joi.ref('password')
}).with('password', 'confirmPassword');

module.exports=UserValidations;