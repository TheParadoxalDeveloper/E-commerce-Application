
import { AppError } from "../../utils/AppError.js";
import { errorHandling } from "../../middleware/errorHandling.js";
import { User } from "../../database/models/user.model.js";


export const addAddress = errorHandling(async (req, res, next) => {
    let address = await User.findByIdAndUpdate(req.user._id, { $push: { address: req.body } }, { new: true });
    if (!address) return next(new AppError('not found!', 404))
    res.status(200).json({ message: "success", address })
})

export const removeAddress = errorHandling(async (req, res, next) => {
    let address = await User.findByIdAndUpdate(req.user._id, { $pull: { address: { _id: req.params.id } } }, { new: true });
    if (!address) return next(new AppError('not found!', 404))
    res.status(200).json({ message: "success", address })
})

export const getAddress = errorHandling(async (req, res, next) => {
    let address = await User.findById(req.user._id)
    if (!address) return next(new AppError('not found!', 404))
    res.status(200).json({ message: "success", address: address.address })
})


