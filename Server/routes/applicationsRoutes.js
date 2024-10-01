import express from "express";
import multer from "multer";
import {
  applyForJob,
  getUserApplications,
  deleteApplication,
  getJobApplications,
  updateApplicationStatus,
} from "../controllers/applicationsController.js";
import userAuth from "../middlewares/authMiddleware.js";  // Middleware for authentication

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

// Apply for a job with resume upload
router.post("/apply", userAuth, applyForJob);

// Get all applications of a user
router.get("/user/:userId", userAuth, getUserApplications);

// Cancel/Delete an application
router.delete("/:applicationId", userAuth, deleteApplication);

// Get all applications for a job (Company's view)
router.get("/job/:jobId", userAuth, getJobApplications);

// Update the status of an application (Company's action)
router.patch("/:applicationId", userAuth, updateApplicationStatus);

export default router;