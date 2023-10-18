import Posts from "../models/posts.js";
import {fileURLToPath} from "url";
import {dirname} from "path";
import Notifications from "./notifications.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
export const createPost = async (req, res) => {
    try {
        const {Content, Images} = req.body;
        const post = await Posts.create({
            Content, Images, OwnerName: req.user.user.Name,
            OwnerPhoto: req.user.user.Photo, OwnerKey: req.user.user.Key,
        });
        res.status(200).json({post})
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

export const DeletePost = async (req, res) => {
    try {
        const {id} = req.params;
        await Posts.findByIdAndDelete(id)
        res.status(200).json({message: "Delete Success"})
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

export const editPost = async (req, res) => {
    try {
        const {id} = req.params;
        await Posts.findByIdAndUpdate(id, {...req.body});
        const updatePost = await Posts.findById(id)
        res.status(200).json({post: updatePost})
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}
export const fetchPosts = async (req, res) => {
    try {
        const posts = await Posts.find().sort({createdAt: -1})
        res.status(200).json({posts})
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

export const reactPost = async (req, res) => {
    try {
        const {id} = req.params;
        const {Like, UnLike} = req.body;
        const findPost = await Posts.findById(id)
        if (Like) {
            await Posts.findByIdAndUpdate(id, {$push: {Likes: req.user.user.Key}});
            if (findPost?.["OwnerKey"] !== req.user.user.Key) {
                await Notifications.create({
                    Title: req.user.user.Name,
                    OwnerKey: findPost?.["OwnerKey"],
                    Image: req.user.user.Photo,
                    Description: `${req.user.user.Name} liked to your post`,
                    Url: `/post/${findPost?.["_id"]}`
                })
            }
        } else if (UnLike) {
            await Posts.findByIdAndUpdate(id, {$pull: {Likes: req.user.user.Key}})
        }
        const updatePost = await Posts.findById(id)
        res.status(200).json({post: updatePost})
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

export const commentPost = async (req, res) => {
    try {
        const {id} = req.params;
        const {Comment, Delete, Comments, Date: PostDate} = req.body;
        const findPost = await Posts.findById(id)
        if (Comment) {
            await Posts.findByIdAndUpdate(id, {$push: {Comments: {OwnerKey: req.user.user.Key, OwnerName: req.user.user.Name, OwnerPhoto: req.user.user.Photo, Comment: Comments, Date: Date.now()}}});
            if (findPost?.["OwnerKey"] !== req.user.user.Key) {
                await Notifications.create({
                    Title: req.user.user.Name,
                    OwnerKey: findPost?.["OwnerKey"],
                    Image: req.user.user.Photo,
                    Description: `${req.user.user.Name} comment to your post`,
                    Url: `/post/${findPost?.["_id"]}`
                })
            }
        } else if (Delete) {
            await Posts.findByIdAndUpdate(id, {$pull: {Comments: {OwnerKey: req.user.user.Key, Date: PostDate}}})
        }
        const updatePost = await Posts.findById(id)
        res.status(200).json({post: updatePost})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error"})
    }
}

export const uploadPostPicture = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).json({message: "Please upload a file"})
        }
        res.send(file)
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

export const ShowPostPicture = (req, res) => {
    const {filename} = req.params;
    console.log("Working..")
    const fileDirectory = __dirname.replace("controllers", "")
    res.sendFile(`${fileDirectory}/files/images/post_picture/${filename}`)
}