export const globalError = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({ error: "YOU HAVE AN ERROR!", message: err.message, code: err.statusCode, stack: err.stack.split('\n') })
}