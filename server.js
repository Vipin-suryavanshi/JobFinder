import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET,
    
})
const port = process.env.PORT || 3500
app.listen(port, ()=>{
    console.log(`server connection establish at ${port}`);
})