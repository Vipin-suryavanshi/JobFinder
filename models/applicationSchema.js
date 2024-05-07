import mongoose from "mongoose";
import validator from "validator";

const ApplicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength : [3, "Name must have 3characters"],
        maxLength:[20, "Name Must not exceed 20 characters"]
    },
    email:{
        type:String,
        validate:[validator.isEmail,"Please provide valid Email"],
        required:true,
    },
    coverLetter:{
        type:String,
        required:[true,"please provide CoverLetter"],
    },
    phone:{
        type:Number,
        required:[true,"Please Provide your Phone Number"]
    },
    address:{
        type:String,
        required:[true,"Please provide your Address"]
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type: String,
            required:true,
        }
    },
   applicantID:{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Usermodel",
        required:true,
    },
    role:{
        type: String,
        enum:["Job Seeker"],
        required:true,
    },
   },
   employerID:{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Usermodel",
        required:true
    },
    role:{
        type: String,
        enum:["Employer"],
        required:true,
    }},
    JobId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"JobModel",
            required:true,
        },
    title:{
        type : String,
        required:true
    },
    city:{
        type:String,
        required: true
    }
         
     }

)
 
export const Application = mongoose.model("Application",ApplicationSchema);