import slugify from "slugify";
import { Category } from "../../database/models/category.model.js"
import { AppError } from "../../utils/AppError.js";
import { errorHandling } from "../../middleware/errorHandling.js";
import { deleteOne, getSpecificOne } from "../Handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

export const addCategory = errorHandling(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let newCategory = new Category(req.body)
    await newCategory.save()
    res.status(201).json({ message: "Category added successfully!", newCategory })
})

export const getAllCategory = errorHandling(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(Category.find(), req.query).pagination().sorting().searching().filtering().selectedFields()
    let categories = await apiFeatures.mongooseQuery
    res.status(200).json({ message: "Categories loaded successfully!", categories })
})

export const getCategory = getSpecificOne(Category)

export const updateCategory = errorHandling(async (req, res, next) => {
    if (req.body.slug) req.body.slug = slugify(req.body.name)
    if (req.file) req.body.image = req.file.filename
    let updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedCategory) return next(new AppError('Category not found!', 404))
    res.status(200).json({ message: "Category updated successfully!", updatedCategory })
})

export const deleteCategory = deleteOne(Category)