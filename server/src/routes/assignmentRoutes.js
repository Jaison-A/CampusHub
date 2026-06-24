import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import authorize from '../middlewares/roleMiddleware.js';
import {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from '../controllers/assignmentController.js';

const router = express.Router();

router.post(
  '/',
  protect,
  authorize('teacher', 'monitor', 'admin'),
  createAssignment,
);
router.get('/', protect, getAssignments);
router.get('/:id', protect, getAssignmentById);

// if put is wrong then we use patch

router.put(
  '/:id',
  protect,
  authorize('admin', 'teacher', 'monitor'),
  updateAssignment,
);
router.delete(
  '/:id',
  protect,
  authorize('admin', 'teacher', 'monitor'),
  deleteAssignment,
);

export default router;
