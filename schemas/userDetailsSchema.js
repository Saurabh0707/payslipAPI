
const Joi = require('joi');

const UserDetailsSchema = { 
  details: Joi.object().keys({ 
    firstname: Joi.string().regex(/^[a-z]+$/i).required(),
    lastname: Joi.string().regex(/^[a-z]+$/i).required(), 
    annualSalary: Joi.number().positive().required(), 
    superRate: Joi.number().min(0).max(12).required(),
    paymentStartDate: Joi.date().greater('7-1-2017').required(), 
  }) 
};

module.exports = UserDetailsSchema;