import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      const jwtSecret = process.env.JWT_SECRET || 'campushub-dev-secret';
      const decoded = jwt.verify(token, jwtSecret);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } else {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: 'Token Invalid',
    });
  }
};

export default protect;
