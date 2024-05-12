import express from 'express'
import User from '../model/User.js'
import jwt from 'jsonwebtoken';
const auth_routes = express.Router();
import dotenv from 'dotenv'
dotenv.config();
auth_routes.post('/register', async (req, res) => {
    try {
        const { rollNumber, password } = req.body;
        const newUser = new User({ rollNumber, password })
        await newUser.save();
        console.log("Data saved successfully");
        res.json(newUser)
    }
    catch (error) {
        console.error(error);
    }
})
auth_routes.post('/login', async (req, res) => {
    try {
        const { rollNumber, password } = req.body;
        const user = await User.findOne(({ rollNumber }))
        if (!user) {
            console.log("user not found");
            return res.json("user_not_found")
        }
        if (user.password !== password) {
            console.log("Passwords do not match");
            return res.json("password_do_not_match");
        }
        const token = jwt.sign({ rollNumber: user.rollNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json(token);
        console.log("JWT_SECRET used for token generation:", process.env.JWT_SECRET);
        console.log(token)
    }
    catch (error) {
        console.error(error);
    }
})

export default auth_routes;