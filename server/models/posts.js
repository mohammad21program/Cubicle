import mongoose from "mongoose";

const posts = new mongoose.Schema({
    Content: String,
    Images: [],
    Reaction: [],
    Likes: [],
    Comments: [],
    OwnerKey: String,
    OwnerName: String,
    OwnerPhoto: String,
}, {timestamps: true});

export default mongoose.model("posts", posts)