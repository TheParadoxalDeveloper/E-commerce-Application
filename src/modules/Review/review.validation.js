import Joi from "joi"

Joi.object({
    comment: Joi.string().required(),
    user: Joi.string().hex(24).required(),
    rate: Joi.number().integer().min(1).max(5).required(),
    product: Joi.string().hex(24).required(),
})
