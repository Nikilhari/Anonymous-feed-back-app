import express from 'express'
import mongoose from 'mongoose';
import feedback_router from './routes/feedback_routes.js';
import auth_routes from './routes/auth_routes.js';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongoDB...");
    }
    catch (error) {
        console.error(error.message);
        console.log("error connecting to database")
        process.exit(1);
    }
}
connectDB();
app.use('/auth', auth_routes);
app.use('/feedback', feedback_router)
app.listen(3000, () => {
    console.log("server started in port http://localhost:3000")
})