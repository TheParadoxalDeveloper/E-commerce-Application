import { model, Schema } from "mongoose";

const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'sub category name must be unique'],
        trim: true,
        minLength: [2, 'sub category name is too short']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
    versionKey: false
})

export let subCategory = model('subCategory', subCategorySchema)