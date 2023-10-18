import multer from "multer";
import fs from "fs";
import {VerifyToken} from "../Services/functions.js";
import users from "../models/users.js";

const ProfilePictureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const directory = "./files/images/profile_picture";
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, {recursive: true})
        }
        cb(null, directory)
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename)
    }
});

const PostPictureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const directory = "./files/images/post_picture";
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, {recursive: true})
        }
        cb(null, directory)
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename)
    }
});

export const ProfilePictureUploadMiddleWare = multer({storage: ProfilePictureStorage}).single("file");
export const PostPictureUploadMiddleWare = multer({storage:PostPictureStorage}).single("file");

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(401).json({message: "Without authorized user, Request will be denied"});
        const user = await VerifyToken(token);
        const findUser= await users.findOne({Key: user.user.Key, Email: user?.user?.Email});
        if (findUser) {
            req.user = user;
            next();
        } else {
            console.log("Picture")
            res.status(400).json({message: "The Session has expired"})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "you are not valid user"})
    }
}