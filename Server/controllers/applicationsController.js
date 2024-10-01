import Application from "../models/applicationsModel.js";
import Job from "../models/jobsModel.js";
import User from "../models/userModel.js";

export const applyForJob = async (req, res) => {
  try {
    console.log("Full Request Object:", req);
    console.log("Uploaded File:", req.file);
    
    
    const { jobId, coverLetter } = req.body;
    console.log("Received Job ID:", jobId);

    const userId = req.user._id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    // const existingApplication = await Application.findOne({ job: jobId, user: userId });
    // if (existingApplication) {
    //   return res.status(400).json({ message: "You have already applied for this job." });
    // }

    // Handle resume upload
    // let resumeUrl = null;
    // if (req.file) {
    //   const uploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
    //     folder: 'resumes',
    //     resource_type: 'raw',
    //   });
    //   resumeUrl = uploadResult.secure_url;
    // } else {
    //   return res.status(400).json({ message: "Resume is required." });
    // }

    const application = new Application({
      job: jobId,
      user: userId,
      coverLetter,
      // resume: resumeUrl,
    });

    await application.save();
    res.status(200).json({ message: "Application submitted successfully", application });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ message: "Error applying for job." });
  }
};
// Get all applications for a user
export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.params.userId }).populate("job").sort("-createdAt");
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
