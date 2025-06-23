import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './server/config.js'
import reviewRouter from './server/routes/revRoutes.js'
import morgan from 'morgan';
import err from './middlewares/error/errCheck.js';
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI


const PORT = 5000;
// connecting to a database
connectDB();

// Middlewares
const app = express();
app.use(cors('*'));
app.use(express.json());
app.use(morgan('dev'))

// Middleware for errors
app.use(err)

// router requests 
app.use('/api/v1/reviews', reviewRouter);



app.listen(PORT || MONGODB_URI, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})


