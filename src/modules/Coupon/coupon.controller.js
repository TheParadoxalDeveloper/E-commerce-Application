import { AppError } from "../../utils/AppError.js";
import { errorHandling } from "../../middleware/errorHandling.js";
import { deleteOne, getSpecificOne } from "../Handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { Coupon } from "../../database/models/coupon.model.js";

export const addCoupon = errorHandling(async (req, res, next) => {
    let checkCoupon = await Coupon.findOne({ code: req.body.code })
    if (checkCoupon) return next(new AppError('Coupon Exists!', 409))
    let newCoupon = new Coupon(req.body)
    await newCoupon.save()
    res.status(201).json({ message: "success", newCoupon })
})

export const getAllCoupons = errorHandling(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(Coupon.find(), req.query).pagination().sorting().searching().filtering().selectedFields()
    let coupon = await apiFeatures.mongooseQuery
    res.status(200).json({ message: "success", coupon })
})

export const updateCoupon = errorHandling(async (req, res, next) => {
    let updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedCoupon) return next(new AppError('Coupon not found!', 404))
    res.status(200).json({ message: "success", updatedCoupon })
})

export const getCoupon = getSpecificOne(Coupon)

export const deleteCoupon = deleteOne(Coupon)