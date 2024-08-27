import Joi from "joi";

Joi.object({
    user: Joi.string().hex(24).required(),
    cartItems: Joi.array({
        item: Joi.string().hex(24).required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().integer().min(1).required(),
    }).required(),
    totalCartPrice: Joi.number().required(),
    discount: Joi.number().integer().valid(25, 50, 75),
    totalCartPriceAfterDiscount: Joi.number().required()
})

