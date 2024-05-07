import { Usermodel } from "../models/UserSchema.js";
import { CatchAsyncError } from "./CatchAsyncError.js"
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken"
export const isAuthorized  = CatchAsyncError(async(req,res,next)=>{
     const {token} = req.cookies;
     if(!token){
        return next(new ErrorHandler("user not authorized",400))
     }
     const verify = jwt.verify(token,process.env.JWT_SECRET_KEY)
     req.user = await Usermodel.findById(verify.id);
     next()
})