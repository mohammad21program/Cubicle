import bcrypt from "bcryptjs";
import users from "../models/users.js";
import {generateUserIdCode, SignToken} from "../Services/functions.js";
import Users from "../models/users.js";
import {fileURLToPath} from "url";
import {dirname} from "path";
import Notifications from "./notifications.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
export const Signup = async (req, res) => {
    try {
        const {Email, Password: PlainPassword, FirstName, LastName, Mobile, Photo} = req.body;
        const existingUser = await Users.findOne({Email})
        if (existingUser) {
            res.status(404).json({message: "Email already existing"})
        } else {
            const hashPassword = await bcrypt.hash(PlainPassword, 15);
            const user = await users.create({
                Email, Password: hashPassword, Photo, Key: generateUserIdCode(),
                Name: `${FirstName} ${LastName}`, Mobile
            });
            const token = await SignToken({user});
            res.status(200).json({user, token})
        }
    } catch (error) {
        res.status(500).json({message: "Server"})
    }
}

export const Login = async (req, res) => {
    try {
        const {Email, Password} = req.body;
        const user = await users.findOne({Email});
        if (user) {
            const isCorrectPassword = await bcrypt.compare(Password, user?.["Password"]);
            if (!isCorrectPassword) {
                res.status(404).json({message: "Invalid email or password"})
            } else {
                const token = await SignToken({user})
                res.status(200).json({user, token});
            }
        } else {
            res.status(404).json({message: "Invalid email or password"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server"})
    }
}


export const UploadProfilePicture = (req, res) => {
    const file = req.file;
    if (!file) {
        res.status(400).json({message: "Please upload a file"})
    }
    res.send(file)
}

export const PasswordReset = async (req, res) => {
    try {
        const {NewPassword, CurrentPassword, ReTypeNewPassword} = req.body;
        const user = await users.findOne({Email: req.user.user.Email, Key: req.user.user.Key});
        if (user) {
            const OldPassword = await bcrypt.compare(CurrentPassword, user["Password"]);
            const isMatchWithNewMPassword = await bcrypt.compare(NewPassword, user["Password"]);
            if (NewPassword !== ReTypeNewPassword) {
                res.status(400).json({message: "You must enter the same password twice in order to confirm it"})
            } else if (isMatchWithNewMPassword) {
                res.status(400).json({message: "The new password must differ from the current password.."})
            } else if (!OldPassword) {
                res.status(400).json({message: "Enter a valid password and try again."})
            } else {
                const hashedPassword = await bcrypt.hash(NewPassword, 10);
                await users.findOneAndUpdate({_id: req.user.user._id, Key: req.user.user.Key, Email: req.user.user.Email}, {Password: hashedPassword});
                res.status(200).json({message: "Password is reset."})
            }
        } else {
            res.status(404).json({message: "Invalid email or password"})
        }
    } catch (error) {
        res.status(500).json({message: "Server"})
    }
}

export const ShowProfilePicture = (req, res) => {
    const {filename} = req.params;
    const fileDirectory = __dirname.replace("controllers", "")
    res.sendFile(`${fileDirectory}/files/images/profile_picture/${filename}`)
}

export const getNotifications =async (req, res) => {
    try {
        const notifications = await Notifications.find({OwnerKey: req.user.user.Key}).sort({createdAt: -1});
        res.status(200).json({notifications})
    } catch (error) {
        res.status(500).json({message: "Server"})
    }
}

export const UpdateNotification = async (req, res) => {
    try {
        const {Read, UnRead,ShowAll} = req.body;
        const {id} = req.params;
        if (ShowAll) {
            await Notifications.updateMany({OwnerKey: req.user.user.Key}, {isShow: true})
        } else if (Read) {
            await Notifications.findByIdAndUpdate(id, {isRead: true})
        } else if (UnRead) {
            await Notifications.findByIdAndUpdate(id, {isRead: false})
        }
        res.status(200).json({message: "Successfully updated"})
    } catch (error) {
        res.status(500).json({message: "Server"})
    }
}