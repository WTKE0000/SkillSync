import express from 'express';
import {rateLimit} from 'express-rate-limit';
import {register, signIn} from "../controllers/authController.js"


//ip rate limit 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15minutes
    max:100, // limit each ip to 100 request per window (here, per 15minutes)
    standardHeaders: true, //Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-rateLimit-*` headers
});

const router = express.Router();

//Register routes
router.post("/register", limiter, register)
router.post("/login",  signIn);

export default router;