import { Router } from "express";
import { addCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from "./coupon.controller.js";
import { allowedAccess, protectedRoutes } from "../Authentication/auth.controller.js";

const couponRouter = Router()
couponRouter.use(protectedRoutes, allowedAccess('admin'))
couponRouter.route('/').post(addCoupon).get(getAllCoupons)
couponRouter.route('/:id').get(getCoupon).put(updateCoupon).delete(deleteCoupon)

export default couponRouter