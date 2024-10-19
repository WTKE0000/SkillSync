import express from "express";
import { createInterview, getInterviewsByUser, getInterviewsByCompany } from "../controllers/interviewController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();



// Create a new interview
router.post("/book", userAuth, createInterview);

// Get interviews by user
router.get("/user/:userId", userAuth, getInterviewsByUser);

// Get interviews by company
router.get("/company/:companyId", userAuth, getInterviewsByCompany);

export default router;