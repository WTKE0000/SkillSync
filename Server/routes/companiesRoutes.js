import express from 'express';
import { rateLimit} from 'express-rate-limit';
import {getCompanies, getCompanyById, getCompanyJobListing, getCompanyProfile, register, updateCompanyProfile, signIn} from '../controllers/CompanyContrller.js'
import userAuth from '../middlewares/authMiddleware.js';


const router = express.Router();

//ip rate limit 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15minutes
    max:100, // limit each ip to 100 request per window (here, per 15minutes)
    standardHeaders: true, //Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-rateLimit-*` headers
});

//Register
router.post("/register", limiter, register);

//Login
router.post("/login", limiter, signIn);

router.post("/get-company-profile", userAuth, getCompanyProfile)
router.post("/get-company-joblisting", userAuth, getCompanyJobListing);
router.get("/", getCompanies);
router.get("/get-company/:id", getCompanyById);
//update company profile
router.put("/update-company", userAuth, updateCompanyProfile);


export default router;