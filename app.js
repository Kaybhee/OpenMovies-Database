import express from 'express';
import cors from 'cors';
import connectDB from './server/config.js'
import reviewRouter from './server/routes/revRoutes.js'
import morgan from 'morgan';
export const MONGODB_URI = process.env.MONGODB_URI


const PORT = 5000;
// connecting to a database
connectDB();

// Middlewares
const app = express();
app.use(cors('*'));
app.use(express.json());
app.use(morgan('dev'))

// router requests 
app.use('/api/v1/reviews', reviewRouter);



app.listen(PORT || MONGODB_URI, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})


