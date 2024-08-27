import addressRouter from "./src/modules/Address/address.routes.js"
import authRouter from "./src/modules/Authentication/auth.routes.js"
import brandRouter from "./src/modules/Brand/brand.routes.js"
import cartRouter from "./src/modules/Cart/cart.routes.js"
import categoryRouter from "./src/modules/Category/category.routes.js"
import couponRouter from "./src/modules/Coupon/coupon.routes.js"
import orderRouter from "./src/modules/Order/order.routes.js"
import productRouter from "./src/modules/Product/product.routes.js"
import reviewRouter from "./src/modules/Review/review.routes.js"
import subCategoryRouter from "./src/modules/SubCategory/subcategory.routes.js"
import userRouter from "./src/modules/User/user.routes.js"
import wishlistRouter from "./src/modules/Wishlist/wishlist.routes.js"

export const bootstrap = (app) => {

    app.use('/api/v1/category', categoryRouter)
    app.use('/api/v1/subcategory', subCategoryRouter)
    app.use('/api/v1/brand', brandRouter)
    app.use('/api/v1/product', productRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/review', reviewRouter)
    app.use('/api/v1/wishlist', wishlistRouter)
    app.use('/api/v1/address', addressRouter)
    app.use('/api/v1/coupon', couponRouter)
    app.use('/api/v1/cart', cartRouter)
    app.use('/api/v1/order', orderRouter)

}