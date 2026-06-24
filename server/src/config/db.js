import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('db connected');
  } catch (err) {
    console.log('err ', err.message);
  }
};
export default connectDB;
