import { connect } from 'mongoose';
export const dbConnection = connect('mongodb+srv://route42:route42@paradoxal-activity.41jqk.mongodb.net/E-Commerce').then(() => {
    console.log('Connected to E-Commerce Database!');
}).catch((error) => {
    console.log('Error connecting to E-Commerce Database:', error);
})