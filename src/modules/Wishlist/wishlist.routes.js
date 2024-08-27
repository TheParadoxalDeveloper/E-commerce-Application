import { Router } from "express";
import { addWishlist, getWishlist, removeWishlist } from "./wishlist.controller.js";
import { allowedAccess, protectedRoutes } from "../Authentication/auth.controller.js";

const wishlistRouter = Router()

wishlistRouter.route('/').patch(protectedRoutes, allowedAccess('user'), addWishlist).get(protectedRoutes, allowedAccess('user'), getWishlist)
wishlistRouter.route('/:id').delete(protectedRoutes, allowedAccess('user'), removeWishlist)


export default wishlistRouter