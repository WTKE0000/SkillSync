import mongoose from "mongoose";
import Jobs from "../models/jobsModel.js";
import Companies from "../models/companiesModel.js";
export const createJob = async (req, res) => {
    try {
        const {
            jobTitle,
            jobType,  // Include jobType
            location,
            salary,
            vacancies,
            experience,
            desc,
            requirements,
            tags
        } = req.body;

        // Check if all required fields are provided
        if (!jobTitle || !location || !salary || !requirements || !desc) {
            return res.status(400).json({ message: "Please Provide All Required Fields" });
        }

        const id = req.body.user.userId;

        // Validate if the provided company ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No company with id: ${id}` });
        }

        // Create the job post object
        const jobPost = {
            jobTitle,
            jobType,  // Add jobType to the jobPost object
            location,
            salary,
            vacancies,
            experience,
            detail: { desc, requirements },
            company: id,
            tags,  // Optional, but include if necessary
        };

        // Save the job post in the database
        const job = new Jobs(jobPost);
        await job.save();

        // Update the company's jobPosts array with the new job's ID
        await Companies.findByIdAndUpdate(
            id,
            { $push: { jobPosts: job._id } },  // Push job ID to company's jobPosts array
            { new: true }
        );

        // Send response with success
        res.status(200).json({
            success: true,
            message: "Job Posted Successfully",
            job,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
   
export const updateJob = async(req, res, next) => {
    try{
        const {
            jobTitle,
            location,
            salary,
            vacancies,
            experience,
            desc,
            requirements,
            tags,
                } = req.body;
                const {jobId} = req.params;


                if (
                    !jobTitle ||
                    !location ||
                    !salary ||
                    !requirements ||
                    !desc
                )  {
                    next("Please Provide All Required Fields");
                    return;
                }  
                if(!mongoose.Types.ObjectId.isValid(id))
                    return res.status(404).send(`No company with id: ${id}`);
                const jobPost = {
                    jobTitle,
                    jobType,
                    location,
                    salary,
                    vacancies,
                    experience,
                    detail: { desc, requirements},
                    _id: jobId,
                };

                    await Jobs.findByIdAndUpdate(jobId, jobPost, {new: true});

                    res.status(200).json({
                        success: ture,
                        message:"Job post Updated Successfully",
                        jobPost,
                    });
    }
    catch (error) {
        console.log(error);
       res.status(404).json({message: error.message}); 
    }
};  
export const getJobPosts = async(req, res, next) => {
    try{
        const { search, sort, location, jtype, exp} = req.query;
        const types = jtype.split(","); //full-time, part-time
        const experience = exp.split("-"); // hourly

        let queryObject = {};

        if (location) {
            queryObject.location = {$regex: location, $options: "i"};
        }

        if (jtype) {
            queryObject.jobType = {$in: types};
        }

        // [2. 6]
        if (exp){
            queryObject.experience = {
                $gte: experience[0],
                $lte: experience[1],
            };
        }

        if (search) {
            const searchQuery = {
                $or: [
                    {jobTitle: {$regex: search, $options: "i"}},
                    {jobType: {$regex: search, $options: "i"}},
                    //{tags: {$in: search}},
                    {tags: {$regex: search, $options: "i"}},
                ],
            };
            queryObject = {...queryObject, ...searchQuery};
        }
        
            let queryResult = Jobs.find(queryObject).populate({
                path: "company",
                select: "password",
            });
            // sorting 
            if(sort == "Newst"){
                queryResult = queryResult.sort("-createdAt");
             }
    
             if(sort == "Oldest"){
                queryResult = queryResult.sort("-createdAt");
             }
             if(sort == "A-Z"){
                queryResult = queryResult.sort("jobTitle");
             }
             if(sort == "Z-A"){
                queryResult = queryResult.sort("-jobTitle");
             }

                    //paginations
         const page = Number(req.query.page) || 1
         const limit = Number(req.query.limit) ||20


         const skip = (page -1) * limit;

         // records count

         const totalJobs = await Jobs.countDocuments(queryResult);

         const numOfPage = Math.ceil(totalJobs / limit);
  
             queryResult = queryResult.limit(limit * page);

             const jobs = await queryResult;

             res.status(200).json({
                success: true,
                totalJobs,
                data: jobs,
                page,
                numOfPage,
             });

    }
    catch (error) {
        console.log(error);
       res.status(404).json({message: error.message}); 
    }
};  
export const getJobById = async(req, res, next) => {
    try{
        const {id} = req.params;

            const job = await Jobs.findById({_id: id}).populate({
                path: "company",
                select: "-password",
            });
        if (!job){
            return res.status(200).send({
                message: "job post Not found",
                success: false,
            });
        }

        // Get Similar Job post
        const searchQuery = {
            $or: [
                {joTitle: {$regex: job?.jobTitle, $options: "i"}},
                {jobType: {$rexgex: job?.jobType, $options: "i"}},
            ],
        };

        let queryResult = Jobs.find(searchQuery)
        .populate({
            path: "company",
            select: "-password",
        })
        .sort({_id: -1});

        queryResult = queryResult.limit(6);
        const similarJobs = await queryResult;

        res.status(200).json({
            success: true,
            data: job,
            similarJobs,
        });

    }
    catch (error) {
        console.log(error);
       res.status(404).json({message: error.message}); 
    }
};
export const deleteJobPost = async(req, res, next) => {
    try{
         const {id} = req.params;
         
         await Jobs.findByIdAndDelete(id);
         
         res.status(200).send({
            success:true,
            message: "Job Post Deleted Successfully",
         });
    }
    catch (error) {
        console.log(error);
       res.status(404).json({message: error.message}); 
    }
}   
