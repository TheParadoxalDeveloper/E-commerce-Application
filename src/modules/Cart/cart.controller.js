import { Cart } from "../../database/models/cart.model.js";
import { Coupon } from "../../database/models/coupon.model.js";
import { Product } from "../../database/models/product.model.js";
import { errorHandling } from "../../middleware/errorHandling.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { AppError } from "../../utils/AppError.js";

function CalculateTotalPrice(iscartExist) {
    iscartExist.totalCartPrice = iscartExist.cartItems.reduce((prev, item) => prev += item.price * item.quantity, 0)
    if (iscartExist.discount) {
        iscartExist.totalCartPriceAfterDiscount = iscartExist.totalCartPrice - (iscartExist.totalCartPrice * iscartExist.discount) / 100
    }
}
export const getCart = errorHandling(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(Cart.findOne({ user: req.user._id }), req.query).pagination().sorting().searching().filtering().selectedFields()
    let cart = await apiFeatures.mongooseQuery
    res.status(200).json({ message: "success", cart })
})

export const addtoCart = errorHandling(async (req, res, next) => {
    let cartExist = await Cart.findOne({ user: req.user._id })
    let product = await Product.findById(req.body.item)
    if (!product) return next(new AppError('Product not found', 404))
    req.body.price = product.price
    if (!cartExist) {
        let newCart = new Cart({
            user: req.user._id,
            cartItems: [req.body],
            totalCartPrice: req.body.price * req.body.quantity
        })
        await newCart.save()
        res.status(201).json({ message: "Successfully added product to new cart!", newCart })
    } else {
        let item = cartExist.cartItems.find(item => item.item == req.body.item)
        if (item) {
            item.quantity += req.body.quantity
            if (item.quantity > product.inStock) return next(new AppError('Sold out!', 404))
        }
        if (!item) cartExist.cartItems?.push(req.body)
        CalculateTotalPrice(cartExist)
        await cartExist.save()
        res.status(201).json({ message: "Successfully added product to cart!", cartExist })
    }
})

export const updateQuantity = errorHandling(async (req, res, next) => {
    let cartExist = await Cart.findOne({ user: req.user._id })
    const item = cartExist.cartItems.find(item => item.item == req.params.id);
    if (!item) return next(new AppError('Item not found in cart', 404));
    item.quantity = req.body.quantity;
    CalculateTotalPrice(cartExist)
    await cartExist.save()
    res.status(200).json({ message: "success", cartExist })
})

export const deleteFromCart = errorHandling(async (req, res, next) => {
    let product = await Cart.findOneAndUpdate({ user: req.user._id }, { $pull: { cartItems: { item: req.params.id } } }, { new: true })
    if (!product) return next(new AppError('Product not found', 404))
    CalculateTotalPrice(product)
    await product.save()
    res.status(200).json({ message: "success", product })
})

export const clearCart = errorHandling(async (req, res, next) => {
    let cart = await Cart.findOneAndDelete({ user: req.user._id })
    if (!cart) return next(new AppError('Cart not found', 404));
    res.status(200).json({ message: "success", cart })
})

export const applyCoupon = errorHandling(async (req, res, next) => {
    let checkCoupon = await Coupon.findOne({ code: req.body.code, expires: { $gte: Date.now() } })
    if (!checkCoupon) return next(new AppError('Oops! Coupon Invalid or Expired.', 404))
    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return next(new AppError('Cart not found.', 404))
    cart.discount = checkCoupon.discount
    CalculateTotalPrice(cart)
    await cart.save()
    res.status(200).json({ message: "success", cart, checkCoupon })
})