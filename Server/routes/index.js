import express from 'express';

import authRoute from "./authRoutes.js"
import userRoute from './userRoute.js'
import companyRoute from './companiesRoutes.js'
import jobRoute from './jobRoute.js'



const router = express.Router();

const path = "/api-v1/";

router.use(`${path}auth`, authRoute); //api-v1/auth 
router.use(`${path}users`, userRoute); //api-v1/users
router.use(`${path}companies`, companyRoute); //api-v1/users
router.use(`${path}jobs`, jobRoute); //api-v1/users


export default router;