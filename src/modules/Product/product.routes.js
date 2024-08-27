import { Router } from "express";
import { addProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from "./product.controller.js";
import { MultiFileUpload, signleFileUpload } from "../../fileUpload/fileUpload.js";

const productRouter = Router()

productRouter.route('/').post(MultiFileUpload([{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 5 }], 'products'), addProduct).get(getAllProduct)
productRouter.route('/:id').get(getProduct).put(MultiFileUpload([{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 4 }], 'products'), updateProduct).delete(deleteProduct)

export default productRouter