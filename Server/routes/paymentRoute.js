import express from 'express';
import { createSubscription, handleWebhook, processPayment } from '../controllers/paymentController.js'; // Adjust path as necessary

const router = express.Router();


router.post('/create-subscription', createSubscription);
router.post("/process_payment", processPayment)


router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;