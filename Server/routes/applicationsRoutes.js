import express from "express";
import {
  applyForJob,
  getUserApplications,
  deleteApplication,
  getJobApplications,
  updateApplicationStatus,
  getAllApplications,
} from "../controllers/applicationsController.js";
import userAuth from "../middlewares/authMiddleware.js";  

const router = express.Router();

router.post("/apply", userAuth, applyForJob);

router.get("/user/:userId", userAuth, getUserApplications);

router.delete("/:applicationId", userAuth, deleteApplication);

router.get("/job/:jobId", userAuth, getJobApplications);

router.patch("/:applicationId", userAuth, updateApplicationStatus);

router.get("/getAllApplications", userAuth, getAllApplications);

export default router;