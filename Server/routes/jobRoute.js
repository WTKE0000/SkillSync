import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { createJob, updateJob, getJobPosts, getJobById, deleteJobPost } from '../controllers/jobController.js';

const router = express.Router();
// post job
router.post("/upload-job", userAuth, createJob);

//update job
router.put("/update-job/:jobId", userAuth, updateJob);

//get job post
router.get("/find-jobs", getJobPosts);
router.get("/get-job-detail/:id", getJobById);

//delete job post
router.delete("/delete-job/:id", userAuth, deleteJobPost);

export default router;