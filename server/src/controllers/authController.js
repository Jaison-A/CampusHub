import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { name, rollno, password, department, semester, role } = req.body;

    const existingUser = await User.findOne({ rollno });
    if (existingUser) {
      return res.status(400).json({
        message: 'User Alredy Exist',
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      rollno,
      password: hashPassword,
      semester,
      department,
      role,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'user created sucessfully',
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// login user

export const loginUser = async (req, res) => {
  try {
    const { rollno, password } = req.body;
    const user = await User.findOne({ rollno });
    if (!user) {
      return res.status(400).json({
        message: 'invalid User',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );
    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
