import { Router } from "express";
import { allowedAccess, protectedRoutes } from "../Authentication/auth.controller.js";
import { addtoCart, applyCoupon, clearCart, deleteFromCart, getCart, updateQuantity } from "./cart.controller.js";

const cartRouter = Router()

cartRouter.use(protectedRoutes, allowedAccess('user'))
cartRouter.route('/').post(addtoCart).get(getCart).delete(clearCart)
cartRouter.route('/:id').put(updateQuantity).delete(deleteFromCart)
cartRouter.route('/coupon').post(applyCoupon)


export default cartRouter