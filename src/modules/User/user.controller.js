import { AppError } from "../../utils/AppError.js";
import { errorHandling } from "../../middleware/errorHandling.js";
import { deleteOne, getSpecificOne } from "../Handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { User } from "../../database/models/user.model.js";

export const addUser = errorHandling(async (req, res, next) => {
    let newUser = new User(req.body)
    await newUser.save()
    res.status(201).json({ message: "success", newUser })
})

export const getAllUser = errorHandling(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(User.find(), req.query).pagination().sorting().searching().filtering().selectedFields()
    let user = await apiFeatures.mongooseQuery
    res.status(200).json({ message: "success", user })
})

export const getUser = getSpecificOne(User)

export const updateUser = errorHandling(async (req, res, next) => {
    let updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedUser) return next(new AppError('User not found!', 404))
    res.status(200).json({ message: "success", updatedUser })
})

export const deleteUser = deleteOne(User)