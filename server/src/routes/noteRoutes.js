import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from '../controllers/noteController.js';
import authorize from '../middlewares/roleMiddleware.js';
import { updateStatus } from '../controllers/submissionController.js';

const router = express.Router();

router.post(
  '/',
  protect,
  authorize('teacher', 'admin', 'monitor'),
  upload.single('pdf'),
  createNote,
);
router.get('/', protect, getNotes);
router.get('/:id', protect, getNoteById);

router.put(
  '/:id',
  protect,
  authorize('teacher', 'admin', 'monitor'),
  upload.single('pdf'),
  updateNote,
);
router.delete(
  '/:id',
  protect,
  authorize('teacher', 'admin', 'monitor'),
  deleteNote,
);

export default router;
