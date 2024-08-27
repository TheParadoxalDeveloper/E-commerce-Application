import { Router } from "express";
import { allowedAccess, protectedRoutes } from "../Authentication/auth.controller.js";
import { createCashOrder, createCheckout, getAllOrders, getSpecificUserOrder, getUserOrders } from "./order.controller.js";


const orderRouter = Router()

orderRouter.route('/my-orders').get(protectedRoutes, allowedAccess('user', 'admin'), getUserOrders)

orderRouter.route('/my-orders/:id').get(protectedRoutes, allowedAccess('user'), getSpecificUserOrder)

orderRouter.route('/cash-order/:id').post(protectedRoutes, allowedAccess('user'), createCashOrder)

orderRouter.route('/card-order/:id').post(protectedRoutes, allowedAccess('user'), createCheckout)

orderRouter.route('/allOrders').get(protectedRoutes, allowedAccess('admin'), getAllOrders)


export default orderRouter