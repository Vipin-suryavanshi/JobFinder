import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[ true,"please provide your Name"],
        minLength:[3,"Name Must Contain at least 3 Characters!"],
        maxLength:[30,"Name cannot exceed 30 Characters!"]
    },
    email:{
        type:String,
        required:[true,"please provide your email"],
        validate:[validator.isEmail, "please provide a valid email!"],
    },
    phone:{
        type:Number,
        required:[true,"please provide your phone number"]
    },
    password:{
        type:String,
        required:[true,"please provide your Password"],
        minLength:[8,"password must contain at least 8 character!"],
        maxLength:[32,"Name cannot exceed 32 character"],
        select : false
    },
    role:{
        type:String,
        required:[true,"please provide role."],
        enum:["Job Seeker", "Employer"]
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});


//hasing
userSchema.pre("save", async function(next){

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
        next();
    }
    
})

//compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
};

//jwt token create
userSchema.methods.GetJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
};

export const Usermodel = mongoose.model("JobAppUsers",userSchema)