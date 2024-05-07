import express from "express";
import { Register,getUser,login, logout } from "../controllers/UserController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/Register",Register);
router.post("/Login",login);
router.get("/Logout",isAuthorized, logout);
router.get("/getUser",isAuthorized,getUser)

export default router;