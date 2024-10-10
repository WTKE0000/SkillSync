import Users from "../models/userModel.js";
import Jobs from "../models/jobsModel.js";

// Create a new admin user
export const createAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const newAdmin = new Users({
      firstName,
      lastName,
      email,
      password,
      isAdmin: true, // Set isAdmin to true for admin users
    });

    await newAdmin.save();
    
    res.status(201).json({ message: "Admin created successfully.", user: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin.", error: error.message });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find().populate("postedBy", "firstName lastName");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving jobs." });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users." });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await Users.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user." });
  }
};

// Create subscription (for example, set a user as premium)
export const createSubscription = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    
    
    user.isPremium = true; 
    await user.save();

    res.status(200).json({ message: "Subscription created successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating subscription." });
  }
};