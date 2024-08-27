import { Router } from "express";
import { addSubCategory, deleteSubCategory, getAllSubCategory, getSubCategory, updateSubCategory } from "./subcategory.controller.js";

const subCategoryRouter = Router()

subCategoryRouter.route('/').post(addSubCategory).get(getAllSubCategory)
subCategoryRouter.route('/:id').get(getSubCategory).put(updateSubCategory).delete(deleteSubCategory)

export default subCategoryRouter