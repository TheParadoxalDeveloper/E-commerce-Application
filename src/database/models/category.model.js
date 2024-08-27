import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'category name must be unique'],
        trim: true,
        minLength: [2, 'category name is too short']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    image: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
    versionKey: false
})

categorySchema.post('init', function (doc) {
    doc.image = process.env.FILE_UPLOAD + 'categories/' + doc.image
})

export let Category = model('Category', categorySchema)