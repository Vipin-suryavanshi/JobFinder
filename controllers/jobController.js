import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { JobModel } from "../models/jobSchema.js";

export const getAlljobs = CatchAsyncError(async (req, res, next) => {
  const jobs = await JobModel.find({ expired: false });
  res.status(200).json({
    sucess: true,
    jobs,
  });
});

export const postJob = CatchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  // const role = req.user.role
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker is not allowed to access this resources",
        400
      )
    );
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please Provide full job details", 400));
  }
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler("Please provide either ranged salary or fixed salary")
    );
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler("Cannot enter fixed salary and ranged salary Together")
    );
  }
  const postedBy = req.user._id;
  const job = await JobModel.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });
res.status(200).json({
    sucess:true,
    message:"Job posted successfully"
})
});

export const getmyJobs = CatchAsyncError(async(req,res,next)=>{
  const {role} = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker is not allowed to access this resources",
        400
      )
    );
  }
  const myjobs = await JobModel.find({postedBy:req.user._id});
  res.status(200).json({
    sucess:true,
    myjobs,
  })
});

export const updateJob = CatchAsyncError(async(req,res,next)=>{
  const {role} = req.body;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker is not allowed to access this resources",
        400
      )
    );
  }
  const {id} = req.params;
  let job = await JobModel.findById(id);
  if(!job){
    return next(
      new ErrorHandler(
        "oops Job Not FOund",
        404
      )
    )
  }
  job = await JobModel.findByIdAndUpdate(id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify: false
  })
  res.status(200).json({
    sucess:true,
    job,
    message:"Job Updated Sucessfully"
  })
})

export const DeleteJobs = CatchAsyncError(async function(req,res,next){
  const {role} = req.body;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker is not allowed to access this resources",
        400
      )
    );
  }
   const {id} = req.params;
   let job = await JobModel.findById(id);
  if(!job){
    return next(
      new ErrorHandler(
        "oops Job Not FOund",
        404
      )
    )
  }
 job.deleteOne();
  res.status(200).json({
    sucess:true,
    message:"Job Deleted Sucessfully",
    job
  })
})

export const GetJobDetail = CatchAsyncError(async(req,res,next)=>{
  const {id} = req.params;
  try {
    const job = await JobModel.findById(id);
    if(!job){
      return next(new ErrorHandler("Job not found",404))
    }
    res.status(200).json({
      sucess:true,
      
      job
    })
  } catch (error) {
    return next(new ErrorHandler("Invalid ID/ CasrError", 400))
  }
}

)

export const getJob = CatchAsyncError(async(req,res,next)=>{
  const {jobId} = req.body;
  console.log(jobId);
  if(!jobId){
    return next(new ErrorHandler("job id not found",404))
  }
   var details = await JobModel.findById(jobId);
   console.log(details);
   if(!details){
    return  next(new ErrorHandler("job Not FOund",404))
   }
   res.status(200).json({
    sucess:true,
    details
   })
})