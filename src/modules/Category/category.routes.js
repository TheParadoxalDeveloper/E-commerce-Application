import { Router } from "express";
import { addCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from "./category.controller.js";
import { signleFileUpload } from "../../fileUpload/fileUpload.js";
import { getAllSubCategory } from "../SubCategory/subcategory.controller.js";
import { allowedAccess, protectedRoutes } from "../Authentication/auth.controller.js";

const categoryRouter = Router()

categoryRouter.route('/').post(signleFileUpload('image', 'categories'), protectedRoutes, allowedAccess('user', 'admin', 'manager'), addCategory).get(getAllCategory)
categoryRouter.route('/:id').get(getCategory).put(signleFileUpload('image', 'categories'), protectedRoutes, allowedAccess('admin', 'manager'), updateCategory).delete(protectedRoutes, allowedAccess(('admin')), deleteCategory)
categoryRouter.route('/:category/subcategory').get(getAllSubCategory)

export default categoryRouter 