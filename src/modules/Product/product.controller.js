import slugify from "slugify";
import { AppError } from "../../utils/AppError.js";
import { errorHandling } from "../../middleware/errorHandling.js";
import { Product } from "../../database/models/product.model.js";
import { deleteOne, getSpecificOne } from "../Handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

export const addProduct = errorHandling(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    req.body.imgCover = req.files.imgCover[0].filename
    req.body.images = req.files.images.map((element) => element.filename)
    let newProduct = new Product(req.body)
    await newProduct.save()
    res.status(201).json({ message: "Product added successfully!", newProduct })
})

export const getAllProduct = errorHandling(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(Product.find(), req.query).pagination().sorting().searching().filtering().selectedFields()
    let products = await apiFeatures.mongooseQuery
    res.status(200).json({ message: "Products loaded successfully!", page: apiFeatures.pageNum, products })
})

export const getProduct = getSpecificOne(Product)

export const updateProduct = errorHandling(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    let updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedProduct) return next(new AppError('Product not found!', 404))
    res.status(200).json({ message: "Product updated successfully!", updatedProduct })
})

export const deleteProduct = deleteOne(Product)
