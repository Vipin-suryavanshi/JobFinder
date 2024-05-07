import express from "express";
import { DeleteJobs, GetJobDetail, getAlljobs, getJob, getmyJobs, postJob, updateJob } from "../controllers/jobController.js";

import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();
router.get("/Getall",getAlljobs)
router.post("/post",isAuthorized,postJob)
router.get("/Getmyjob",isAuthorized,getmyJobs);
router.put("/Update/:id",isAuthorized,updateJob);
router.delete("/Delete/:id",isAuthorized,DeleteJobs)
router.get("/Getjobdetail/:id",isAuthorized, GetJobDetail)
router.post("/getjob",getJob)

export default router;