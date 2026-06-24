import Submission from '../models/Submission.js';

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
