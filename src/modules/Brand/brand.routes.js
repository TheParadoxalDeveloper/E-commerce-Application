import { Router } from "express";
import { addBrand, deleteBrand, getAllBrand, getBrand, updateBrand } from "./brand.controller.js";
import { signleFileUpload } from "../../fileUpload/fileUpload.js";

const brandRouter = Router()

brandRouter.route('/').post(signleFileUpload('logo', 'brands'), addBrand).get(getAllBrand)
brandRouter.route('/:id').get(getBrand).put(signleFileUpload('logo', 'brands'), updateBrand).delete(deleteBrand)

export default brandRouter