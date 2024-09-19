import mongoose from "mongoose";
import Companies from '../models/companiesModel.js'
import { response } from "express";

export const register = async (req, res, next) => {
    const {name, email, password} = req.body;


    //validate fields
    if (!name) {
        next("Company Name is required");
        return;
    }

    if (!email) {
        next("Email address is required")
        return;
    }
    if (!password) {
        next("password is required and must be greater than 6 characters")
        return;
    }

    try{
        const accountExist = await Companies.findOne({email});

        if(accountExist){
            next("Email Already Registered. Please Login")
            return;
        }
        // create a new account
        const  company = await Companies.create({
            name,
            email,
            password,
        });
        // user token
            const token = company.createJWT();

            res.status(201).json({
                success: true,
                message: "Company Account Created Successfully",
                user: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                },
                token,
            })

    } catch (error) {
        console.log.apply(error);
        res.status(404).json({message: error.message})
    }
};

export const signIn = async (req, res, next) => {
    const {email, password} = req.body;


    try{
        //validation
        if(!email || !password) {
            next("Please Provide AUser Credentials");
            return;
        }
        const company = await Companies.findOne({email}).select("+password");

        if(!company){
           next("Invalid email or password");
           return;
        }
            company.password = undefined;
            const token = company.createJWT();
            res.status(200).json({
                success: true,
                message: "Login Successful",
                user: company,
                token,
            });


    } catch(error){
       console.log(error);
       res.status(404).json({message: error.message}); 
    }
};

export const updateCompanyProfile = async (req, res, next) => {
    const {name, contact, location, profileUrl, about} = req.body;

    try{
        //validation
        if(!name || !location || !about || !contact || !profileUrl){
            next("please Provide All Required Fields");
            return;
        }
        const id = req.body.user.userId;

        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send(`No Comapny with id: ${id}`);

            const updateCompany = {
                name,
                contact,
                location,
                profileUrl,
                about,
                _id:id,
            };
            // updating Company in database
            const company = await Companies.findByIdAndUpdate(id, updateCompany, {
                new: true,
            });

            const token = company.createJWT();
            company.password = undefined;

            res.status(200).json({
                success: true,
                message: "Company Profile Updated Successfully",
                company,
                token,
            });
    } catch(error){
        console.log(error);
        res.status(404).json({message: error.message});
    }
};

export const getCompanyProfile = async (req, res, next) => {
    try{
        const id = req.body.user.userId;

        const company = await Companies.findById({_id: id});
        company.password = undefined;

        if(!company){
            return res.status(200).send({
                message: "comapny Not Found",
                success: false,
            })
        }

        res.status(200).json({
            success: true,
            data: company,
        })
    }
    catch(error){
        console.log(error);
        res.status(404).json({message: error.message}); 
     }
};

// get all companies
export const getCompanies = async (req, res, next) => {
    try{
         const {search, sort, location} = req.query;

         //conditions for searching filters
         const queryObject = {};

         if(search){
            queryObject.name = { $regex: search, $options: "i"};
         }
         if(location){
            queryObject.location = { $regex: location, $options: "i"};
         }

         let queryResult = Companies.find(queryObject).select("-password");

         // sorting the collected data

         if(sort == "Newst"){
            queryResult = queryResult.sort("-createdAt");
         }

         if(sort == "Oldest"){
            queryResult = queryResult.sort("-createdAt");
         }
         if(sort == "A-Z"){
            queryResult = queryResult.sort("name");
         }
         if(sort == "Z-A"){
            queryResult = queryResult.sort("-name");
         }


         //paginations
         const page = Number(req.query.page) || 1
         const limit = Number(req.query.limit) ||20


         const skip = (page -1) * limit;

         // records count

         const total = await Companies.countDocuments(queryResult);

         const numOfPage = Math.ceil(total / limit);

         //queryResult 
//show more instead of movinf to next page 
    queryResult = queryResult.limit(limit*page);

    const companies = await queryResult;
    res.status(200).json({
        success: true,
        total,
        data: companies,
        page, numOfPage,
    })

    }catch(error){
        console.log(error);
        res.status(404).json({messagde: error.message}); 
     }

};
//get company jobs
export const getCompanyJobListing = async (req, res, next) => {
    const {search, sort, location} = req.query;
    const id = req.body.user.userId;

    try{
        //conditions for searching filters
        const queryObject= {};
        if(search){
            queryObject.name = { $regex: search, $options: "i"};
         }

         let sorting;
         //sorting || another
         if(sort == "Newst"){
            queryResult = queryResult.sort("-createdAt");
         }

         if(sort == "Oldest"){
            queryResult = queryResult.sort("-createdAt");
         }
         if(sort == "A-Z"){
            queryResult = queryResult.sort("name");
         }
         if(sort == "Z-A"){
            queryResult = queryResult.sort("-name");
         }

         let queryResult = await Companies.findById({_id: id}).populate({
            path: "jobPosts",
            options: {sort: sorting},
         });
         const companies = await queryResult;

         res.status(200).json({
            success: true,
            companies,
         })

    }catch(error){
        console.log(error)
        res.status(404).json({message: error.message})
    }
};

//get single company
export const getCompanyById = async (req, res, next) => {
    try{
        const {id} = req.params

        const company = await Companies.findById({_id: id}).populate({
            path: "jobPosts",
            options: {
                sort: "-_id",
            },
        });

        company.password = undefined;

        if (!company){
            return res.status(200).send({
                message: "Company Not Found",
                success: false,
            })
        }

        company.password = undefined;
        response.status(200).json({
            success: true,
            data: company,
        })

    }
    catch(error){
        console.log(error)
        res.status(404).json({message: error.message})
    }

};