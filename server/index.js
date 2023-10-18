import express  from "express";
const app = express();
import dotenv from "dotenv";
import database from "./config/database.js";
import Auth from "./routes/auth.js";
import Posts from "./routes/posts.js";
import morgan from "morgan";
import cors from "cors"

dotenv.config({path: "./config/config.env"})
await database();
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "2mb"}))
app.use(morgan("common"))
app.use(cors("*"))
app.use("/api/v1/auth", Auth);
app.use("/api/v1/posts", Posts)

app.listen(process.env.PORT, () => {
    console.log(`Server start on port ${process.env.PORT}`)
})