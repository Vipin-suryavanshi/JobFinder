import express from "express";
import { EmployerCheckApplication, JobSeekerCheckApplication, JobSeekerDeleteApplication , PostApplication} from "../controllers/applicationController.js";
import {isAuthorized} from "../middlewares/auth.js"
const router = express.Router();

router.get("/employer/get/application",isAuthorized,EmployerCheckApplication);
router.get("/jobSeeker/get/application",isAuthorized,JobSeekerCheckApplication);
router.delete("/delete/:id",isAuthorized, JobSeekerDeleteApplication);
router.post("/post",isAuthorized,PostApplication);

export default router;