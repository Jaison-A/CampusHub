import User from '../models/User.js';

export const getProfile = async (req, res) => {
  res.status(200).json(req.user);
};

export const updateProfile = async (req, res) => {
  try {
    const { semester } = req.body;

    if (!semester) {
      return res.status(400).json({ message: 'Semester is required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { semester: Number(semester) },
      { new: true },
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
