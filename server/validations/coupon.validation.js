const Joi = require('joi');


const couponValidationSchema = Joi.object({
    percentage: Joi.number().min(0).max(100).required(),
});

module.exports = couponValidationSchema;