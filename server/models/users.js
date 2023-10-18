import mongoose from "mongoose";

const users = new mongoose.Schema({
    Email: String,
    Password: String,
    Name: String,
    Photo: String,
    Mobile: String,
    Key: String
}, {timestamps: true});

export default mongoose.model("user", users)