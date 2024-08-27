import { Cart } from "../../database/models/cart.model.js";
import { Order } from "../../database/models/order.model.js";
import { Product } from "../../database/models/product.model.js";
import { errorHandling } from "../../middleware/errorHandling.js";
import { AppError } from "../../utils/AppError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PsExQ02VAOtDixEYWwOVXt04niNt1c4Cy3R1Si4CSm5hdO7670s5cjmmhOrUAlhUd1h0ZK0hcFYyQAtuhILHTnb00Gmx57s4T');


export const createCashOrder = errorHandling(async (req, res, next) => {
    //    - get user cart
    let cart = await Cart.findById(req.params.id);
    if (!cart) return next(new AppError('Cart not found', 404));
    //    - get order total price
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
    //    - create order
    let order = new Order({
        user: req.user._id,
        orderItems: cart.cartItems,
        shippingAddress: req.body.shippingAddress,
        payment_method: req.body.paymentMethod,
        totalOrderPrice: totalOrderPrice,
    })
    //    - increment sold & decrement inStock 
    let options = cart.cartItems.map((item) => {
        return ({
            updateOne: {
                filter: { _id: item.item },
                update: { $inc: { sold: item.quantity, inStock: -item.quantity } }
            },
        })
    })
    Product.bulkWrite(options)
    //    - save order & clear cart
    await Cart.findByIdAndDelete(cart._id)
    await order.save()
    res.status(201).json({ message: 'Order created successfully', order })
})

export const createCheckout = errorHandling(async (req, res, next) => {
    let cart = await Cart.findById(req.params.id);
    if (!cart) return next(new AppError('Cart not found', 404));
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'egp',
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: req.user.name
                    }
                },
                quantity: 1
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3999/api/v1/product',
        cancel_url: 'http://localhost:3999/api/v1/category',
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress
    })
    res.status(200).json({ message: 'success', session })
})

export const getUserOrders = errorHandling(async (req, res, next) => {
    let userOrders = await Order.find({ user: req.user._id }).populate('orderItems.item')
    res.status(200).json({ message: 'success', userOrders })
})

export const getSpecificUserOrder = errorHandling(async (req, res, next) => {
    let userOrders = await Order.findById(req.params.id)
    res.status(200).json({ message: 'success', userOrders })
})

export const getAllOrders = errorHandling(async (req, res, next) => {
    let allOrders = await Order.find({})
    res.status(200).json({ message: 'success', allOrders })
})


