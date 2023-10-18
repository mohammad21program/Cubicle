import express from "express";
import {auth, PostPictureUploadMiddleWare} from "../middlewares/auth.js";
import {
    commentPost,
    createPost,
    DeletePost, editPost,
    fetchPosts,
    reactPost,
    ShowPostPicture,
    uploadPostPicture
} from "../controllers/posts.js";

const Router = express.Router();

Router.post("/create/post", auth, createPost);
Router.delete("/delete/post/:id", auth, DeletePost)
Router.get("/fetch/posts", auth, fetchPosts);
Router.put("/react/post/:id", auth,reactPost);
Router.put("/comment/post/:id", auth, commentPost)
Router.put("/edit/post/:id", auth, editPost)
Router.post("/upload/post/picture", PostPictureUploadMiddleWare, uploadPostPicture);
Router.get("/get/post/picture/:filename", ShowPostPicture);
export default Router;