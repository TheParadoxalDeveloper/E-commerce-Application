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
import { errorHandling } from './src/middleware/errorHandling.js';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PsExQ02VAOtDixEYWwOVXt04niNt1c4Cy3R1Si4CSm5hdO7670s5cjmmhOrUAlhUd1h0ZK0hcFYyQAtuhILHTnb00Gmx57s4T');
dotenv.config()
const app = express()
const port = process.env.PORT || 3999

app.post('/api/v1/webhook', express.raw({ type: 'application/json' }), errorHandling((req, res) => {
    const sig = req.headers['stripe-signature'].toString()
    let event = stripe.webhooks.constructEvent(req.body, sig, "whsec_nFXM6eQg2BnxvWj5FobOAeevyzTXMMhW");
    let checkout;
    if (event.type == 'checkout.session.completed') {
        checkout = event.data.object;
    }
    res.json({ message: 'success', checkout });
}));

app.use(cors())
app.use(express.json())
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



