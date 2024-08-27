
import { AppError } from "../../utils/AppError.js";
import { errorHandling } from "../../middleware/errorHandling.js";
import { User } from "../../database/models/user.model.js";


export const addWishlist = errorHandling(async (req, res, next) => {
    let wishlist = await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: req.body.product } }, { new: true });
    if (!wishlist) return next(new AppError('not found!', 404))
    res.status(200).json({ message: "success", wishlist })
})

export const removeWishlist = errorHandling(async (req, res, next) => {
    let wishlist = await User.findByIdAndUpdate(req.user._id, { $pull: { wishlist: req.params.id } }, { new: true });
    if (!wishlist) return next(new AppError('not found!', 404))
    res.status(200).json({ message: "success", wishlist })
})

export const getWishlist = errorHandling(async (req, res, next) => {
    let wishlist = await User.findById(req.user._id).populate('wishlist')
    if (!wishlist) return next(new AppError('not found!', 404))
    res.status(200).json({ message: "success", wishlist: wishlist.wishlist })
}) 


