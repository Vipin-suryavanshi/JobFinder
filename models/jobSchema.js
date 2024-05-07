import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide job Title"],
        minLength:[3,"Job title must contain atleast 3 characters"],
        maxLength:[50,"Job title cannot axceed 50 characters"],
    },
    description:{
        type: String,
        required:[true,"Please provide description"],
        minLength:[30,"Job description must contain atleast 30 characters"],
        maxLength:[350,"Job title cannot axceed 350 characters"],
    },
    category:{
        type:String,
        required:[true,"Job Category required"],
       
    },
    country:{
        type: String,
        required:[true,"country is required"]
    },
    city:{
        type: String,
        required:[true,"City is required"]
    },
    location:{
        type: String,
        required:[true,"please provide exact location"],
        minLength:[25,"job location must contain at least 25 characters"],
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"Fixed salary must contain 4digit"],
        maxLength:[9,"Fixed salary cannot exceed 9 digits"]
    },
     salaryFrom:{
        type:Number,
        minLength:[3,"SalaryFrom must contain 3digit"],
        maxLength:[9,"SalaryFrom cannot exceed 9 digits"]
     },
     salaryTo:{
        type:Number,
        minLength:[3,"SalaryTo must contain 3digit"],
        maxLength:[9,"SalaryTo cannot exceed 9 digits"]
     },
     expired:{
        type:Boolean,
        default : false
     },
     jobPostedOn :{
        type:Date,
        default:Date.now
     },
     postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"Usermodel",
        required:true
     }
});

    jobSchema.pre("save", function(){
        {this.fixedSalary !== null ? (
            this.salaryFrom = undefined,
            this.salaryTo= undefined
        ):(
            this.fixedSalary = undefined
        )}
    })

export const JobModel = mongoose.model("Job",jobSchema)