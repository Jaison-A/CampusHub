import Submission from '../models/Submission.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

const normalizeStatus = (status) => {
  if (status === 'Completed' || status === 'completed') return 'Completed';
  if (status === 'In Progress' || status === 'in progress')
    return 'In Progress';
  return 'Not Started';
};

export const updateStatus = async (req, res) => {
  try {
    const { assignmentId, status } = req.body;
    let submission = await Submission.findOne({
      assignment: assignmentId,
      student: req.user._id,
    });
    if (!submission) {
      submission = await Submission.create({
        assignment: assignmentId,
        student: req.user._id,
        status,
        submittedAt:
          status === 'Completed' || status === 'completed' ? new Date() : null,
      });
    } else {
      submission.status = status;

      if (status === 'Completed' || status === 'completed') {
        submission.submittedAt = new Date();
      }
      await submission.save();
    }

    res.status(200).json(submission);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// get my submission

export const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      student: req.user._id,
    }).populate('assignment');

    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getAssignmentProgress = async (req, res) => {
  try {
    const viewerRole = req.user?.role;
    const visibleRoles = ['student', 'monitor'];

    if (['teacher', 'admin'].includes(viewerRole)) {
      return res.status(200).json([]);
    }

    const assignments = await mongoose
      .model('Assignment')
      .find({}, 'title subject');
    const users = await User.find({ role: { $in: visibleRoles } }, 'name role');
    const submissions = await Submission.find({})
      .populate('assignment', 'title subject')
      .populate('student', 'name role');

    const groupedProgress = {};

    assignments.forEach((assignment) => {
      const assignmentId = assignment._id.toString();
      groupedProgress[assignmentId] = {
        assignmentId,
        assignmentTitle: assignment.title,
        assignmentSubject: assignment.subject,
        counts: {
          Completed: 0,
          'In Progress': 0,
          'Not Started': 0,
        },
        students: [],
      };

      const assignmentSubmissions = submissions.filter(
        (submission) => submission.assignment?._id?.toString() === assignmentId,
      );

      const submissionMap = new Map(
        assignmentSubmissions.map((submission) => [
          submission.student?._id?.toString(),
          submission,
        ]),
      );

      users.forEach((user) => {
        const submission = submissionMap.get(user._id.toString());
        const status = submission
          ? normalizeStatus(submission.status)
          : 'Not Started';

        groupedProgress[assignmentId].counts[status] += 1;
        groupedProgress[assignmentId].students.push({
          studentId: user._id,
          name: user.name,
          role: user.role,
          status,
          submittedAt: submission?.submittedAt || null,
        });
      });
    });

    const progressList = Object.values(groupedProgress).map((entry) => ({
      ...entry,
      students: entry.students.sort((a, b) => {
        const statusOrder = {
          Completed: 0,
          'In Progress': 1,
          'Not Started': 2,
        };

        return statusOrder[a.status] - statusOrder[b.status];
      }),
    }));

    res.status(200).json(progressList);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getAssignmentProgressById = async (req, res) => {
  try {
    const { id } = req.params;
    const viewerRole = req.user?.role;
    const visibleRoles = ['student', 'monitor'];

    if (['teacher', 'admin'].includes(viewerRole)) {
      return res.status(200).json(null);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid assignment id' });
    }

    const assignment = await mongoose
      .model('Assignment')
      .findById(id, 'title subject');
    const users = await User.find({ role: { $in: visibleRoles } }, 'name role');
    const submissions = await Submission.find({ assignment: id })
      .populate('assignment', 'title subject')
      .populate('student', 'name role');

    const entry = {
      assignmentId: id,
      assignmentTitle: assignment?.title || 'Assignment',
      assignmentSubject: assignment?.subject || '',
      counts: {
        Completed: 0,
        'In Progress': 0,
        'Not Started': 0,
      },
      students: [],
    };

    const submissionMap = new Map(
      submissions.map((submission) => [
        submission.student?._id?.toString(),
        submission,
      ]),
    );

    users.forEach((user) => {
      const submission = submissionMap.get(user._id.toString());
      const status = submission
        ? normalizeStatus(submission.status)
        : 'Not Started';

      entry.counts[status] += 1;
      entry.students.push({
        studentId: user._id,
        name: user.name,
        role: user.role,
        status,
        submittedAt: submission?.submittedAt || null,
      });
    });

    entry.students.sort((a, b) => {
      const statusOrder = {
        Completed: 0,
        'In Progress': 1,
        'Not Started': 2,
      };

      return statusOrder[a.status] - statusOrder[b.status];
    });

    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
