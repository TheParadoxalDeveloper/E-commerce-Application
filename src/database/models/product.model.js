import { model, Schema } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, 'product title is too short']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 2000
    },
    imgCover: String,
    images: [String],
    price: {
        type: Number,
        required: true,
        min: 0
    },
    priceAfterDiscount: {
        type: Number,
        min: 0
    },
    sold: Number,
    inStock: {
        type: Number,
        min: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'subCategory',
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    rateAvg: {
        type: Number,
        min: 0,
        max: 5
    },
    rateCount: Number,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true } 
})

productSchema.post('init', function (doc) {
    if (doc.imgCover) doc.imgCover = process.env.FILE_UPLOAD + 'products/' + doc.imgCover
    if (doc.images) doc.images = doc.images.map(element => process.env.FILE_UPLOAD + 'products/' + element)
})

productSchema.virtual('productReviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product'
})

productSchema.pre('findOne', function () {
    this.populate('productReviews')
})

export let Product = model('Product', productSchema)