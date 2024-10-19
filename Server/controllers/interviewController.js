import Interview from '../models/interviewsModel.js';

// Create a new interview
export const createInterview = async (req, res) => {
  console.log("Request body:", req.body);

  try {
    const { job, applicant, interviewLink, interviewDate, interviewTime } = req.body;
    const user = req.body.user?.userId;
    
    
    // Validate required fields
 

    const newInterview = new Interview({
      job,
      company: user,
      applicant,
      interviewLink,
      interviewDate,
      interviewTime
    });

    const savedInterview = await newInterview.save();
    console.log("Interview saved successfully:", savedInterview);
    res.status(201).json(savedInterview);
  } catch (error) {
    console.error("Error in createInterview:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation Error", details: error.errors });
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


// Get interviews by user
export const getInterviewsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const interviews = await Interview.find({ applicant: userId })
    .populate({
      path: "job",
      populate: {
        path: "company",
        select: "name logo description"
      }
    })
    res.status(200).json(interviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get interviews by company
export const getInterviewsByCompany = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const interviews = await Interview.find({ company: companyId })
    .populate('job')
    .populate('applicant');
    res.status(200).json(interviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};