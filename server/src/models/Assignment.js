import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    subject: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    department: {
      type: String,
    },

    dueDate: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model('Assignment', assignmentSchema);
