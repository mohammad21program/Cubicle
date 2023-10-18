import mongoose from "mongoose";

const notifications = new mongoose.Schema({
    Title: String,
    Description: String,
    Image: String,
    isRead: {
        type: Boolean,
        default: false
    },
    isShow: {
        type: Boolean,
        default: false
    },
    Url: String,
    OwnerKey: String
}, {timestamps: true});

export default mongoose.model("notification", notifications)