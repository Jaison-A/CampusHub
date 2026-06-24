import express from 'express';

import protect from '../middlewares/authMiddleware.js';
import authorize from '../middlewares/roleMiddleware.js';
import {
  createAnnouncement,
  getAnnouncements,
} from '../controllers/announcementController.js';

const router = express.Router();

router.get('/', protect, getAnnouncements);

router.post(
  '/',
  protect,
  authorize('admin', 'teacher', 'monitor'),
  createAnnouncement,
);

export default router;
