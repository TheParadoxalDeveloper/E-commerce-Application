import Joi from "joi"

Joi.object({
    code: Joi.string().min(2).required(),
    discount: Joi.number().integer().valid(25, 50, 75).required(),
    expires: Joi.date().required(),
})


