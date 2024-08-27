import { model, Schema } from "mongoose";

let orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            item: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            },
            price: Number
        }
    ],
    totalOrderPrice: {
        type: Number
    },
    shippingAddress: {
        city: String,
        street: String,
        phone: String
    },
    payment_method: {
        type: String,
        enum: ['card', 'cash'],
        default: 'cash',
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    PaidAt: Date,
    deliveredAt: Date

},
    { timestamps: true, versionKey: false })

export let Order = model('Order', orderSchema)