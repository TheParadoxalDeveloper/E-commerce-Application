import bcrypt from "bcrypt";
import { model, Schema, Types } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'name is too short']
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    isBlocked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    passwordChangedAt: Date,
    wishlist: [{ type: Types.ObjectId, ref: 'Product' }],
    address: [{
        city: String,
        street: String,
        phone: String
    }]
}, {
    timestamps: true,
    versionKey: false
})

userSchema.pre('save', function () {
    if (this.password) this.password = bcrypt.hashSync(this.password, 8)
})

userSchema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8)
})



export let User = model('User', userSchema)