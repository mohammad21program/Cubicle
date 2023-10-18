import axios from "axios";

const API = axios.create({
    baseURL: "/posts"
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    }
    return req;
});

export const fetchPosts = () => API.get("/fetch/posts");
export const createPost = (data) => API.post("/create/post", data);
export const uploadPostPicture =(data) => API.post("/upload/post/picture", data);
export const deletePost = (id) => API.delete(`/delete/post/${id}`);
export const editPost = (id, data) => API.put(`/edit/post/${id}`, data);
export const reactPost = (id, data) => API.put(`/react/post/${id}`, data);
export const commentPost = (id, data) => API.put(`/comment/post/${id}`, data);