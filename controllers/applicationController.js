import { CatchAsyncError } from "../middlewares/CatchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import {Application} from "../models/applicationSchema.js";
import { JobModel } from "../models/jobSchema.js";
import cloudinary from "cloudinary"

export const EmployerCheckApplication = CatchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler(
          "Job Seeker is not allowed to access this resources",
          400
        )
      );
    }
    const {_id} = req.user;
    const applications = await Application.find({"employerID.user":_id});
    res.status(200).json({
        sucess:true,
       applications
    })
})


export const JobSeekerCheckApplication = CatchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler(
          "Employer is not allowed to access this resources",
          400
        )
      );
    }
    const {_id} = req.user;
    const applications = await Application.find({"applicantID.user":_id});
    res.status(200).json({
        sucess:true,
       applications
    })
})

export const JobSeekerDeleteApplication = CatchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler(
          "Employer is not allowed to access this resources",
          400
        )
      );
    }
    const {id} = req.params;
    const DelApplication = await Application.findById(id);
    if(!DelApplication){
        return next(new ErrorHandler("Oops applicantion not Found",404))
    }
    await DelApplication.deleteOne();
    res.status(200).json({
        sucess:true,
        message:"Application Deleted Sucessfully",
    })
})


export const PostApplication = CatchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler(
          "Employer is not allowed to access this resources",
          400
        )
      );
    }
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Resume File Required"))
    }
    const {resume} = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler(" please upload resume in PNG,JPG OR WEBP format",400))
    }
    const cloudinaryResponce = await cloudinary.uploader.upload(
        resume.tempFilePath
    );
    if(!cloudinaryResponce || cloudinaryResponce.error){
        console.error(
            "Cloudinary Error :",
            cloudinaryResponce.error || "Unknown cloudinary Error"
        );
        return next(new ErrorHandler("Failed to upload resume",500))
    }
    const {name, email,coverLetter,phone,address,jobId} = req.body;
    console.log(jobId);
    const applicantID = {
         user : req.user._id,
         role:"Job Seeker",
    };
    if(!jobId){
        return next(new ErrorHandler("Job not found",404))
    }
    var jobDetail = await JobModel.findById(jobId);
    console.log(jobDetail);
    if(!jobDetail){
        return next(new ErrorHandler("job Not FOund",404))
    }
 
    const employerID ={
        user:jobDetail.postedBy,
        role:"Employer",
    };
  
   

    if(!name || !email || !coverLetter || !address || !applicantID || !employerID || !resume || !jobId || !jobDetail.title || !jobDetail.city){
        return next(new ErrorHandler("Please fill All Fields and also jobId",400));
    }
  const application = await Application.create({
  
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    employerID,
    resume:{
        public_id:cloudinaryResponce.public_id,
        url:cloudinaryResponce.secure_url,
    },
    title:jobDetail.title,
    city : jobDetail.city,
    JobId:jobId,
  });
  res.status(200).json({
    sucess:true,
    message:"Application Sumbited !",
    application
  })
})