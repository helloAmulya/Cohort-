import { JWT_SECRET } from "../config.js";
import pkg from 'jsonwebtoken';
const { verify } = pkg;
function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtoken = words[1];

    const decodedValue = verify(jwtoken, JWT_SECRET);
    if (decodedValue.username) {
        req.username = decodedValue.username;
        req.role = "any"
        next();
    }

    else {
        res.status(403).json({
            message: "You are not authenticaed"
        })
    }

}

export default userMiddleware