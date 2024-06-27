import express from 'express';
import Feedback from '../model/Feedback.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const feedbackRouter = express.Router();

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'User not allowed' });
    }

    try {
        console.log('JWT_SECRET used for token verification:', process.env.JWT_SECRET);
        console.log(token);
        const decodedToken = verifyToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

feedbackRouter.use(authenticateUser);

const getFeedbacks = async (req, res) => {
    const userNumber = req.user.rollNumber;
    console.log(userNumber);
    const feedbacks = await Feedback.find({ receiverRollNumber: userNumber });
    // if (!feedbacks) {
    //     return res.json({ message: 'No feedbacks' });
    // }
    return res.json({ feedbacks });
};

const createFeedback = async (req, res) => {
    try {
        const { receiverRollNumber, message } = req.body;
        const senderRollNumber = req.user.rollNumber;
        const newFeedback = new Feedback({ receiverRollNumber, senderRollNumber, message });
        await newFeedback.save();
        res.json(newFeedback);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create feedback' });
    }
};
const deleteFeedback = async (req, res) => {
    const feedbackId = req.params.id;
    console.log(feedbackId)
    try {
        await Feedback.deleteOne({ _id: feedbackId })
        console.log("deleted successfully")

    } catch (error) {
        console.error(error)
    }
}
feedbackRouter.get('/', getFeedbacks);
feedbackRouter.post('/', createFeedback);
feedbackRouter.delete('/:id', deleteFeedback);

export default feedbackRouter;