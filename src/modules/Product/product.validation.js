import Joi from "joi"

Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().min(2).max(2000).required(),
    imgCover: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png', 'image/gif').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    }).required(),
    images: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png', 'image/gif').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    })),
    price: Joi.number().min(0).required(),
    priceAfterDiscount: Joi.number().min(0).required(),
    sold: Joi.number().integer().min(0).required(),
    inStock: Joi.number().integer().min(0).required(),
    category: Joi.string().hex(24).required(),
    subCategory: Joi.string().hex(24).required(),
    Brand: Joi.string().hex(24).required(),
    rateAvg:Joi.number().integer().min(0).max(5).required(),
    rateCount: Joi.number().integer().min(0).required(),
    createdBy: Joi.string().hex(24).required()
})



