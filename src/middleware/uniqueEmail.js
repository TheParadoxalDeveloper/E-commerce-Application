import { User } from "../database/models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const uniqueEmail = async (req, res, next) => {
    let existEmail = await User.findOne({ email: req.body.email })
    if (existEmail){
        return next(new AppError('Email already exists', 400))
    }
    next()
}