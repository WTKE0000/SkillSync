import express from "express";
import multer from "multer";
import {
  applyForJob,
  getUserApplications,
  deleteApplication,
  getJobApplications,
  updateApplicationStatus,
} from "../controllers/applicationsController.js";
import userAuth from "../middlewares/authMiddleware.js";  

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});

router.post("/apply", userAuth, upload.single('resume'), applyForJob);

router.get("/user/:userId", userAuth, getUserApplications);

router.delete("/:applicationId", userAuth, deleteApplication);

router.get("/job/:jobId", userAuth, getJobApplications);

router.patch("/:applicationId", userAuth, updateApplicationStatus);

export default router;