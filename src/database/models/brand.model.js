import { model, Schema } from "mongoose";

const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'brand name must be unique'],
        trim: true,
        minLength: [2, 'brand name is too short']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    logo: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
    versionKey: false
})

brandSchema.post('init', function (doc) {
    doc.logo = process.env.FILE_UPLOAD + 'brands/' + doc.logo
})

export let Brand = model('Brand', brandSchema)