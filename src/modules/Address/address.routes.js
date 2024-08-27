import { Router } from "express";
import { allowedAccess, protectedRoutes } from "../Authentication/auth.controller.js";
import { addAddress, getAddress, removeAddress } from "./address.controller.js";

const addressRouter = Router()

addressRouter.route('/').patch(protectedRoutes, allowedAccess('user'), addAddress).get(protectedRoutes, allowedAccess('user'), getAddress)
addressRouter.route('/:id').delete(protectedRoutes, allowedAccess('user'), removeAddress)


export default addressRouter