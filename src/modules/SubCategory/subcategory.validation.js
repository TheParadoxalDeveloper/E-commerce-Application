import Joi from "joi"

Joi.object({
    name: Joi.string().min(2).max(50).required(),
    category: Joi.string().hex(24).required(),
    createdBy: Joi.string().hex(24).required()
})