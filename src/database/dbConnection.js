import { connect } from 'mongoose';

const mongoUri = process.env.MONGODB_URI

export const dbConnection = connect(mongoUri).then(() => {
    console.log('Connected to E-Commerce Database!');
}).catch((error) => {
    console.log('Error connecting to E-Commerce Database:', error);
})
