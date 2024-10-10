import express from "express";
import {
  getAllJobs,
  getAllUsers,
  deleteUser,
  createSubscription,
  createAdmin, 
} from "../controllers/adminController.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.get("/jobs", adminAuth, getAllJobs); 

router.get("/users", adminAuth, getAllUsers); 

router.delete("/delete-user/:userId", adminAuth, deleteUser); 

router.post("/create-subscription/:userId", adminAuth, createSubscription); 

router.post("/create-admin", adminAuth, createAdmin);

export default router;