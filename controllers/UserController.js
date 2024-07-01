import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Usermodel } from "../models/UserSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const Register = CatchAsyncError(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("All fields are required!", 400));
  }
  const isEmail = await Usermodel.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already exists", 400));
  }
  const user = await Usermodel.create({
    name,
    email,
    phone,
    role,
    password,
  });
  sendToken(user, 200, res, "User registered successfully");
});

export const login = CatchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password, and role.", 400));
  }
  const user = await Usermodel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("User with this role not found", 400));
  }
  sendToken(user, 200, res, "User logged in successfully");
});

export const logout = CatchAsyncError(async (req, res, next) => {
  res.clearCookie("token", {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,  
   sameSite: 'None',  
   path: '/',
  });
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

export const getUser = CatchAsyncError((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
}); 