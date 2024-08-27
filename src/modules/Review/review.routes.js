import { Router } from "express";
import { addReview, deleteReview, getAllReviews, getReview, updateReview } from "./review.controller.js";
import { allowedAccess, protectedRoutes } from "../Authentication/auth.controller.js";

const reviewRouter = Router()

reviewRouter.route('/').post(protectedRoutes, allowedAccess('user'), addReview).get(getAllReviews)
reviewRouter.route('/:id').get(getReview).put(protectedRoutes, allowedAccess('user'), updateReview).delete(protectedRoutes, allowedAccess('user', 'admin'), deleteReview)

export default reviewRouter