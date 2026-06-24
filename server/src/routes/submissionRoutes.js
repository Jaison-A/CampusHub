import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import {
  updateStatus,
  getMySubmissions,
} from '../controllers/submissionController.js';

const router = express.Router();

router.post('/status', protect, updateStatus);
router.get('/my-progress', protect, getMySubmissions);

export default router;
