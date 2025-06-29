import jwt from 'jsonwebtoken';
import JWT_SECRET from '../config/jwtConfig.js';


/* 
  Docs :
   - this should be primarily used (only) for protected routes like get user profile, dashboards etc,
     not for signup and login
   -  this looks for token verification and with 2 inputs
   -   Authorization: Bearer <token> ,  i.e. Bearer and the token, this is good practice 
   - the token is passed in the authorization of the header ( in frontend one automatically) 
 
*/

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ msg: "Token missing or invalid" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const verifiedToken = jwt.verify(token, JWT_SECRET);
    req.userId = verifiedToken.userId;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
};

export default authMiddleware;
