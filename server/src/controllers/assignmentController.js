import Assignment from '../models/Assignment.js';
import Submission from '../models/Submission.js';

export const createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// get Assignment

export const getAssignments = async (req, res) => {
  try {
    const filter =
      req.user?.role === 'student' && req.user?.semester
        ? { semester: req.user.semester }
        : {};

    const assignments = await Assignment.find(filter).sort({ dueDate: 1 });
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        message: 'Assignment not found',
      });
    }

    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//  update assignment
export const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    if (!assignment) {
      return res.status(404).json({
        message: 'Assignment not found',
      });
    }

    res.status(200).json(assignment);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// delete assignment

export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        message: 'Assignment not found',
      });
    }

    await Submission.deleteMany({
      assignment: req.params.id,
    });

    await assignment.deleteOne();

    res.status(200).json({
      message: 'Assignment deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
