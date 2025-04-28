import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import pkg from 'jsonwebtoken';
const { verify } = pkg;

function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtoken = words[1];

    try {
        const decodedValue = verify(jwtoken, JWT_SECRET);
        if (decodedValue.username) {
            next();
        }

        else {
            res.status(403).json({
                message: "You are not authorized"
            })
        }
    } catch (error) {
        res.json({
            message: "Invalid Token"
        })

    }

}
export default adminMiddleware