import { errorHandling } from "../../middleware/errorHandling.js"
import { AppError } from "../../utils/AppError.js"

export function deleteOne(modelName) {
    return errorHandling(async (req, res, next) => {
        let deletedItem = await modelName.findByIdAndDelete(req.params.id)
        if (!deletedItem) return next(new AppError('Item not found!', 404))
        res.status(200).json({ message: "Item Deleted successfully!", deletedItem })
    })
}



export function getSpecificOne(modelName) {
    return errorHandling(async (req, res, next) => {
        let specifcItem = await modelName.findById(req.params.id)
        res.status(200).json({ message: "Item loaded successfully!", specifcItem })
    })
}