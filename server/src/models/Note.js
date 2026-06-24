import mongoose from 'mongoose';
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Note', noteSchema);
