
import {CatchAsyncError} from "../middlewares/CatchAsyncError.js";
import ErrorHandler  from "../middlewares/error.js"
import {Usermodel} from "../models/UserSchema.js"
import {sendToken} from "../utils/jwtToken.js"
export const Register = CatchAsyncError(async(req,res,next)=>{
     const {name,email,phone,role,password} = req.body;
     if(!name || !email || !phone || !role || !password){
      return next(new ErrorHandler("All field required mandatory! "));
     }
      const isEmail = await Usermodel.findOne({email});
      if(isEmail){
        return next(new ErrorHandler("Email already Exists"));
      }
      const user = await Usermodel.create({
        name,
        email,
        phone,
        role,
        password,
      });
     sendToken(user,200,res, "User Registered Successfully")
})

export const login = CatchAsyncError(async(req,res,next)=>{
  const {email, password, role} = req.body;
  if(!email || !password || !role){
     return next(new ErrorHandler("Please provide email, password and role.",400))
  }
  const user = await Usermodel.findOne({email}).select("+password"); //kuki select false kr rkha h esly get k tym p nhi milega esly select lgke andr password likhke value lere hai
   if(!user){
     return next(new ErrorHandler("Invalid Email or Password",400))
   }
   const isPasswordMatched = await user.comparePassword(password);
   if(!isPasswordMatched){
    return next(new ErrorHandler("Invalid Email or password",400))
   }
   if(user.role !== role){
    return next(new ErrorHandler("User with this role not found",400));
   }
   sendToken(user,200,res,"User Logged Successfully");
});

<<<<<<< HEAD
export const logout = CatchAsyncError(async function(req, res, next) {
  res.clearCookie("token", {
    expires: new Date(0), 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
  });
  res.status(200).json({
    success: true,
    message: "User Logged Out Successfully",
  });
});

=======
export const logout = CatchAsyncError(async function(req,res,next){
   res.status(200).cookie("token", "",{
httpOnly: true,
    expires: new Date(0), 
    secure: true, 
    sameSite: "None",
    path: "/", 
   }).json({
    sucess:true,
    message:"User Logged Out Succesfully",
   })
})
>>>>>>> 9a3f0e631fa207447b45c02ca94df0f62d65ded1

export const getUser = CatchAsyncError((req,res,next)=>{
  const user = req.user;
  res.status(200).json({
    sucess:true,
    user
  })
})
<<<<<<< HEAD





// export const UserLogout = async (req,res)=>{
//   try {
//      const token = req.cookies.token;
//      const verifytoken =  jwt.verify(token,process.env.JSON_WEB_TOKEN)
//      console.log(verifytoken);
//      const user = await UserModel.findOne({_id:verifytoken._id})
//      if(user){
//          res.clearCookie("token")
//         return res.status(200).json(
//          {
//              sucess:true,
//              message:"you are logout sucessfully"
//          }
//          )
//      }
//   } catch (error) {
//     return res.status(500).json({
//          sucess:false,
//          messa4:"server error"
//      })
//   }
// }


// .clearCookie("token", {
//   expires: new Date(Date.now()),
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production',
//   sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
// });
=======
>>>>>>> 9a3f0e631fa207447b45c02ca94df0f62d65ded1
