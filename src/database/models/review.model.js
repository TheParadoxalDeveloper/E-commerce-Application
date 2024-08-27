import { model, Schema } from "mongoose";

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rate:{
        type:Number,
        required:true,
        min:0,
        max:5
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export let Review = model('Review', reviewSchema)