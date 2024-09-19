import mongoose from "mongoose";
import Users from "../models/userModel.js";

export const updateUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    contact,
    location,
    profileUrl,
    jobTitle,
    about,
  } = req.body;

  try {
    // Validate required fields
    if (!firstName || !lastName || !email || !contact || !jobTitle || !about) {
      return next("Please provide all required fields"); // Return here
    }

    const id = req.body.user.userId;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No User with id: ${id}`);
    }

    const updateUser = {
      firstName,
      lastName,
      email,
      contact,
      location,
      profileUrl,
      jobTitle,
      about,
      _id: id,
    };

    // Update user information
    const user = await Users.findByIdAndUpdate(id, updateUser, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = user.createJWT();
    user.password = undefined; // Clear password

    return res.status(200).json({ // Return here
      success: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message }); // Return here
  }
};

export const getUser = async (req, res, next) => {
  try {
    const id = req.body.user.userId;

    const user = await Users.findById({ _id: id });

    if (!user) {
      return res.status(404).send({ // Change to 404 for not found
        message: "User Not Found",
        success: false,
      });
    }

    user.password = undefined; // Clear password
    return res.status(200).send({
      success: true,
      user: user,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ // Return here
      success: false,
      message: "auth error",
      error: error.message,
    });
  }
};