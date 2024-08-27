import slugify from "slugify";
import { AppError } from "../../utils/AppError.js";
import { errorHandling } from "../../middleware/errorHandling.js";
import { Brand } from "../../database/models/brand.model.js";
import { deleteOne, getSpecificOne } from "../Handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

export const addBrand = errorHandling(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let newBrand = new Brand(req.body)
    await newBrand.save()
    res.status(201).json({ message: "success", newBrand })
})

export const getAllBrand = errorHandling(async (req, res, next) => {

    let apiFeatures = new ApiFeatures(Brand.find(), req.query).pagination().sorting().searching().filtering().selectedFields()
    let brand = await apiFeatures.mongooseQuery
    res.status(200).json({ message: "success", brand })
})

export const getBrand = getSpecificOne(Brand)

export const updateBrand = errorHandling(async (req, res, next) => {
    if (req.body.slug) req.body.slug = slugify(req.body.name)
    if (req.file) req.body.logo = req.file.filename
    let updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedBrand) return next(new AppError('Brand not found!', 404))
    res.status(200).json({ message: "success", updatedBrand })
})

export const deleteBrand = deleteOne(Brand)