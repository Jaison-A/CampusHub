import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollno: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'teacher', 'monitor', 'admin'],
      default: 'student',
    },
    semester: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model('User', userSchema);
