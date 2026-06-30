import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import {
  updateStatus,
  getMySubmissions,
  getAssignmentProgress,
  getAssignmentProgressById,
} from '../controllers/submissionController.js';

const router = express.Router();

router.post('/status', protect, updateStatus);
router.get('/my-progress', protect, getMySubmissions);
router.get('/progress', protect, getAssignmentProgress);
router.get('/progress/:id', protect, getAssignmentProgressById);

export default router;
