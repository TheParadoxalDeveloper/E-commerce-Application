process.on('uncaughtException', (error) => {
    console.error('Caught exception:', error);
})
import express from 'express'
import { dbConnection } from './src/database/dbConnection.js'
import { bootstrap } from './bootstrap.js';
import { globalError } from './src/middleware/globalError.js';
import { AppError } from './src/utils/AppError.js';
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
const app = express()
const port = process.env.PORT || 3999
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))
bootstrap(app)


app.use('*', (req, res, next) => {
    next(new AppError(`route not found:${req.originalUrl}`, 404))
})

app.use(globalError)

process.on('unhandledRejection', (error) => {
    console.error('Caught rejection:', error);
})
app.get('/', (req, res) => res.send('E-Commerce Final Project'))
app.listen(port, () => console.log(`E-Commerce Project running on port ${port}!`))