import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userROuter from "./routes/userRouter.js";
import application from "./routes/application.js";
import jobRouter from "./routes/jobRouter.js";
import {dataCollection} from "./database/dataCollection.js"
import {errorMiddleware} from "./middlewares/error.js";

const app = express()
dotenv.config({path:"./config/config.env"})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET','POST','DELETE','PUT'],
    credentials:true,
}))
app.get("/",(req,res)=>{
    res.send("server established sucessfully")
    })
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}));

app.use("/api/v1/user",userROuter)
app.use("/api/v1/application",application)
app.use("/api/v1/job",jobRouter)

dataCollection();

app.use(errorMiddleware)
export default app;