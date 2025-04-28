import { JWT_SECRET } from "../config";
import { verify } from "jsonwebtoken";

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = verify(jwtToken, JWT_SECRET);

    if (decodedValue.username) {    
        req.username = decodedValue.username;
        req.randomData = "Adsadsadsadssd";
        next();
    } else {
        res.status(403).json({
            msg: "You are not authenticated"
        })
    }
}

export default userMiddleware;