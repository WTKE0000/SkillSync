import express from "express";

import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import companyRoute from "./companiesRoutes.js";
import jobRoute from "./jobsRoutes.js";
import applicationsRoute from "./applicationsRoutes.js";
import interviewRoutes from "./interviewsRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = express.Router();

const path = "/api-v1/";

router.use(`${path}auth`, authRoute); //api-v1/auth/
router.use(`${path}users`, userRoute);
router.use(`${path}companies`, companyRoute);
router.use(`${path}jobs`, jobRoute);
router.use(`${path}applications`, applicationsRoute);
router.use(`${path}interviews`, interviewRoutes);
router.use(`${path}admin`, adminRoutes);

export default router;
