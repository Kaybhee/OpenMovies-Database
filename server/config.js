import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {MONGODB_URI} from '../app.js'
dotenv.config()


const connectDB = async() => {
    try {
        const conn = await mongoose.connect(MONGODB_URI)
        console.log(`MONGODB connected: ${conn.connection.host}`)
    }
    catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}
export default connectDB;