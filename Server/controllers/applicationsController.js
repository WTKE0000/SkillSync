import Application from "../models/applicationsModel.js";
import Job from "../models/jobsModel.js";
import User from "../models/userModel.js";
import Companies from '../models/companiesModel.js';


async function uploadFile(file) {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream(
       {resource_type: "auto", public_id: file.originalname},
       (error, result)=>{
        if(error) return reject(error);
        if(result && result.url){
          resolve(result.url)
        }else{
          reject(new Error("Upload result does not contain URL"))
        }
       }
      ).end(file.buffer)
    });
  } catch (error) {
    console.log("Cloudinary error: ",error)
    throw new Error("Error Uploading file")
  }
}

export const applyForJob = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body
    
    const { jobId, coverLetter, resumeUrl } = req.body;
    const userId = req.body.user.userId;
    const file = req.file; // Access the uploaded file directly

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    // Check if the user has already applied
    const existingApplication = await Application.findOne({ job: jobId, user: userId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job." });
    }

    // // Handle resume upload
    // let resumeUrl = null; // Declare resumeUrl
    // if (file) {
    //   console.log("Uploaded File:", file); // Log the uploaded file
    //   resumeUrl = await uploadFile(file); // Use helper function to upload the file
    // } else {
    //   return res.status(400).json({ message: "Resume is required." });
    // }

    // Create a new application
    const application = new Application({
      job: jobId,
      user: userId,
      coverLetter,
      resumeUrl,
    });

    await application.save();
    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ message: "Error applying for the job." });
  }
};
// Get all applications for a user
export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.params.userId })
      .populate({
        path: "job",
        populate: {
          path: "company",
          select: "name logo description"
        }
      })
      .sort("-createdAt");
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching applications." });
  }
};
// Cancel/Delete an application
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId);
    if (!application) return res.status(404).json({ message: "Application not found." });

    if (application.status !== 'pending') {
      return res.status(400).json({ message: "Cannot cancel an already processed application." });
    }

    await Application.findByIdAndDelete(req.params.applicationId);
    res.status(200).json({ message: "Application canceled successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error canceling application." });
  }
};

// Get applications for a job (For companies)
export const getJobApplications = async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate("user", "name email experience education")
      .populate("job")
      .sort("-createdAt");
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching job applications." });
  }
};

// Update application status (For companies)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, interviewLink } = req.body;
    const application = await Application.findById(req.params.applicationId);

    if (!application) return res.status(404).json({ message: "Application not found." });

    application.status = status;
    if (interviewLink) {
      application.interviewLink = interviewLink;
    }
    await application.save();

    res.status(200).json({ message: "Application status updated.", application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating application status." });
  }
};
