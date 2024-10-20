import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

// GET user
router.post("/get-user", userAuth, getUser);

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUser);

router.get("/all-users", userAuth, getAllUsers);

router.delete("/delete-user/:id", userAuth, deleteUser);

export default router;
