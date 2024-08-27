import { AppError } from "../../utils/AppError.js";
import { errorHandling } from "../../middleware/errorHandling.js";
import { deleteOne, getSpecificOne } from "../Handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { Review } from "../../database/models/review.model.js";

export const addReview = errorHandling(async (req, res, next) => {
    req.body.user = req.user._id
    let checkReview = await Review.find({ user: req.body.user, product: req.body.product })
    let newReview = new Review(req.body)
    if (checkReview.length > 0) return next(new AppError("You have already reviewed this product", 400))
    await newReview.save()
    res.status(201).json({ message: "success", newReview })
})

export const getAllReviews = errorHandling(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(Review.find(), req.query).pagination().sorting().searching().filtering().selectedFields()
    let review = await apiFeatures.mongooseQuery
    res.status(200).json({ message: "success", review })
})

export const getReview = getSpecificOne(Review)

export const updateReview = errorHandling(async (req, res, next) => {
    let updatedReview = await Review.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
    if (!updatedReview) return next(new AppError('Review not found or you are not authorized.', 404))
    res.status(200).json({ message: "success", updatedReview })

})

export const deleteReview = deleteOne(Review)