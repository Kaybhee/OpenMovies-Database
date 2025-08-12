import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './server/config.js'
import reviewRouter from './server/routes/revRoutes.js'
import morgan from 'morgan';
import err from './middlewares/error/errCheck.js';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI


const PORT = 3000;
// connecting to a database
connectDB();

// Middlewares
const app = express();
app.use(cors('*'));
app.use(express.json());
app.use(morgan('dev'))


// Serve static files html/css/js
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for errors
app.use(err)

// router requests 
app.use('/api/v1/reviews', reviewRouter);



app.listen(PORT || MONGODB_URI, () => {
    console.log(`Server running at https://localhost:${PORT}`);
})


