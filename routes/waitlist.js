// routes/waitlist.js
import express from 'express';
import { addDiscoverToWaitlist } from '../controller/waitlist.js';
import { validateWaitlistData } from '../middlewares/validator.js';

const router = express.Router();

router.post('/discover', validateWaitlistData, addDiscoverToWaitlist)

export default router;
