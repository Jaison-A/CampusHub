import Assignment from '../models/Assignment.js';
import Submission from '../models/Submission.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalAssignments = await Assignment.countDocuments({
      semester: req.user.semester,
      department: req.user.department,
    });

    const completed = await Submission.countDocuments({
      student: req.user._id,
      status: 'Completed',
    });

    const inProgress = await Submission.countDocuments({
      student: req.user._id,
      status: 'In Progress',
    });

    const pending = Math.max(totalAssignments - completed - inProgress, 0);

    const completionPercentage =
      totalAssignments > 0
        ? Math.round((completed / totalAssignments) * 100)
        : 0;

    res.status(200).json({
      totalAssignments,
      completed,
      inProgress,
      pending,
      completionPercentage,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
