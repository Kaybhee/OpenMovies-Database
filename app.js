import express from 'express';
import cors from 'cors';
import connectDB from './server/config.js'
import reviewRouter from './server/routes/revRoutes.js'

export const MONGODB_URI = process.env.MONGODB_URI


const port = 5000;
// connecting to a database
connectDB();
// Initializing Express application
const app = express();
app.use(cors('*'));
app.use(express.json());
app.use('*', (req, res) => {
    res.status(404).json({message: "Not found"})
})
// router requests 
app.use('api/v1/reviews/', reviewRouter);



app.listen(MONGODB_URI || port, () => {
    console.log(`Server running at http://localhost:${port}`);
})


