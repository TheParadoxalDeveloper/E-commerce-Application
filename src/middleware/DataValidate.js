import { AppError } from "../utils/AppError.js"

export const dataValidate = (schema) => {
    return (req, res, next) => {
        let { error } = schema.validate({ image: req.file, ...req.body, ...req.params, ...req.query }, { abortEarly: false })
        if (!error) {
            next()
        } else {
            let errMsg = error?.details.map(element => element.message)
            next(new AppError(errMsg, 400))
        }
    }
}