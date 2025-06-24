import { JWT_SECRET } from "../config";
import jwt from 'jsonwebtoken'

// these both can be merged in single , if role based things not required

// admin middleware
function adminMW(req, res, next) {
    const token = req.headers.authorization
    const words = token.split(" ");
    const mainToken = words[1];
    try {
        const decodedValue = verify(jwtToken, JWT_SECRET);
        if (decodedValue.username) {
            next();
        } else {
            res.status(403).json({
                msg: "You [admin] are not authenticated"
            })
        }
    } catch (e) {
        res.json({
            msg: "Incorrect inputs"
        })
    }

}

// user middleware
function userMW(req, res, next) {
    const token = req.headers.authorization
    const words = token.split(" ");
    const mainToken = words[1];
    const decodedValue = jwt.verify(mainToken, JWT_SECRET)

    if (decodedValue.username) {
        req.username = decodedValue.username
        req.randomData = 'dffdffd'
        next()
    }
    else {
        res.status(403).json({
            msg: "You [user] are not authenticated"
        })
    }

}

export default userMW