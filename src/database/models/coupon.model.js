import { model, Schema } from "mongoose";

const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: [true, 'coupon must be unique'],
        minLength: [2, 'coupon is too short']
    },
    discount: {
        type: Number,
        required: true

    },
    expires: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export let Coupon = model('Coupon', couponSchema)