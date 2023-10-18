import axios from "axios";

const API = axios.create({
    baseURL: `/auth`
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    }
    return req;
});

export const loadUserInfo = (data) => API.put("/load/user/info", data);
export const signup = (data) => API.post("/signup", data);
export const uploadProfilePicture = (data) => API.post("/upload/profile/picture", data)
export const login = (data) => API.put("/login", data);
export const passwordReset = (data) => API.put("/password/reset", data)
export const getNotification = () => API.get("/get/notifications");
export const updateNotification = (id, data) => API.put(`/update/notification/${id}`, data)