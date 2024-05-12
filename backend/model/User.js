import { model, Schema } from "mongoose";

const userSchema = new Schema({
    rollNumber: { type: String, unique: true },
    password: { type: String },
});

const User = model('User', userSchema);
export default User;
