import { User } from "../../database/models/user.model.js"
import { errorHandling } from "../../middleware/errorHandling.js"
import { AppError } from "../../utils/AppError.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signUp = errorHandling(async (req, res, next) => {
    let newUser = new User(req.body)
    await newUser.save()
    let token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.SECRET_KEY)
    res.status(201).json({ message: "success", token })
})


export const signIn = errorHandling(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY)
        res.json({ message: 'success', token })
    }
    next(new AppError("Incorrect Credentials", 401))
})

export const changePassword = errorHandling(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
        await User.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword, passwordChangedAt: Date.now() })
        let token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY)
        res.json({ message: 'success', token })
    }
    next(new AppError("Incorrect Credentials", 401))
})

// handling old token validity, expiring old token after password change
export const protectedRoutes = errorHandling(async (req, res, next) => {
    let { token } = req.headers
    let userPayload = null
    if (!token) return next(new AppError("token not provided", 401))
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) return next(new AppError("invalid token", 401))
        userPayload = decoded
    })
    let user = await User?.findById(userPayload.userId)
    if (!user) return next(new AppError("You do not have permission to access this"))
    let passwordChangeTime = parseInt(user.passwordChangedAt?.getTime() / 1000)
    let tokenTime = userPayload.iat
    if (passwordChangeTime > tokenTime) {
        return next(new AppError("Your password has been changed, please login again"))
    }
    req.user = user
    next()
})

export const allowedAccess = (...roles) => {
    return errorHandling(async (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next()
        } else {
            return next(new AppError("You do not have permission to access this"))
        }
    })
} 