import Joi from "joi";

Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    isBlocked: Joi.boolean().default('false'),
    role: Joi.string().valid('admin', 'user').default('user'),
    passwordChangedAt: Joi.date(),
})

// Joi.object({
//     user: Joi.string().hex(24).required(),
//     orderItems: Joi.array({
//         item: Joi.string().hex(24).required(),
//         quantity: Joi.number().integer().min(1).required(),
//         price: Joi.number().integer().min(1).required()

//     }).required(),

//     shippingAddress: Joi.object({
//         city: Joi.string().required(),
//         street: Joi.string().required(),
//         phone: Joi.string().required()
//     }).required(),
//     payment_method: Joi.string().required().valid('card', 'cash'),
//     isPaid: Joi.boolean().default('false'),
//     isDelivered: Joi.boolean().default('false'),
//     PaidAt: Joi.date(),
//     deliveredAt: Joi.date()
// })