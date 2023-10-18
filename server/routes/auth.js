import express from "express";
import {
    getNotifications,
    Login,
    PasswordReset,
    ShowProfilePicture,
    Signup, UpdateNotification,
    UploadProfilePicture
} from "../controllers/auth.js";
import {auth, ProfilePictureUploadMiddleWare} from "../middlewares/auth.js";

const Router = express.Router();
Router.post("/signup", Signup);
Router.put("/login", Login);
Router.put("/password/reset", auth, PasswordReset)
Router.get("/get/notifications", auth, getNotifications)
Router.post("/upload/profile/picture", ProfilePictureUploadMiddleWare, UploadProfilePicture);
Router.get("/get/profile_picture/:filename", ShowProfilePicture);
Router.put("/update/notification/:id", auth, UpdateNotification)
export default Router;