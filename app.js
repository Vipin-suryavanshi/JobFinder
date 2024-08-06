import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import application from "./routes/application.js";
import jobRouter from "./routes/jobRouter.js";
import {dataCollection} from "./database/dataCollection.js"
import {errorMiddleware} from "./middlewares/error.js";
import cloudinary from "cloudinary";

dotenv.config({path:"./config/config.env"})
console.log('CLOUDINARY_CLIENT_NAME:', process.env.CLOUDINARY_CLIENT_NAME);
console.log('CLOUDINARY_CLIENT_API:', process.env.CLOUDINARY_CLIENT_API); 
console.log('CLOUDINARY_CLIENT_SECRET:', process.env.CLOUDINARY_CLIENT_SECRET); 
const app = express()

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
   
}));
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET,
    
})

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

app.use("/api/v1/user",userRouter)
app.use("/api/v1/application",application)
app.use("/api/v1/job",jobRouter)

dataCollection();

app.use(errorMiddleware)
export default app;
