import slugify from "slugify";
import { AppError } from "../../utils/AppError.js";
import { errorHandling } from "../../middleware/errorHandling.js";
import { subCategory } from "../../database/models/subCategory.model.js";
import { deleteOne, getSpecificOne } from "../Handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

export const addSubCategory = errorHandling(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let newSubCategory = new subCategory(req.body)
    await newSubCategory.save()
    res.status(201).json({ message: "SubCategory added successfully!", newSubCategory })
})

export const getAllSubCategory = errorHandling(async (req, res, next) => {
    let subCategories = await subCategory.find().populate("category")
    res.status(200).json({ message: "SubCategories loaded successfully!", subCategories })
})

export const getSubCategory = getSpecificOne(subCategory)

export const updateSubCategory = errorHandling(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let updatedSubCategory = await subCategory.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedSubCategory) return next(new AppError('SubCategory not found!', 404))
    res.status(200).json({ message: "SubCategory updated successfully!", updatedSubCategory })
})

export const deleteSubCategory = deleteOne(subCategory)