import { model, Schema } from "mongoose";

let cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    cartItems: [
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
    totalCartPrice: {
        type: Number
    },
    discount: Number,
    totalCartPriceAfterDiscount: Number

},
    { timestamps: true, versionKey: false }
)

export let Cart = model('Cart', cartSchema)