import { Schema, model } from "mongoose";

const feedbackSchema = new Schema({
    receiverRollNumber: String,
    senderRollNumber: String,
    message: String,
});

const Feedback = model("Feedback", feedbackSchema);

export default Feedback;