import jwt from 'jsonwebtoken';
import JWT_SECRET from '../config.js';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({
      msg: "Token missing or invalid",
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const verifiedToken = jwt.verify(token, JWT_SECRET);
    req.userId = verifiedToken.userId;
    next();
  } catch (error) {
    return res.status(403).json({
      msg: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
